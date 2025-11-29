// Database query helpers and utilities

const pool = require('../config/database');

/**
 * Execute a transaction
 */
const transaction = async (callback) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Build WHERE clause from filters
 */
const buildWhereClause = (filters, startParamCount = 1) => {
  const conditions = [];
  const params = [];
  let paramCount = startParamCount;

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      conditions.push(`${key} = $${paramCount}`);
      params.push(value);
      paramCount++;
    }
  }

  return {
    whereClause: conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '',
    params,
    nextParamCount: paramCount
  };
};

/**
 * Build pagination query
 */
const buildPaginationQuery = (baseQuery, page = 1, limit = 20, orderBy = 'created_at DESC') => {
  const offset = (parseInt(page) - 1) * parseInt(limit);
  return `${baseQuery} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset}`;
};

/**
 * Get pagination info
 */
const getPaginationInfo = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    total: parseInt(total),
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

/**
 * Check if record exists
 */
const exists = async (table, conditions) => {
  const { whereClause, params } = buildWhereClause(conditions);
  const query = `SELECT EXISTS(SELECT 1 FROM ${table} ${whereClause})`;
  const result = await pool.query(query, params);
  return result.rows[0].exists;
};

/**
 * Soft delete (update status to deleted)
 */
const softDelete = async (table, id) => {
  const query = `UPDATE ${table} SET status = 'deleted', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Bulk insert
 */
const bulkInsert = async (table, columns, values) => {
  const placeholders = values.map((_, rowIndex) =>
    `(${columns.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(', ')})`
  ).join(', ');

  const flatValues = values.flat();
  const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders} RETURNING *`;
  
  const result = await pool.query(query, flatValues);
  return result.rows;
};

/**
 * Get count
 */
const getCount = async (table, conditions = {}) => {
  const { whereClause, params } = buildWhereClause(conditions);
  const query = `SELECT COUNT(*) FROM ${table} ${whereClause}`;
  const result = await pool.query(query, params);
  return parseInt(result.rows[0].count);
};

/**
 * Update multiple records
 */
const bulkUpdate = async (table, updates, conditions) => {
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');

  const { whereClause, params: whereParams } = buildWhereClause(
    conditions,
    Object.keys(updates).length + 1
  );

  const query = `UPDATE ${table} SET ${setClause}, updated_at = CURRENT_TIMESTAMP ${whereClause} RETURNING *`;
  const params = [...Object.values(updates), ...whereParams];

  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Search with ILIKE
 */
const searchRecords = async (table, searchColumn, searchTerm, limit = 20) => {
  const query = `SELECT * FROM ${table} WHERE ${searchColumn} ILIKE $1 LIMIT $2`;
  const result = await pool.query(query, [`%${searchTerm}%`, limit]);
  return result.rows;
};

/**
 * Get records by date range
 */
const getByDateRange = async (table, dateColumn, startDate, endDate) => {
  const query = `SELECT * FROM ${table} WHERE ${dateColumn} BETWEEN $1 AND $2 ORDER BY ${dateColumn} DESC`;
  const result = await pool.query(query, [startDate, endDate]);
  return result.rows;
};

/**
 * Get aggregate data
 */
const getAggregateData = async (table, aggregates, groupBy, conditions = {}) => {
  const { whereClause, params } = buildWhereClause(conditions);
  
  const aggregateClauses = Object.entries(aggregates)
    .map(([alias, expression]) => `${expression} as ${alias}`)
    .join(', ');

  const groupByClause = groupBy ? `GROUP BY ${groupBy}` : '';
  const query = `SELECT ${aggregateClauses} FROM ${table} ${whereClause} ${groupByClause}`;

  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Execute raw query with parameters
 */
const executeQuery = async (query, params = []) => {
  const result = await pool.query(query, params);
  return result.rows;
};

/**
 * Create audit log
 */
const createAuditLog = async (userId, action, entityType, entityId, details = null) => {
  const query = `
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(query, [
    userId,
    action,
    entityType,
    entityId,
    details ? JSON.stringify(details) : null
  ]);
  return result.rows[0];
};

/**
 * Get table info
 */
const getTableInfo = async (tableName) => {
  const query = `
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = $1
    ORDER BY ordinal_position
  `;
  const result = await pool.query(query, [tableName]);
  return result.rows;
};

module.exports = {
  transaction,
  buildWhereClause,
  buildPaginationQuery,
  getPaginationInfo,
  exists,
  softDelete,
  bulkInsert,
  getCount,
  bulkUpdate,
  searchRecords,
  getByDateRange,
  getAggregateData,
  executeQuery,
  createAuditLog,
  getTableInfo
};

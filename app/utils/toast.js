import toast from 'react-hot-toast'

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#10b981',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '14px',
      padding: '16px',
      borderRadius: '8px',
    },
    icon: '✓',
  })
}

export const showError = (message) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#ef4444',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '14px',
      padding: '16px',
      borderRadius: '8px',
    },
    icon: '✕',
  })
}

export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#3b82f6',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '14px',
      padding: '16px',
      borderRadius: '8px',
    },
    icon: 'ℹ',
  })
}

export const showWarning = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-center',
    style: {
      background: '#f59e0b',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '14px',
      padding: '16px',
      borderRadius: '8px',
    },
    icon: '⚠',
  })
}

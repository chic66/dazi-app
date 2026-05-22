import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40',
  secondary: 'bg-secondary text-white shadow-lg shadow-secondary/25 hover:shadow-secondary/40',
  outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-light',
  ghost: 'bg-transparent text-text-primary hover:bg-gray-100',
  danger: 'bg-red-500 text-white'
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children}
    </motion.button>
  )
}

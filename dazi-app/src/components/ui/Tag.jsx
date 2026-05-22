export default function Tag({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-text-secondary',
    primary: 'bg-primary-light text-primary',
    secondary: 'bg-secondary-light text-secondary',
    accent: 'bg-accent-light text-amber-600',
    fitness: 'bg-orange-50 text-orange-500',
    learning: 'bg-blue-50 text-blue-500',
    social: 'bg-purple-50 text-purple-500'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

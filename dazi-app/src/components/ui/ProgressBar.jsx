export default function ProgressBar({ value, max = 100, color = 'primary', className = '' }) {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success'
  }

  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`h-2 bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full ${colors[color]} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

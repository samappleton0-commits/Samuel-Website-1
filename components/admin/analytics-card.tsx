type AnalyticsCardProps = {
  title: string
  value: number
  icon: string
  color: string
}

export default function AnalyticsCard({
  title,
  value,
  icon,
  color,
}: AnalyticsCardProps) {
  return (
    <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  )
}
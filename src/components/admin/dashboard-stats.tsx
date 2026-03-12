interface DashboardStatsProps {
  productsCount: number
  ordersCount: number
  customersCount: number
}

export function DashboardStats({ productsCount, ordersCount, customersCount }: DashboardStatsProps) {
  const stats = [
    { name: 'Total Products', value: productsCount, icon: '📦', bg: 'bg-blue-100', text: 'text-blue-600' },
    { name: 'Total Orders', value: ordersCount, icon: '🛒', bg: 'bg-green-100', text: 'text-green-600' },
    { name: 'Customers', value: customersCount, icon: '👥', bg: 'bg-purple-100', text: 'text-purple-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center text-2xl mr-4`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
            <p className={`text-2xl font-bold ${stat.text} dark:text-white`}>{stat.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
import React from 'react'
import { BarChart, LineChart, PieChart, Activity, Users, DollarSign, TrendingUp } from 'lucide-react'

const Button = ({ children, variant }) => (
  <button className={`px-4 py-2 rounded-md ${variant === 'outline' ? 'border border-primary text-primary' : 'bg-primary text-white'}`}>
    {children}
  </button>
)

const Card = ({ children }) => (
  <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">
    {children}
  </div>
)

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">
    {children}
  </h3>
)

const CardDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">
    {children}
  </p>
)

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">
    {children}
  </div>
)

const stats = [
  { name: 'Total Followers', value: '10,483', icon: Users, change: '+5.25%' },
  { name: 'Engagement Rate', value: '4.6%', icon: Activity, change: '+0.7%' },
  { name: 'Revenue', value: '$12,849', icon: DollarSign, change: '+10.2%' },
  { name: 'Growth Rate', value: '12.5%', icon: TrendingUp, change: '+2.4%' },
]

const recentActivity = [
  { action: 'New follower gained', time: '2 minutes ago' },
  { action: 'Post reached 1k likes', time: '1 hour ago' },
  { action: 'Collaboration offer received', time: '3 hours ago' },
  { action: 'Account mentioned by influencer', time: '5 hours ago' },
]

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[300px] w-[300px] rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute right-[15%] top-[15%] h-[250px] w-[250px] rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute left-[20%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mt-2">Welcome to Your SOCaiL Dashboard</h1>
          <p className="text-muted-foreground mt-2">Here's an overview of your social media performance</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Monthly follower increase</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <LineChart className="h-64 w-64 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Distribution</CardTitle>
              <CardDescription>Likes, comments, and shares</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <PieChart className="h-64 w-64 text-primary" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your social media accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard;
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import Image from "next/image"
import RecentOrdersTable from "@/components/admin/recent-orders-table"
import SalesChart from "@/components/admin/sales-chart"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"

export default function AdminDashboardPage() {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back to your admin dashboard</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +20.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+287</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +18.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Package className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2
              </span>{" "}
              new this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 inline-flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                -2.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            <Card className="col-span-3 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrdersTable />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Your best-selling products this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Premium Wheat Flour",
                      sales: 124,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Chakki Fresh Atta",
                      sales: 98,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                    {
                      name: "Specialty Pastry Flour",
                      sales: 65,
                      image: "/placeholder.svg?height=40&width=40",
                    },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-10 w-10 rounded-md overflow-hidden relative bg-gray-100 mr-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sold</p>
                      </div>
                      <div className="text-sm font-medium">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest activities on your store.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "New order placed",
                      details: "Order #12345 for 50kg Premium Wheat Flour",
                      time: "2 hours ago",
                    },
                    {
                      action: "Product updated",
                      details: "Specialty Pastry Flour price updated to AED 30",
                      time: "5 hours ago",
                    },
                    {
                      action: "New customer registered",
                      details: "Dubai Bakery Inc. created an account",
                      time: "1 day ago",
                    },
                    {
                      action: "Inventory alert",
                      details: "Bread Flour is running low (5 units left)",
                      time: "1 day ago",
                    },
                    {
                      action: "New blog post published",
                      details: "The Art of Perfect Bread Making",
                      time: "3 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-600 mt-2 mr-3"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.details}</p>
                      </div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics coming soon.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard under development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Reports feature coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

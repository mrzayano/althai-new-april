import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function RecentOrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          {
            customer: "Dubai Bakery",
            initials: "DB",
            product: "Premium Wheat Flour",
            amount: "AED 1,250",
            status: "delivered",
          },
          {
            customer: "Sweet Dreams",
            initials: "SD",
            product: "Chakki Fresh Atta",
            amount: "AED 880",
            status: "processing",
          },
          {
            customer: "Al Reem Market",
            initials: "AR",
            product: "Multiple Products",
            amount: "AED 2,500",
            status: "delivered",
          },
          {
            customer: "Sunrise Café",
            initials: "SC",
            product: "Specialty Pastry Flour",
            amount: "AED 600",
            status: "pending",
          },
        ].map((order, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-100 text-primary-600">{order.initials}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{order.customer}</div>
              </div>
            </TableCell>
            <TableCell>{order.product}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : order.status === "processing"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

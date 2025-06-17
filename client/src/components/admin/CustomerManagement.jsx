import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useOrderStore from '@/store/useOrderStore';

// export const CustomerManagement = ({ orders }) => {
export const CustomerManagement = () => {

  const { orders, isLoading } = useOrderStore();

  // Group orders by customer / useR
  const customers = orders.reduce((acc, order) => {
    const customerId = order.buyer?._id;
    if (!customerId) return acc;

    if (!acc[customerId]) {
      acc[customerId] = {
        ...order.buyer,
        orderCount: 0,
        totalSpent: 0,
        lastOrder: new Date(0)
      };
    }

    acc[customerId].orderCount += 1;
    acc[customerId].totalSpent += order.payment;
    const orderDate = new Date(order.createdAt);
    if (orderDate > acc[customerId].lastOrder) {
      acc[customerId].lastOrder = orderDate;
    }

    return acc;
  }, {});

  // Extract unique customers from orders
  // const customers = [...new Set(orders.map(order => order.buyer))];

    if (isLoading) return <div>Loading customers...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(customers).map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orderCount}</TableCell>
                <TableCell>
                  {/* {orders.filter(o => o.buyer._id === customer._id).length} */}

                   {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(customer.totalSpent)}

                  
                </TableCell>


                {/* <TableCell>
                  ${orders
                    .filter(o => o.buyer._id === customer._id)
                    .reduce((sum, order) => sum + order.payment, 0)
                    .toFixed(2)}
                </TableCell> */}

                {/* <TableCell>
                  {new Date(
                    Math.max(...orders
                      .filter(o => o.buyer._id === customer._id)
                      .map(o => new Date(o.createdAt))
                    )
                  ).toLocaleDateString()}
                </TableCell> */}



                <TableCell>
                   {customer.lastOrder.toLocaleDateString()}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
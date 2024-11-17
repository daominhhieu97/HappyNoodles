import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Box,
  Typography
} from '@mui/material';
import { OrderSummaryDto, OrderDetailDto } from '../models/order.tsx';
import { getOrderDetails, getOrders } from '../apis/orderApi.tsx';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailDto | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOrderClick = async (orderId: string) => {
    try {
      const orderDetails = await getOrderDetails(orderId);
      setSelectedOrder(orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Code</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id} onClick={() => handleOrderClick(order.id)} style={{ cursor: 'pointer' }}>
                  <TableCell>{order.orderCode}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />

      <Modal open={!!selectedOrder} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {selectedOrder && (
            <>
              <Typography variant="h6">Order Details</Typography>
              <Typography>Order Code: {selectedOrder.orderCode}</Typography>
              <Typography>Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</Typography>
              <Typography>Delivery Address: {selectedOrder.deliveryAddress}</Typography>
              <Typography>Phone Number: {selectedOrder.phoneNumber}</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.lineItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" sx={{ mt: 2 }}>Total: ${selectedOrder.total.toFixed(2)}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default OrderHistory;
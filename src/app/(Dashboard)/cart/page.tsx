"use client";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StoreState } from "@/store/store";
import { decrease,  increase, remove } from "@/features/cartSlice";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartPage() {
  const dispatch = useDispatch<Dispatch>();
  const { cartData, loading } = useSelector(
    (state: StoreState) => state.cart
  );


  //  Loading
  if (loading) {
    return (
      <Typography textAlign="center" mt={5}>
        Loading...
      </Typography>
    );
  }

  //  Empty
  if (!cartData || cartData.products.length === 0) {
    return (
      <Typography textAlign="center" mt={5}>
        Your cart is empty 🛒
      </Typography>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Shopping Cart
        </Typography>
        <Typography color="text.secondary">
          Manage your selected products
        </Typography>
      </Box>

      <Grid container spacing={3}>
        
        {/* 🛒 Products */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            {cartData.products.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    
                    {/* Image */}
                    <Avatar
                      src={item.thumbnail}
                      variant="rounded"
                      sx={{ width: 70, height: 70 }}
                    />

                    {/* Info */}
                    <Box flex={1}>
                      <Typography fontWeight={600}>
                        {item.title}
                      </Typography>

                      <Typography color="text.secondary" fontSize={14}>
                        ${item.price}
                      </Typography>
                    </Box>

                    {/* Quantity */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton size="small" onClick={()=>dispatch(decrease(item.id))}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography>{item.quantity}</Typography>

                      <IconButton size="small" onClick={()=>dispatch(increase(item.id))}>
                        <AddIcon />
                      </IconButton>
                      <IconButton size="small" onClick={()=>dispatch(remove(item.id))}>
                        <DeleteIcon/>
                      </IconButton>
                    </Box>

                    {/* Total */}
                    <Typography fontWeight={600}>
                      ${item.total.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/*  Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Order Summary
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Items</Typography>
                <Typography>{cartData.totalProducts}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Quantity</Typography>
                <Typography>{cartData.totalQuantity}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={700}>
                  ${cartData.total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}
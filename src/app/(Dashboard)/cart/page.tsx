"use client";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StoreState } from "@/store/store";
import { decrease, increase, remove } from "@/features/cartSlice";
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
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const dispatch = useDispatch<Dispatch>();
  const { cartData, loading } = useSelector((state: StoreState) => state.cart);

  // ✅ Loading
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // ✅ Empty state
  if (!cartData || cartData.products.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5">Your cart is empty 🛒</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Shopping Cart
        </Typography>
        <Typography color="text.secondary">
          Manage your selected products
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Products */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cartData.products.map((item) => (
              <Card key={item.id} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Image */}
                    <Avatar
                      src={item.thumbnail}
                      variant="rounded"
                      sx={{ width: 70, height: 70 }}
                    />

                    {/* Info */}
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 150,
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>

                      <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                        ${item.price}
                      </Typography>
                    </Box>

                    {/* Quantity */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => dispatch(decrease(item.id))}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography>{item.quantity}</Typography>

                      <IconButton
                        size="small"
                        onClick={() => dispatch(increase(item.id))}
                      >
                        <AddIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => dispatch(remove(item.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    {/* Total */}
                    <Typography
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      ${item.total.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>

              <Box
                sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Items</Typography>
                <Typography>{cartData.totalProducts}</Typography>
              </Box>

              <Box
                sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Quantity</Typography>
                <Typography>{cartData.totalQuantity}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
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

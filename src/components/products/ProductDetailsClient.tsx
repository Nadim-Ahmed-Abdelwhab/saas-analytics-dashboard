"use client";

import { Product } from "@/GlopalTypes/productsTypes";
import { addToCart } from "@/features/cartSlice";
import { Dispatch } from "@/store/store";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Rating,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const dispatch = useDispatch<Dispatch>();
  const [openToast, setOpenToast] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
        total: product.price,
        discountPercentage: 0,
        discountedTotal: product.price,
      }),
    );

    setOpenToast(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Product Details
        </Typography>
        <Typography color="text.secondary">
          Full information about the product
        </Typography>
      </Box>

      {/* Main Card */}
      <Card sx={{ borderRadius: 4, p: 3 }}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={product.thumbnail}
                  variant="rounded"
                  sx={{ width: 220, height: 220 }}
                />
              </Box>
            </Grid>

            {/* Info */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {product.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                {product.brand}
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                ${product.price}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography>({product.rating})</Typography>
              </Box>

              <Box
                sx={{
                  mt: 2,
                }}
              >
                <Chip label={product.category} />
              </Box>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {product.description}
              </Typography>

              {/*  ADD TO CART BUTTON */}
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Button variant="contained" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Stock */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Stock
              </Typography>
              <Typography color="text.secondary">{product.stock}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Availability
              </Typography>
              <Typography color="text.secondary">
                {product.availabilityStatus}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Dimensions */}
          <Typography
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Dimensions
          </Typography>
          <Typography color="text.secondary">
            {product.dimensions.width} x {product.dimensions.height} x{" "}
            {product.dimensions.depth}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Reviews */}
          <Typography
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            Reviews
          </Typography>

          {product.reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Rating value={review.rating} readOnly size="small" />
                <Typography
                  sx={{
                    fontSize: 13,
                  }}
                >
                  {review.reviewerName}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: 13,
                }}
                color="text.secondary"
              >
                {review.comment}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/*  TOAST */}
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Added to cart 🛒
        </Alert>
      </Snackbar>
    </Box>
  );
}

import { Product, ProductParams } from "@/GlopalTypes/productsTypes";
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
} from "@mui/material";
import axios from "axios";

export default async function ProductDetails({
  params,
}: ProductParams) {
  const { id } = await params;

  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  const product: Product = res.data;

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
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
              <Box display="flex" justifyContent="center">
                <Avatar
                  src={product.thumbnail}
                  variant="rounded"
                  sx={{ width: 220, height: 220 }}
                />
              </Box>
            </Grid>

            {/* Info */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" fontWeight={700}>
                {product.title}
              </Typography>

              <Typography color="text.secondary" mb={1}>
                {product.brand}
              </Typography>

              <Typography fontSize={20} fontWeight={700}>
                ${product.price}
              </Typography>

              {/* Rating */}
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography>({product.rating})</Typography>
              </Box>

              {/* Category */}
              <Box mt={2}>
                <Chip label={product.category} />
              </Box>

              {/* Description */}
              <Typography mt={2}>
                {product.description}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Stock + Status */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography fontWeight={600}>Stock</Typography>
              <Typography color="text.secondary">
                {product.stock}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography fontWeight={600}>Availability</Typography>
              <Typography color="text.secondary">
                {product.availabilityStatus}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Dimensions */}
          <Typography fontWeight={600} mb={1}>
            Dimensions
          </Typography>
          <Typography color="text.secondary">
            {product.dimensions.width} x {product.dimensions.height} x{" "}
            {product.dimensions.depth}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Reviews */}
          <Typography fontWeight={600} mb={2}>
            Reviews
          </Typography>

          {product.reviews.map((review, index) => (
            <Box key={index} mb={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography fontSize={13}>
                  {review.reviewerName}
                </Typography>
              </Box>

              <Typography fontSize={13} color="text.secondary">
                {review.comment}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
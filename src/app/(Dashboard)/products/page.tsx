"use client";

import { productsData } from "@/features/productSlice";
import { Dispatch, StoreState } from "@/store/store";
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  CircularProgress,
  Button,
  Chip,
  TextField,
  Rating,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { product, error, loading } = useSelector(
    (state: StoreState) => state.product,
  );

  const limit = 12;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const totalPages = Math.ceil((product?.total || 0) / limit);

  //  debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //   fetch
  useEffect(() => {
    dispatch(
      productsData({
        limit,
        skip: page * limit,
        search: debouncedSearch || undefined,
      }),
    );
  }, [dispatch, page, debouncedSearch]);

  //  loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  // error
  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        Something went wrong
      </Typography>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Products
        </Typography>
        <Typography color="text.secondary">
          Explore all available products
        </Typography>
      </Box>

      {/* Search */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      {/* Grid */}
      <Grid container spacing={2}>
        {product?.products.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
            <Card
              onClick={() => router.push(`/products/${p.id}`)}
              sx={{
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Image */}
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  src={p.thumbnail}
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              {/* Title */}
              <Typography fontWeight={600} textAlign="center">
                {p.title}
              </Typography>

              {/* Brand */}
              <Typography
                textAlign="center"
                fontSize={13}
                color="text.secondary"
              >
                {p.brand}
              </Typography>

              {/* Price */}
              <Typography textAlign="center" fontWeight={700} mt={1}>
                ${p.price}
              </Typography>

              {/* Rating */}
              <Box display="flex" justifyContent="center" mt={1}>
                <Rating value={p.rating} precision={0.1} readOnly />
              </Box>

              {/* Category */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Chip label={p.category} size="small" />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        mt={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Button
          variant="outlined"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <Typography fontWeight={500}>
          Page {page + 1} / {totalPages} 
        </Typography>

        <Button
          variant="contained"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

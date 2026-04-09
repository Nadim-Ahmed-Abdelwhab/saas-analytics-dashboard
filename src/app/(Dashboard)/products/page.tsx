"use client";

import { addToCart } from "@/features/cartSlice";
import { productsData } from "@/features/productSlice";
import { Dispatch, StoreState } from "@/store/store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { product, error, loading } = useSelector(
    (state: StoreState) => state.product
  );

  const limit = 12;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [openToast, setOpenToast] = useState(false);

  const totalPages = Math.ceil((product?.total || 0) / limit);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(
      productsData({
        limit,
        skip: page * limit,
        search: debouncedSearch || undefined,
      })
    );
  }, [dispatch, page, debouncedSearch]);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    p: {
      id: number;
      title: string;
      price: number;
      thumbnail: string;
    }
  ) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: p.id,
        title: p.title,
        price: p.price,
        thumbnail: p.thumbnail,
        quantity: 1,
        total: p.price,
        discountPercentage: 0,
        discountedTotal: p.price,
      })
    );

    setOpenToast(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        Something went wrong
      </Typography>
    );
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Products
        </Typography>
        <Typography color="text.secondary">
          Explore all available products
        </Typography>
      </Box>

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

      <Grid container spacing={2}>
        {product?.products.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                transition: "0.3s",
                position: "relative",
                height: "100%",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 4,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <IconButton
                  onClick={(e) =>
                    handleAddToCart(e, {
                      id: p.id,
                      title: p.title,
                      price: p.price,
                      thumbnail: p.thumbnail,
                    })
                  }
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                mb={2}
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/products/${p.id}`)}
              >
                <Avatar
                  src={p.thumbnail}
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              <Typography
                fontWeight={600}
                textAlign="center"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/products/${p.id}`)}
              >
                {p.title}
              </Typography>

              <Typography
                textAlign="center"
                fontSize={13}
                color="text.secondary"
              >
                {p.brand}
              </Typography>

              <Typography textAlign="center" fontWeight={700} mt={1}>
                ${p.price}
              </Typography>

              <Box display="flex" justifyContent="center" mt={1}>
                <Rating value={p.rating} precision={0.1} readOnly />
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Chip label={p.category} size="small" />
              </Box>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

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

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setOpenToast(false)}>
          Added to cart successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
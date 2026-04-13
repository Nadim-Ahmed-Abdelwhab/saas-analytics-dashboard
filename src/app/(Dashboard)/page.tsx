"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StoreState } from "@/store/store";

import { user } from "@/features/userSlice";
import { productsData } from "@/features/productSlice";
import { allPosts } from "@/features/postSlice";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardActionArea,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/appProtect/ProtectedRoute";

import UsersChart from "@/components/charts/UsersChart";
import ProductsPie from "@/components/charts/ProductsPie";

export default function OverviewPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { userData, loading: usersLoading } = useSelector(
    (state: StoreState) => state.user,
  );

  const { product, loading: productsLoading } = useSelector(
    (state: StoreState) => state.product,
  );

  const { postData, loading: postsLoading } = useSelector(
    (state: StoreState) => state.post,
  );

  const { cartData } = useSelector((state: StoreState) => state.cart);

  // 🔥 fetch data
  useEffect(() => {
    if (!userData) dispatch(user({ limit: 20, skip: 0 }));
    if (!product) dispatch(productsData({ limit: 20, skip: 0 }));
    if (!postData) dispatch(allPosts({ limit: 20, skip: 0 }));
  }, [dispatch, userData, product, postData]);

  const loading = usersLoading || productsLoading || postsLoading;

  // 🔥 derived cart data (FIXED)
  const totalQuantity =
    cartData?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <ProtectedRoute>
      <Box>
        {/* Header */}
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
            }}
          >
            Dashboard Overview
          </Typography>
          <Typography color="text.secondary">Analytics & insights</Typography>
        </Box>

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* KPI */}
        <Grid container spacing={3}>
          {/* Users */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardActionArea
                onClick={() => router.push("/user")}
                sx={{ p: 2 }}
              >
                <PeopleIcon sx={{ fontSize: 40 }} />
                <Typography>Users</Typography>
                <Typography variant="h5">{userData?.total || 0}</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Products */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardActionArea
                onClick={() => router.push("/products")}
                sx={{ p: 2 }}
              >
                <InventoryIcon sx={{ fontSize: 40 }} />
                <Typography>Products</Typography>
                <Typography variant="h5">{product?.total || 0}</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Posts */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardActionArea
                onClick={() => router.push("/post")}
                sx={{ p: 2 }}
              >
                <ArticleIcon sx={{ fontSize: 40 }} />
                <Typography>Posts</Typography>
                <Typography variant="h5">{postData?.total || 0}</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Cart */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <ShoppingCartIcon sx={{ fontSize: 40 }} />
                <Typography>Cart</Typography>
                <Typography variant="h5">{totalQuantity}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid
          container
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography
                sx={{
                  mb: 2,
                }}
              >
                Users Growth (Last 5 Months)
              </Typography>
              <UsersChart total={userData?.total || 0} />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                }}
              >
                Products Categories
              </Typography>
              <ProductsPie products={product?.products || []} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}

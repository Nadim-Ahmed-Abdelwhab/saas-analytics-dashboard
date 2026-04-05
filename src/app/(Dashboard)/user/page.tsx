"use client";

import { user } from "@/features/userSlice";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { userData, loading, error } = useSelector(
    (state: StoreState) => state.user,
  );
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 12;
  
  const totalPages = Math.ceil((userData?.total || 0) / limit);
  const [debouncedSearch, setDebouncedSearch] = useState(search);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    dispatch(user({ limit, skip: page * limit, search: debouncedSearch }));
  }, [dispatch, page, debouncedSearch]);

  //  Loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  //  Error
  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Users
        </Typography>
        <Typography color="text.secondary">
          Manage and explore all users
        </Typography>
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      {/* Users Grid */}
      <Grid container spacing={2}>
        {userData?.users.map((u) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={u.id}>
            <Card
              onClick={() => router.push(`/user/${u.id}`)}
              sx={{
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",
                bgcolor: "background.paper",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Avatar */}
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  src={u.image}
                  sx={{
                    width: 70,
                    height: 70,
                  }}
                />
              </Box>

              {/* Name */}
              <Typography textAlign="center" fontWeight={600}>
                {u.firstName} {u.lastName}
              </Typography>

              {/* Email */}
              <Typography
                textAlign="center"
                fontSize={13}
                color="text.secondary"
              >
                {u.email}
              </Typography>

              {/* Role */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Chip
                  label={u.role}
                  color={
                    u.role === "admin"
                      ? "error"
                      : u.role === "moderator"
                        ? "warning"
                        : "default"
                  }
                  size="small"
                />
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

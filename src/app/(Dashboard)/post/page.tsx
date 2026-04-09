"use client";

import { allPosts } from "@/features/postSlice";
import { Dispatch, StoreState } from "@/store/store";
import {
  Box,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PostsPage() {
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();

  const { error, loading, postData } = useSelector(
    (state: StoreState) => state.post
  );

  const limit = 12;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const totalPages = Math.ceil((postData?.total || 0) / limit);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // fetch
  useEffect(() => {
    dispatch(
      allPosts({
        limit,
        skip: page * limit,
        search: debouncedSearch || undefined,
      })
    );
  }, [dispatch, page, debouncedSearch]);

  // loading
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
          Posts
        </Typography>
        <Typography color="text.secondary">
          Explore all posts and discussions
        </Typography>
      </Box>

      {/* Search */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </Box>

      {/* Posts Grid */}
      <Grid container spacing={2}>
        {postData?.posts.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
            <Card
              onClick={() => router.push(`/post/${p.id}`)}
              sx={{
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",
                height: "100%",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Title */}
              <Typography fontWeight={600} mb={1}>
                {p.title}
              </Typography>

              {/* Body */}
              <Typography fontSize={13} color="text.secondary" mb={2}>
                {p.body.slice(0, 80)}...
              </Typography>

              {/* Tags */}
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {p.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>

              {/* Reactions */}
              <Typography fontSize={13}>
                👍 {p.reactions.likes} | 👎 {p.reactions.dislikes}
              </Typography>
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
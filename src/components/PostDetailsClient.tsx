"use client";

import { Post, Comment } from "@/GlopalTypes/postTypes";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function PostDetailsClient({
  post,
  comments,
  id,
}: {
  post: Post;
  comments: Comment[];
  id: string;
}) {
  const [newComment, setNewComment] = useState("");

  const [commentsList, setCommentsList] = useState<Comment[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`comments-${id}`);
      if (saved) return JSON.parse(saved);
    }
    return comments;
  });

  //  save to localStorage
  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(commentsList));
  }, [commentsList, id]);

  //  add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newItem: Comment = {
      id: Date.now(),
      body: newComment,
      postId: Number(id),
      user: {
        id: 1,
        username: "You",
      },
    };

    setCommentsList((prev) => [newItem, ...prev]);
    setNewComment("");
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{
        mb: 4
      }}>
        <Typography variant="h4" sx={{fontWeight: 700}}>
          Post Details
        </Typography>
        <Typography color="text.secondary">
          Full post content with comments
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 4, p: 3 }}>
        <CardContent>
          {/* Title */}
          <Typography variant="h5" sx={{fontWeight: 700 , mb: 2}}>
            {post.title}
          </Typography>

          {/* Body */}
          <Typography color="text.secondary" sx={{mb:3}}>
            {post.body}
          </Typography>

          {/* Tags */}
          <Box
          sx={{display: 'flex', gap: 1 , flexWrap: 'wrap' , mb: 3}}>
            {post.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>

          {/* Reactions */}
          <Typography sx={{
            mb:2
          }}>
             {post.reactions.likes} |  {post.reactions.dislikes}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* ADD COMMENT */}
          <Box sx={{
            mb:2
          }}>
            <TextField
              fullWidth
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* COMMENTS */}
          <Typography sx={{
            mb:2,
            fontWeight: 600
          }}>
            Comments
          </Typography>

          {commentsList.length === 0 ? (
            <Typography color="text.secondary">No comments yet</Typography>
          ) : (
            commentsList.map((c) => (
              <Box
                key={c.id}

                sx={{mb:2 , p: 2 ,borderRadius:2 ,bgcolor: "background.default"}}
              >
                <Box 
                sx={{
                  
                  display:"flex", alignItems:"center" ,gap: 1, mb:1
                }}
                >
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {c.user.username.charAt(0).toUpperCase()}
                  </Avatar>

                  <Typography 
                  sx={{

                    fontWeight: 600, fontSize:14
                  }}
                  >
                    {c.user.username}
                  </Typography>
                </Box>

                <Typography 
                sx={{

                  fontSize: 14 , color: "text.secondary"
                }}
                >
                  {c.body}
                </Typography>
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

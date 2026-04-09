import axios from "axios";
import { Post, Comment, PostsParams } from "@/GlopalTypes/postTypes";
import PostDetailsClient from '@/components/PostDetailsClient';

export default async function PostsDetails({ params }: PostsParams) {
  const { id } = await params;

  // post
  const postRes = await axios.get(
    `https://dummyjson.com/posts/${id}`
  );
  const post: Post = postRes.data;

  // comments
  const commentsRes = await axios.get(
    `https://dummyjson.com/posts/${id}/comments`
  );
  const comments: Comment[] = commentsRes.data.comments;

  return (
    <PostDetailsClient
      post={post}
      comments={comments}
      id={id}
    />
  );
}
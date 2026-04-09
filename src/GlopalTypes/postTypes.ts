export interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface PostState {
  loading: boolean;
  error: boolean;
  postData: PostResponse | null;
}

export interface PostsParams {
  params: {
    id: string;
  };
}
export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

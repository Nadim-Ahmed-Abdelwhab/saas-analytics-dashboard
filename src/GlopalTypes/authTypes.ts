export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

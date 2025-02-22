export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLikedByMe: boolean;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}
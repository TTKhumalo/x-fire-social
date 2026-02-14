
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profilePic: string;
  media: MediaItem[];
  cookiesAccepted: boolean;
  joinDate: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  timestamp: string;
  description?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userPic: string;
  content: string;
  media?: MediaItem;
  likes: number;
  comments: number;
  timestamp: string;
  likedByUser?: boolean;
}

export type ViewType = 'feed' | 'profile' | 'search' | 'external-profile' | 'messages' | 'notifications' | 'settings' | 'ai-chat';

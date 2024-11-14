export interface StoryI {
  id: string;
  image: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    userImage: string;
  };
}

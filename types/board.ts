interface Writing {
  category: string;
  title: string;
  content: string;
  member?: {
    id: string;
  };
  created_at?: string;
  view_cnt?: number;
  like_cnt?: number;
}
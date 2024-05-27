interface Writing {
  board_id?: number;
  category: string;
  title: string;
  content: string;
  member?: {
    id: string;
  };
  created_at?: string;
  view_cnt?: number;
  reply_cnt?: number;
  like_cnt?: number;
}

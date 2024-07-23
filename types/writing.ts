interface Writing {
  writing_id?: number;
  category: string;
  title: string;
  content: string;
  member: {
    is_admin?: boolean;
    uid: string;
    member_id?: string;
  };
  created_at?: string;
  view_cnt?: number;
  reply_cnt?: number;
  like_cnt?: number;
  board_id?: number;
}

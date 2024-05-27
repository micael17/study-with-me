interface Reply {
  id: number;
  created_at: string;
  board_id: number;
  content: string;
  member_id: number;
  isDel: boolean;
  isNested: boolean;
  mention_member_id: number;
}

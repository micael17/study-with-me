interface Reply {
  reply_id: number;
  root_reply_id: number;
  created_at: string;
  content: string;
  member_id: number;
  is_del: boolean;
  is_nested: boolean;
  writing_id: number;
  origin_reply_id: number | null;
  member: {
    id: number;
  };
}

interface ReplyForPost {
  writing_id: number;
  content: string;
  member_id: number;
  is_del: boolean;
  is_nested: boolean;
  origin_reply_id: number | null;
  member: {
    id: number;
  };
}

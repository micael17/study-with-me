interface Reply {
  reply_id: number;
  root_reply_id: number;
  created_at: string;
  content: string;
  is_del: boolean;
  is_nested: boolean;
  writing_id: number;
  origin_reply_id: number | null;
  member: {
    uid: string;
    member_id: string;
  };
}

interface GetReply extends Reply {
  uid: string;
  member_id: string;
}

interface ReplyForPost {
  writing_id: number;
  content: string;
  is_del: boolean;
  is_nested: boolean;
  origin_reply_id: number | null;
  member: {
    uid: string;
    member_id?: string;
  };
}

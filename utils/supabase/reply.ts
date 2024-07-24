import { supabase } from './supabaseClient';

export const submitReply = async (replyModel: ReplyForPost): Promise<boolean> => {
  let result: boolean = false;

  let { error } = await supabase.from('reply').insert({
    writing_id: replyModel.writing_id,
    content: replyModel.content,
    uid: replyModel.member.uid,
    is_nested: replyModel.is_nested || false,
    is_del: replyModel.is_del || false,
    origin_reply_id: replyModel.origin_reply_id,
  });

  if (error) {
    console.log(error);
    alert('글 작성 중 오류가 발생했습니다.');
  } else {
    result = true;
  }
  return result;
};

export const getReplyList = async (writing_id: number): Promise<Reply[]> => {
  const { data, error } = await supabase
    .from('reply')
    .select(
      `
          *,
          member(uid, member_id)
        `,
    )
    .eq('writing_id', writing_id)
    .returns<Reply[]>();

  return data as Reply[];
};

//RPC는 supabase에 저장된 프로시저를 말한다.
export const getReplyListRPC = async (writing_id: number): Promise<Reply[]> => {
  const { data, error } = await supabase
    .rpc('get_comment_hierarchy', { p_writing_id: writing_id })
    .returns<GetReply[]>();
  if (error) {
    console.error('Error fetching comments:', error);
    return [] as GetReply[];
  }

  const newData: Reply[] = data.map((d) => {
    const obj = {} as Reply;
    obj.content = d.content;
    obj.created_at = d.created_at;
    obj.is_del = d.is_del;
    obj.is_nested = d.is_nested;
    obj.member = {
      uid: d.uid,
      member_id: d.member_id,
    };
    obj.origin_reply_id = d.origin_reply_id;
    obj.reply_id = d.reply_id;
    obj.root_reply_id = d.root_reply_id;
    obj.writing_id = d.writing_id;

    return obj;
  });

  return newData as Reply[];
};

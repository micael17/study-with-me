import { supabase } from './supabaseClient';

export const submitReply = async (replyModel: ReplyForPost) => {
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
          member(id)
        `,
    )
    .eq('writing_id', writing_id)
    .returns<Reply[]>();

  return data as Reply[];
};

//RPC는 supabase에 저장된 프로시저를 말한다.
export const getReplyListRPC = async (writing_id: number): Promise<Reply[]> => {
  const { data, error } = await supabase.rpc('get_comment_hierarchy', { p_writing_id: writing_id }).returns<Reply[]>();
  if (error) {
    console.error('Error fetching comments:', error);
    return [] as Reply[];
  }
  return data as Reply[];
};

import { createBrowserClient } from '@supabase/ssr';

export const supabase = createClient();

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export const getWritingList = async (): Promise<Writing[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('writing')
    .select(
      `
    *,
    member(id)
  `,
    )
    .returns<Writing[]>();

  return data as Writing[];
};

export const getNoticeList = async (): Promise<Writing[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('writing')
    .select(
      `
    *,
    member(id)
  `,
    )
    .eq('category', 'notice')
    .eq('member_id', 1)
    .eq('is_del', false)
    .returns<Writing[]>();

  return data as Writing[];
};

export const getWritingContent = async (writing_id: number): Promise<Writing> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('writing')
    .select(
      `
    *,
    member(id)
  `,
    )
    .eq('writing_id', writing_id)
    .single<Writing>();

  return data as Writing;
};

export const uploadFileToSupabase = async (files: File[]) => {
  const supabase = createClient();
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const { data, error } = await supabase.storage.from('images').upload(`public/${files[i].name}`, files[i], {
      cacheControl: '3600',
      upsert: false,
    });

    if (data?.path) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(data.path);
      urls.push(publicUrl);
    } else {
      console.log('err', error);
    }
  }

  return urls;
};

export const submitBoardWriting = async (writingModel: Writing) => {
  const supabase = createClient();
  let result: boolean = false;

  let { error } = await supabase.from('writing').insert({
    category: writingModel.category,
    title: writingModel.title,
    content: writingModel.content,
    member_id: writingModel.member?.id || 1,
  });

  if (error) {
    console.log(error);
    alert('글 작성 중 오류가 발생했습니다.');
  } else {
    result = true;
  }
  return result;
};

export const submitReply = async (replyModel: ReplyForPost) => {
  const supabase = createClient();
  let result: boolean = false;

  let { error } = await supabase.from('reply').insert({
    writing_id: replyModel.writing_id,
    content: replyModel.content,
    member_id: replyModel.member_id,
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
  const supabase = createClient();
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

export const getReplyListRPC = async (writing_id: number): Promise<Reply[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_comment_hierarchy', { p_writing_id: writing_id }).returns<Reply[]>();
  if (error) {
    console.error('Error fetching comments:', error);
    return [] as Reply[];
  }
  return data as Reply[];
};

export const signUp = async (email: string, password: string, id: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        id,
      },
    },
  });

  if (error) {
    console.log('Error Sign Up:', error);
    return error.status;
  } else {
    return 200;
  }
};

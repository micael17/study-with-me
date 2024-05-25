import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

export const getWritingList = async (): Promise<Writing[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('board')
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
    .from('board')
    .select(
      `
    *,
    member(id)
  `,
    )
    .eq('category', 'notice')
    .eq('member_id', 1)
    .eq('isDel', false)
    .returns<Writing[]>();

  return data as Writing[];
};

export const getWritingContent = async (id: number): Promise<Writing> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('board')
    .select(
      `
    *,
    member(id)
  `,
    )
    .eq('id', id)
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

  let { error } = await supabase.from('board').insert({
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

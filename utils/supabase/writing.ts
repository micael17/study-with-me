import { supabase } from './supabaseClient';

export const getWritingList = async (page: number, pageSize: number): Promise<Writing[]> => {
  const offset = (page - 1) * pageSize;
  const { data, error } = await supabase
    .from('writing')
    .select(
      `
      *,
      member(uid)
    `,
    )
    .eq('is_del', false)
    .neq('category', 'notice')
    .range(offset, offset + pageSize - 1)
    .order('writing_id', { ascending: false })
    .returns<Writing[]>();

  console.log('writing list: ', data);
  return data as Writing[];
};

export const getWritingListCount = async (): Promise<number> => {
  // Supabase에서 writings 테이블의 전체 데이터 개수 가져오기
  const { count, error } = await supabase
    .from('writing')
    .select('*', { count: 'exact' }) // count() 메서드를 사용하여 전체 데이터 개수를 정확하게 계산
    .eq('is_del', false);

  if (error) {
    console.log(error);
  }

  if (count) {
    return count;
  } else {
    return 0; // 데이터가 없는 경우 0 반환
  }
};

export const getNoticeList = async (): Promise<Writing[]> => {
  const { data, error } = await supabase
    .from('writing')
    .select(
      `
      *,      
      member(uid, is_admin)
      `,
    )
    .eq('category', 'notice')
    .range(0, 4)
    .eq('is_del', false)
    .order('writing_id', { ascending: false })
    .returns<Writing[]>();

  const adminData = data?.filter((d) => d.member.is_admin === true);
  return adminData as Writing[];
};

export const getWritingContent = async (writing_id: number): Promise<Writing> => {
  const { data: writingData, error: writingError } = await supabase
    .from('writing')
    .select(
      `
    *,
     member(uid, member_id)
  `,
    )
    .eq('writing_id', writing_id)
    .single<Writing>();

  const { count, error: replyError } = await supabase
    .from('reply')
    .select(
      `
    *
  `,
      { count: 'exact' },
    )
    .eq('writing_id', writing_id)
    .single<Writing>();

  if (writingData) {
    writingData.reply_cnt = count || 0;
  }

  return writingData as Writing;
};

export const submitBoardWriting = async (writingModel: Writing) => {
  let result: boolean = false;

  let { error } = await supabase.from('writing').insert({
    category: writingModel.category,
    title: writingModel.title,
    content: writingModel.content,
    uid: writingModel.member.uid,
  });

  if (error) {
    console.log(error);
    alert('글 작성 중 오류가 발생했습니다.');
  } else {
    result = true;
  }
  return result;
};

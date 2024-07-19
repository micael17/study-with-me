import BoardTable from '@/components/board/client/table';
import { getNoticeList, getWritingList, getWritingListCount } from '@/utils/supabase/board';
import MiniBoardTable from '@/components/board/client/miniTable';
import WriteButton from '@/components/board/client/writeButton';

export default async function BoardPage() {
  const noticeData: Writing[] = await getNoticeList();

  return (
    <>
      <div>
        <MiniBoardTable data={noticeData} title={'공지'} />
        <BoardTable title={'게시판'} />
      </div>

      <div>
        <WriteButton />
      </div>
    </>
  );
}

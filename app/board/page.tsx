import BoardTable from '@/components/board/client/table';
import { getNoticeList, getWritingList, getWritingListCount } from '@/utils/supabase/board';
import MiniBoardTable from '@/components/board/client/miniTable';
import WriteButton from '@/components/board/client/writeButton';
import { useRouter } from 'next/router';
import { useQuery } from '@chakra-ui/react';

export default async function BoardPage() {
  const page = 1;
  const pageSize = 10;
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

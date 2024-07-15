import BoardTable from '@/components/board/client/table';
import { getNoticeList, getWritingList, getWritingListCount } from '@/utils/supabase/client';
import MiniBoardTable from '@/components/board/client/miniTable';
import WriteButton from '@/components/board/client/writeButton';
import { useRouter } from 'next/router';
import { useQuery } from '@chakra-ui/react';

export default async function BoardPage() {
  const page = 1;
  const pageSize = 10;
  const noticeData: Writing[] = await getNoticeList();
  const data: Writing[] = await getWritingList(page, pageSize);
  const totalCount: number = await getWritingListCount();
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <div>
        <MiniBoardTable data={noticeData} title={'공지'} />
        <BoardTable data={data} totalPages={totalPages} title={'게시판'} />
      </div>

      <div>
        <WriteButton />
      </div>
    </>
  );
}

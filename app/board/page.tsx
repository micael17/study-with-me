import BoardTable from '@/components/board/table';
import { getNoticeList, getWritingList } from '@/utils/supabase/client';
import style from './boardPage.module.css';
import MiniBoardTable from '@/components/board/miniTable';
import { Box, Flex } from '@chakra-ui/react';

export default async function BoardPage() {
  const data: Writing[] = await getWritingList();
  const noticeData: Writing[] = await getNoticeList();

  return (
    <>
      <h1>Board</h1>
      <Flex justifyContent={'flex-start'}>
        <div className={style.container}>
          {/* 공지 */}
          <MiniBoardTable data={noticeData} title={'공지'} />
          <hr />
          {/* 게시판 */}
          <BoardTable data={data} title={'게시판'} />
        </div>
        <div className={style.container}>
          {/* 공지 */}
          <MiniBoardTable data={noticeData} title={'공지'} />
          <hr />
          {/* 게시판 */}
          <BoardTable data={data} title={'게시판'} />
        </div>
      </Flex>
    </>
  );
}

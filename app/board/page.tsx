import BoardTable from '@/components/board/table';
import { getNoticeList, getWritingList } from '@/utils/supabase/client';
import style from './boardPage.module.css';
import MiniBoardTable from '@/components/board/miniTable';
import NextLink from 'next/link';
import { Button, Link } from '@chakra-ui/react';

export default async function BoardPage() {
  const data: Writing[] = await getWritingList();
  const noticeData: Writing[] = await getNoticeList();

  return (
    <>
      <h1>Board</h1>
      {/* <Flex>
        <div style={{ flexGrow: 1 }}>
          <LeftMiniTable data={noticeData} title={'공지'} />
        </div>
        <Box mx={4}></Box>
        <div style={{ flexGrow: 11 }}>
          <MiniBoardTable data={noticeData} title={'공지'} />
          <hr />
          <BoardTable data={data} title={'게시판'} />
        </div>
      </Flex> */}
      <div>
        <MiniBoardTable data={noticeData} title={'공지'} />
        <hr />
        <BoardTable data={data} title={'게시판'} />
      </div>

      <div className={style.buttons}>
        <Link as={NextLink} href="/board/editor">
          <Button className={style.button}>글쓰기</Button>
        </Link>
      </div>
    </>
  );
}

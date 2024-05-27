import ReplyEditor from '@/components/board/replyEditor';
import Viewer from '@/components/board/viewer';
import { getWritingContent } from '@/utils/supabase/client';
import { Button, Link } from '@chakra-ui/react';
import { Suspense } from 'react';
import NextLink from 'next/link';

interface Props {
  params: {
    board_id: number;
  };
  searchParams: {};
}

export default async function ViewPage(props: Props) {
  const data: Writing = await getWritingContent(props.params.board_id);

  return (
    <>
      <Suspense>
        <Viewer writing={data} />
        <ReplyEditor />
      </Suspense>
      <div className="buttons">
        <Link as={NextLink} href="/board">
          <Button>게시판으로 가기</Button>
        </Link>
      </div>
    </>
  );
}

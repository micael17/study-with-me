import ReplyEditor from '@/components/board/client/replyEditor';
import Viewer from '@/components/board/client/viewer';
import { getWritingContent } from '@/utils/supabase/writing';
import { getReplyListRPC } from '@/utils/supabase/reply';
import { Button, Link } from '@chakra-ui/react';
import { Suspense } from 'react';
import NextLink from 'next/link';
import ReplyList from '@/components/board/client/replyList';

interface Props {
  params: {
    writing_id: number;
  };
  searchParams: {};
}

export default async function ViewPage(props: Props) {
  const data: Writing = await getWritingContent(props.params.writing_id);

  return (
    <>
      <Suspense>
        <Viewer writing={data} />
        <ReplyEditor isReReply={false} writing_id={props.params.writing_id} />
        <ReplyList writing_id={props.params.writing_id} />

        <Link m={3} as={NextLink} href="/board">
          <Button>게시판으로 가기</Button>
        </Link>
      </Suspense>
    </>
  );
}

import ReplyEditor from '@/components/board/client/replyEditor';
import Viewer from '@/components/board/client/viewer';
import { getReplyList, getReplyListRPC, getWritingContent } from '@/utils/supabase/client';
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
  console.log(data);
  //const replyList: Reply[] = await getReplyList(props.params.writing_id);
  const replyList: Reply[] = await getReplyListRPC(props.params.writing_id);

  return (
    <>
      <Suspense>
        <Viewer writing={data} />
        <ReplyEditor isReReply={false} writing_id={props.params.writing_id} member_id={1} />
        <ReplyList writing_id={props.params.writing_id} data={replyList} />
      </Suspense>
      <div className="buttons">
        <Link as={NextLink} href="/board">
          <Button>게시판으로 가기</Button>
        </Link>
      </div>
    </>
  );
}

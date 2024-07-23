import ReplyEditor from '@/components/board/client/replyEditor';
import Viewer from '@/components/board/client/viewer';
import { getWritingContent } from '@/utils/supabase/writing';
import { getReplyListRPC } from '@/utils/supabase/reply';
import { Box, Button, Link } from '@chakra-ui/react';
import { Suspense } from 'react';
import NextLink from 'next/link';
import ReplyList from '@/components/board/client/replyList';

export default async function StudyPage() {
  return (
    <>
      <Suspense></Suspense>

      <Box>오늘의 학습 계획 입니다.</Box>
      <Box>오늘의 학습 계획은 저장 후 24시간이 지나면 자동으로 삭제됩니다.</Box>
      <Box>오늘의 학습 계획을 세우는 것은 스스로 동기부여를 할 수 있고 등등 장점 나열</Box>

      <Box>목표</Box>

      <Box>세부 목표</Box>

      <Box>학습 또는 목표 이유</Box>

      <Box>기타 내용</Box>

      <Box>완료 여부(체크)</Box>

      <Link m={3} as={NextLink} href="/board">
        <Button>저장하기(쿠키)</Button>
      </Link>
    </>
  );
}

'use client';

import { Button, Textarea } from '@chakra-ui/react';
import style from './reply.module.css';
import { useState } from 'react';
import AutoResizeTextarea from './autoResizeTextarea';
import { submitReply } from '@/utils/supabase/board';
import { useRouter } from 'next/navigation';

interface Prop {
  writing_id: number;
  member_id?: number;
  origin_reply_id?: number;
  isReReply: boolean;
}

export default function ReplyEditor(props: Prop) {
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const onSubmitReply = async () => {
    // 댓글에서 의미 없는 줄바꿈 제거
    const cleanedContent = content
      .trim() // 문자열의 앞뒤 공백 제거
      .replace(/\n\s*\n/g, '\n'); // 여러 줄바꿈을 하나의 줄바꿈으로 변경

    if (cleanedContent === '') {
      // 댓글이 빈 문자열이면 제출하지 않음
      return;
    }

    const reply: ReplyForPost = {
      writing_id: props.writing_id,
      content: cleanedContent,
      member_id: props.member_id || 1,
      origin_reply_id: props.origin_reply_id || null,
      is_del: false,
      is_nested: props.isReReply,
      member: {
        id: 1,
      },
    };

    const result = await submitReply(reply);
    if (result) {
      //@TODO 새로고침말고 컴포넌트만 새로불러오기
      router.refresh();
    }
  };

  return (
    <>
      <div className={style.replyEditor}>
        <AutoResizeTextarea value={content} onChange={setContent}></AutoResizeTextarea>
        <Button onClick={onSubmitReply}>댓글 쓰기</Button>
      </div>
    </>
  );
}

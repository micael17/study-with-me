'use client';

import { Button, Textarea } from '@chakra-ui/react';
import style from './reply.module.css';
import { useState } from 'react';
import AutoResizeTextarea from './autoResizeTextarea';
import { submitReply } from '@/utils/supabase/client';

export default function ReplyEditor() {
  const [content, setContent] = useState<string>('');

  const onSubmitReply = () => {
    // 댓글에서 의미 없는 줄바꿈 제거
    const cleanedContent = content
      .trim() // 문자열의 앞뒤 공백 제거
      .replace(/\n\s*\n/g, '\n'); // 여러 줄바꿈을 하나의 줄바꿈으로 변경

    if (cleanedContent === '') {
      // 댓글이 빈 문자열이면 제출하지 않음
      return;
    }

    /* const reply: Reply = {
      board_id: 0,
      content: cleanedContent,
      member_id: member_id,
      isNested: isNested,
      mention_member_id: mention_member_id,
    } */

    // submitReply();
  };

  return (
    <>
      <div className={style.replyEditor}>
        <AutoResizeTextarea value={content} onChange={setContent}></AutoResizeTextarea>
        <Button onClick={onSubmitReply}>댓글 쓰기</Button>
      </div>
      <hr />
    </>
  );
}

'use client';

import { Button, Input } from '@chakra-ui/react';
import style from './reply.module.css';
import { useState } from 'react';

export default function ReplyEditor() {
  const [content, setContent] = useState<string>();

  const onSubmitReply = () => {
    console.log(content);
  };

  return (
    <>
      <div className={style.replyEditor}>
        <Input
          type="textarea"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></Input>
        <Button onClick={onSubmitReply}>댓글 쓰기</Button>
      </div>
      <hr />
    </>
  );
}

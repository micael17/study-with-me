'use client';

import { Button } from '@chakra-ui/react';
import style from './reply.module.css';
import { formatTimeAgo } from '@/utils/etc/date';
import { useEffect, useState } from 'react';
import ReplyEditor from './replyEditor';

interface Props {
  writing_id: number;
  data: Reply[];
}

export default function ReplyListComponent(props: Props) {
  type ReReply = {
    reply_id: number;
    member_id: number;
  };
  const [reReply, setReReply] = useState<ReReply>();
  const reply_cnt = props.data.length;

  const handleReReply = (reply_id: number, member_id: number) => {
    console.log('reply_id', reply_id, member_id, props.writing_id);

    setReReply({
      reply_id,
      member_id,
    });
  };

  useEffect(() => {
    console.log('props', props.data);
  }, []);

  return (
    <>
      <div className={style.reply_container}>
        <div className={style.reply_cnt}>
          {reply_cnt} {reply_cnt === 1 ? 'comment' : 'comments'}{' '}
        </div>
        {props.data.map((reply, index) => (
          <div key={index} className={`${style.reply} ${reply.is_nested ? style.nested_reply : ''}`}>
            <div className={style.reply_header}>
              <div className={style.reply_info}>
                {reply.member?.id} : {formatTimeAgo(reply.created_at || '')} :&nbsp;
                <Button variant="link" size={'xs'} onClick={() => handleReReply(reply.reply_id, reply.member_id)}>
                  답글
                </Button>
              </div>
            </div>
            <div className={style.reply_content}>
              <p>{reply.content}</p>
            </div>
            {reReply?.reply_id === reply.reply_id && (
              <ReplyEditor
                writing_id={props.writing_id}
                member_id={1}
                origin_reply_id={reReply.reply_id}
                isReReply={true}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

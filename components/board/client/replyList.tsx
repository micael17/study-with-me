'use client';

import { Box, Button } from '@chakra-ui/react';
import style from './reply.module.css';
import { formatTimeAgo } from '@/utils/etc/date';
import { useEffect, useRef, useState } from 'react';
import ReplyEditor from './replyEditor';
import useReplyStore from '@/utils/store/useReplyStore';
import useSessionStore from '@/utils/store/useSessionStore';
import { useScrollStore } from '@/utils/store/useScrollStore';
import { getReplyListRPC } from '@/utils/supabase/reply';

interface Props {
  writing_id: number;
}

export default function ReplyListComponent(props: Props) {
  type ReReply = {
    reply_id: number;
    uid: string;
  };

  const [replyList, setReplyList] = useState<Reply[]>([]);
  const { setPageRendered } = useScrollStore();
  const { userMetaData, isLogined } = useSessionStore();
  const { needRefresh, setNeedRefresh } = useReplyStore();
  const [reReply, setReReply] = useState<ReReply>();

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async (writingId: number) => {
    const replyList = await getReplyListRPC(writingId);
    setReplyList(replyList);
  };

  useEffect(() => {
    if (needRefresh) {
      setNeedRefresh(false);
      fetchData(props.writing_id);
    }
  }, [props.writing_id, needRefresh]);

  useEffect(() => {
    fetchData(props.writing_id);
  }, [props.writing_id]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (container.querySelectorAll('div .reply_header').length >= replyList.length) {
        setPageRendered(true);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [replyList, setPageRendered]);

  const handleInit = () => {
    setReReply({} as ReReply);
  };

  const handleReReply = (reply_id: number, uid: string) => {
    setReReply({
      reply_id,
      uid,
    });
  };

  const handleModify = (reply_id: number, uid: string) => {};

  const handleDelete = (reply_id: number, uid: string) => {};

  return (
    <>
      <Box ref={containerRef} m={3} className={style.reply_container}>
        <div className={style.reply_cnt}>
          {replyList.length} {replyList.length === 1 ? 'comment' : 'comments'}{' '}
        </div>
        {replyList.map((reply, index) => (
          <div key={index} className={`${style.reply} ${reply.is_nested ? style.nested_reply : ''}`}>
            <div className={style.reply_header}>
              <div className={style.reply_info}>
                {reply.member.member_id === userMetaData.member_id ? (
                  <span className={style.my_reply}>{reply.member.member_id}</span>
                ) : (
                  <span>{reply.member.member_id}</span>
                )}
                : {formatTimeAgo(reply.created_at || '')}
                {isLogined && (
                  <Button
                    mx={1}
                    variant="link"
                    size={'xs'}
                    onClick={() => handleReReply(reply.reply_id, reply.member.uid)}
                  >
                    답글
                  </Button>
                )}
                {reply.member.member_id === userMetaData.member_id && (
                  <>
                    <Button
                      mx={1}
                      variant="link"
                      size={'xs'}
                      onClick={() => handleModify(reply.reply_id, reply.member.uid)}
                    >
                      수정
                    </Button>
                    <Button
                      mx={1}
                      variant="link"
                      size={'xs'}
                      onClick={() => handleDelete(reply.reply_id, reply.member.uid)}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className={style.reply_content}>
              <p>{reply.content}</p>
            </div>
            {reReply?.reply_id === reply.reply_id && (
              <ReplyEditor
                writing_id={props.writing_id}
                origin_reply_id={reReply.reply_id}
                isReReply={true}
                /* onClose={handleInit} */
              />
            )}
          </div>
        ))}
      </Box>
    </>
  );
}

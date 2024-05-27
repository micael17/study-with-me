import { Button } from '@chakra-ui/react';
import style from './reply.module.css';

interface Props {
  data: Reply[];
}

export default function ReplyListComponent(props: Props) {
  const reply_cnt = props.data.length;

  return (
    <>
      <div className={style.reply_container}>
        <div className={style.reply_cnt}>{reply_cnt} comments</div>
        <div className={`${style.reply}`}>
          <div className={style.reply_header}>
            <div className={style.reply_info}>
              by: 사용자1, 작성일: 2024-05-24, <Button>답글</Button>
            </div>
          </div>
          <div className={style.reply_content}>
            <p>이 댓글은 댓글 내용입니다.</p>
          </div>
        </div>
        <div className={`${style.reply} ${style.nested_reply}`}>
          <div className={style.reply_header}>
            <div className={style.reply_info}>by: 사용자2, 작성일: 2024-05-25</div>
          </div>
          <div className={style.reply_content}>
            <p>댓글의 댓글 내용은 여기에 있습니다.</p>
          </div>
        </div>
        <div className={`${style.reply} ${style.nested_reply}`}>
          <div className={style.reply_header}>
            <div className={style.reply_info}>by: 사용자2, 작성일: 2024-05-25</div>
          </div>
          <div className={style.reply_content}>
            <p>더 깊은 단계의 댓글 내용은 여기에 있습니다.</p>
          </div>
        </div>
      </div>
    </>
  );
}

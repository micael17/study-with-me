'use client';

import { Box, Flex } from '@chakra-ui/react';
import style from './table.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { formatTimeAgo } from '@/utils/etc/date';

interface Props {
  writing: Writing;
}

export default function Viewer(props: Props) {
  const createMarkup = (text: string) => {
    return {
      __html: text,
    };
  };

  return (
    <>
      <Box m={3} className={style.textViewer}>
        <div>{props.writing.category}</div>
        <div className={style.title}>{props.writing.title}</div>
        <Flex className={style.subTitle} align="left" alignItems="flex-start">
          <div className={style.id}>by {props.writing.member!.member_id}</div>
          <span>•</span>
          <div>{formatTimeAgo(props.writing.created_at || '')}</div>
          <span>•</span>
          <div>{props.writing.like_cnt}</div>
          <span>•</span>
          <div>{props.writing.reply_cnt}</div>
          <span>•</span>
          <div>{props.writing.view_cnt}</div>
        </Flex>
        <hr />
        <div className={style.content} dangerouslySetInnerHTML={createMarkup(props.writing.content)}></div>
      </Box>
      <hr />
    </>
  );
}

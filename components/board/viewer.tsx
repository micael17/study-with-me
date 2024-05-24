'use client';

import dynamic from 'next/dynamic';
import { Flex } from '@chakra-ui/react';
// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import style from './table.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { formatTimeAgo } from '@/utils/etc/date';

interface Props {
  writing: Writing;
}

export default function Viewer(props: Props) {
  const modules = {
    toolbar: [],
  };

  const createMarkup = (text: string) => {
    return {
      __html: text,
    };
  };

  return (
    <>
      <div className={style.textViewer}>
        <div className={style.title}>{props.writing.title}</div>
        <Flex className={style.subTitle} align="left" alignItems="flex-start">
          <div className={style.id}>by {props.writing.member!.id}</div>
          <span>•</span>
          <div>{props.writing.category}</div>
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
        {/* <ReactQuill readOnly modules={modules} theme="snow" value={props.writing.content} /> */}
      </div>
      <hr />
      <div className={style.buttons}>
        <Link as={NextLink} href="/board">
          <Button className={style.button}>게시판으로 가기</Button>
        </Link>
      </div>
    </>
  );
}

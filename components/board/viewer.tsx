import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import style from './board.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { Button } from '@chakra-ui/react';

interface Props {
  writing: Writing;
  onChangeBoardState: (state: string) => void;
}

export default function Viewer(props: Props) {
  const modules = {
    toolbar: [],
  };

  return (
    <>
      <div className="text-viewer">
        <ReactQuill readOnly modules={modules} theme="snow" value={props.writing.content} />
      </div>
      <div className={style.buttons}>
        <Button
          className={style.button}
          onClick={() => {
            props.onChangeBoardState('board');
          }}
        >
          게시판으로 가기
        </Button>
      </div>
    </>
  );
}

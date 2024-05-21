import ReactQuill from 'react-quill';
import style from './table.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  writing: Writing;
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
        <Link as={NextLink} href="/board">
          <Button className={style.button}>게시판으로 가기</Button>
        </Link>
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import style from './board.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';

interface Props {
  writing: Writing;
}

export default function Viewer(props: Props) {
  const modules = {
    toolbar: [],
  };

  return (
    <div className="text-viewer">
      <ReactQuill readOnly modules={modules} theme="snow" value={props.writing.content} />
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import style from './board.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { createClient } from '@/utils/supabase/client';
import { base64toFiles } from '@/utils/etc/img';

export default function tuiEditor() {
  const [value, setValue] = useState<string>('');

  const onSubmitBtnClick = async () => {
    const tmpDom = document.createElement('div');
    tmpDom.innerHTML = value;
    const imgs = tmpDom.getElementsByTagName('img');

    const files = base64toFiles(imgs, 'id');
    console.log(files);

    return;

    const supabase = createClient();
    let { error } = await supabase
      .from('board')
      .insert({ category: 'test', title: 'test!title!', content: value, member_id: 1 });

    if (error) {
      console.log(error);
      alert(error);
    } else {
      location.reload();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="text-editor">
      <div>글 작성</div>
      <input type="text" id="title" placeholder="제목" className={style.title}></input>
      <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />
      <button onClick={onSubmitBtnClick}>작성완료</button>
    </div>
  );
}

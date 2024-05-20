import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import style from './board.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { submitBoardWriting, uploadFileToSupabase } from '@/utils/supabase/client';
import { base64toFiles } from '@/utils/etc/img';

export default function Editor() {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onSubmitBtnClick = async () => {
    const tmpDom = document.createElement('div');
    tmpDom.innerHTML = content;
    const imgs = tmpDom.getElementsByTagName('img');
    const files = base64toFiles(imgs, 'id');
    let urls: string[] = [];
    if (files) {
      urls = await uploadFileToSupabase(files);

      let tmpValue = content;
      if (urls.length === imgs.length) {
        for (let i = 0; i < imgs.length; i++) {
          tmpValue = tmpValue.replace(imgs[i].src, urls[i]);
        }
        setContent(tmpValue);
      } else {
        console.error('err: 이미지 업로드개수와 태그개수가 일치하지 않습니다.');
        alert('에러) 이미지 업로드에 실패했습니다.');
      }
    }

    const writingModel: Writing = {
      category: category,
      content: content,
      title: title,
    };
    const res = await submitBoardWriting(writingModel);
    if (res === true) {
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
      <input
        type="text"
        id="category"
        placeholder="구분"
        className={style.category}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      <input
        type="text"
        id="title"
        placeholder="제목"
        className={style.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
      <button onClick={onSubmitBtnClick}>작성완료</button>
    </div>
  );
}

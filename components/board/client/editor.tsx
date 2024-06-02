'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import { submitBoardWriting, uploadFileToSupabase } from '@/utils/supabase/client';
import { base64toFiles } from '@/utils/etc/img';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

import style from './table.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { useRouter } from 'next/navigation';

interface Props {
  writing: Writing;
}

export default function Editor(props: Props) {
  const [category, setCategory] = useState<string>(props.writing.category || '');
  const [title, setTitle] = useState<string>(props.writing.title || '');
  const [content, setContent] = useState<string>(props.writing.content || '');

  const router = useRouter();

  const onSubmitBtnClick = async () => {
    const tmpDom = document.createElement('div');
    tmpDom.innerHTML = content;
    const imgs = tmpDom.getElementsByTagName('img');
    const files = base64toFiles(imgs, 'id');
    let urls: string[] = [];
    if (files) {
      urls = await uploadFileToSupabase(files);

      if (urls.length !== imgs.length) {
        console.error('err: 이미지 업로드개수와 태그개수가 일치하지 않습니다.');
        alert('에러) 이미지 업로드에 실패했습니다.');
        return;
      }

      for (let i = 0; i < imgs.length; i++) {
        tmpDom.innerHTML = tmpDom.innerHTML.replace(imgs[i].src, urls[i]);
      }
    }

    setContent(tmpDom.innerHTML);
    const writingModel: Writing = {
      category: category,
      content: tmpDom.innerHTML,
      title: title,
    };

    const res = await submitBoardWriting(writingModel);
    if (res === true) {
      router.push('/board');
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
    <>
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
      </div>

      <div className={style.buttons}>
        <Button className={style.button} onClick={onSubmitBtnClick}>
          작성 완료
        </Button>
        <Link href="/board">
          <Button className={style.button}>게시판으로 가기</Button>
        </Link>
      </div>
    </>
  );
}

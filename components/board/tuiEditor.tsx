import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import style from './board.module.css';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { createClient } from '@/utils/supabase/client';
import { base64toFiles } from '@/utils/etc/img';

export default function tuiEditor() {
  const [value, setValue] = useState<string>('');

  const uploadFileToSupabase = async (files: File[]) => {
    const supabase = createClient();

    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const { data, error } = await supabase.storage.from('images').upload(`public/${files[i].name}`, files[i], {
        cacheControl: '3600',
        upsert: false,
      });

      if (data?.path) {
        const {
          data: { publicUrl },
        } = supabase.storage.from('images').getPublicUrl(data.path);
        urls.push(publicUrl);
      } else {
        console.log('err', error);
      }
    }

    return urls;
  };

  const onSubmitBtnClick = async () => {
    const tmpDom = document.createElement('div');
    tmpDom.innerHTML = value;
    const imgs = tmpDom.getElementsByTagName('img');
    const files = base64toFiles(imgs, 'id');
    let urls: string[] = [];
    if (files) {
      urls = await uploadFileToSupabase(files);

      let tmpValue = value;
      if (urls.length === imgs.length) {
        for (let i = 0; i < imgs.length; i++) {
          tmpValue = tmpValue.replace(imgs[i].src, urls[i]);
        }
        setValue(tmpValue);
      } else {
        console.error('err: 이미지 업로드개수와 태그개수가 일치하지 않습니다.');
        alert('에러) 이미지 업로드에 실패했습니다.');
      }
    }

    console.log(urls);
    return;

    //file을 업로드하고 URL을 받아온 뒤
    //아까 찾았던 img 태그의 src 소스에 치환해준다.
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

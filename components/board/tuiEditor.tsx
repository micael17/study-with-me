'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect } from 'react';

export default function tuiEditor() {
  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwig"
      useCommandShortcut={true}
    />
  );
}

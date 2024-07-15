import Editor from '@/components/board/client/editor';
import BoardTable from '@/components/board/client/table';
import { getWritingContent, getWritingList } from '@/utils/supabase/client';

interface Props {
  params: {
    writing_id: number;
  };
  searchParams: {};
}

export default async function EditorPage(props: Props) {
  let data: Writing = {
    category: '',
    content: '',
    title: '',
  };

  if (props.params.writing_id) {
    data = await getWritingContent(props.params.writing_id);
  }

  return (
    <div className="container">
      <Editor writing={data}></Editor>
    </div>
  );
}

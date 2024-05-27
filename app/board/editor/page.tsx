import Editor from '@/components/board/editor';
import BoardTable from '@/components/board/table';
import { getWritingContent, getWritingList } from '@/utils/supabase/client';

interface Props {
  params: {
    board_id: number;
  };
  searchParams: {};
}

export default async function EditorPage(props: Props) {
  let data: Writing = {
    category: '',
    content: '',
    title: '',
  };
  if (props.params.board_id) {
    data = await getWritingContent(props.params.board_id);
  }

  return (
    <div className="container">
      <Editor writing={data}></Editor>
    </div>
  );
}

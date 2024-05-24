import BoardTable from '@/components/board/table';
import { getWritingList } from '@/utils/supabase/client';

export default async function BoardPage() {
  const data: Writing[] = await getWritingList();

  return (
    <div className="container">
      <BoardTable data={data} />
    </div>
  );
}

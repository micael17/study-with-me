import BoardTable from '@/components/board/table';
import { getWritingList } from '@/utils/supabase/client';
import style from './boardPage.module.css';

export default async function BoardPage() {
  const data: Writing[] = await getWritingList();

  return (
    <>
      <h1>Board</h1>
      <div className={style.container}>
        <BoardTable data={data} />
      </div>
    </>
  );
}

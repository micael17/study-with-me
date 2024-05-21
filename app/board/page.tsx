import BoardTable from '@/components/board/table';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';

export default async function Board() {
  const getBoardData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('board').select(`
      *,
      member(id)
    `);

    return data as Writing[];
  };

  const data: Writing[] = await getBoardData();

  return (
    <div className="container">
      <BoardTable data={data} />
    </div>
  );
}

import Viewer from '@/components/board/viewer';
import { getWritingContent } from '@/utils/supabase/client';
import { Suspense } from 'react';

interface Props {
  params: {
    id: number;
  };
  searchParams: {};
}

export default async function ViewPage(props: Props) {
  const data: Writing = await getWritingContent(props.params.id);

  return (
    <>
      <Suspense>
        <Viewer writing={data} />
      </Suspense>
    </>
  );
}

'use client';

import Viewer from '@/components/board/viewer';
import { useSearchParams } from 'next/navigation';

interface Props {
  params: {
    id: number;
  };
  searchParams: {};
}

export default function ViewPage(props: Props) {
  console.log('id', props.params.id);
  const data: Writing = {} as Writing;
  return <Viewer writing={data} />;
}

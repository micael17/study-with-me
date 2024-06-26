import MainGrid from '@/components/youtube/client/mainGrid';
import { getYoutubeList } from '@/utils/etc/youtube';
import { createClient } from '@/utils/supabase/server';
import { Box, Select, SimpleGrid } from '@chakra-ui/react';

export default async function Page() {
  //서버 컴포넌트에서 로그인 확인
  /* const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user); */

  const res: any = await getYoutubeList();

  return (
    <>
      <MainGrid videos={res.items} />
    </>
  );
}

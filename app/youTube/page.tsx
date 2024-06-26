import MainGridComponent from '@/components/youtube/client/mainGrid';
import { getYoutubeList } from '@/utils/etc/youtube';

export default async function YouTubePage() {
  const res: any = await getYoutubeList();
  return (
    <>
      <MainGridComponent videos={res.items} />
    </>
  );
}

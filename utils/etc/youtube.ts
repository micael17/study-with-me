import { supabase } from '../supabase/client';

async function getYoutubeLisst() {
  const key = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
  const url = 'https://youtube.googleapis.com/youtube/v3/search';
  const query = 'study with me'; //study%2520with%2520me
  const maxResults = 25;
  const videoCategoryId = '27'; // 교육 카테고리
  const order = 'relevance';
  const param = `?part=snippet&maxResults=${maxResults}&q=${query}&order=${order}&key=${key}`;

  const response = await fetch(url + param);

  return response.json();
}

async function getYoutubeList() {
  const { data, error } = await supabase
    .from('youtube_videos')
    .select('data')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error reading YouTube list data:', error);
    return;
  }

  return data.data;
}

export { getYoutubeList };

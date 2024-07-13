const key = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
const url = 'https://youtube.googleapis.com/youtube/v3/search';
const query = 'study with me|스터디'; //study%2520with%2520me
const maxResults = 48;
const order = 'relevance';
const type = 'video';
const videoEmbeddable = 'true';
const regionCode = 'KR';
const relevanceLanguage = 'ko';
const safeSearch = 'strict';
const param =
  `?part=snippet&maxResults=${maxResults}&q=${query}&order=${order}` +
  `&key=${key}&type=${type}&videoEmbeddable=${videoEmbeddable}` +
  `&regionCode=${regionCode}&relevanceLanguage${relevanceLanguage}&safeSearch=${safeSearch}`;

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function clearYoutubeList() {
  try {
    const { error } = await supabase.from('youtube_videos').delete().neq('id', 0); // 'id'가 비어 있지 않은 모든 행을 삭제합니다
    if (error) {
      throw error;
    }
    console.log('All YouTube list cleared successfully.');
  } catch (error) {
    console.error('Error clearing YouTube list:', error.message);
    throw error;
  }
}

async function saveYoutubeList(videoList) {
  try {
    await clearYoutubeList();
    const { error } = await supabase.from('youtube_videos').insert([{ data: videoList }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('YouTube list saved successfully.');
    }
  } catch (error) {
    console.error('Error fetching YouTube list:', error);
  }
}

async function fetchAndSaveYoutubeList() {
  try {
    const response = await fetch(url + param);
    const data = await response.json();

    const videoList = data.items.map((item) => ({
      id: item.id,
      snippet: item.snippet,
    }));

    await saveYoutubeList(videoList);
  } catch (error) {
    console.error('Error fetching and saving YouTube list:', error);
  }
}

fetchAndSaveYoutubeList();

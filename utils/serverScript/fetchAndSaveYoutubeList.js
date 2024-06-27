// fetchAndSaveYoutubeList.js

const fetch = require('node-fetch');
const { saveYoutubeList } = require('../supabase/server');

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
const query = 'study with me';
const maxResults = 25;
const order = 'relevance';
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
  query,
)}&order=${order}&key=${API_KEY}`;

async function fetchAndSaveYoutubeList() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const videoList = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      // 필요한 다른 속성들을 추가할 수 있습니다.
    }));

    await saveYoutubeList(videoList);
  } catch (error) {
    console.error('Error fetching and saving YouTube list:', error);
  }
}

fetchAndSaveYoutubeList();

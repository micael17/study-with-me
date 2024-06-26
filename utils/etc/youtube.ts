async function getYoutubeList() {
  const key = process.env.NEXT_PUBLIC_YOUTUBE_KEY;
  const url = 'https://youtube.googleapis.com/youtube/v3/search';
  const param = '?part=snippet&maxResults=25&q=study%2520with%2520me&key=' + key;

  const response = await fetch(url + param);

  return response.json();
}

export { getYoutubeList };

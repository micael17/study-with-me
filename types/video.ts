interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
      standard: {
        url: string;
      };
      maxres: {
        url: string;
      };
    };
  };
}

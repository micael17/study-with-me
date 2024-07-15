function base64toFiles(imgEl: HTMLCollectionOf<HTMLImageElement>, id: string) {
  const files: File[] = [];

  for (let i = 0; i < imgEl.length; i++) {
    const imageBase64 = imgEl[i].src.match(/data:image\/(png|jpg|jpeg|gif);base64,/);
    if (imageBase64) {
      const arr = imgEl[i].src.split(',');
      const matchedData = arr[0].match(/:(.*?);/);

      if (!matchedData) return;

      const mime = matchedData[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const filename = `${id}_${Date.now() + n}_${i}.png`; //유니크 파일명 생성
      files.push(new File([u8arr], filename, { type: mime }));
    }
  }

  return files;
}

export { base64toFiles };

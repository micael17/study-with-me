import { supabase } from './supabaseClient';

export const uploadImageToSupabase = async (files: File[]) => {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const { data, error } = await supabase.storage.from('images').upload(`public/${files[i].name}`, files[i], {
      cacheControl: '3600',
      upsert: false,
    });

    if (data?.path) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(data.path);
      urls.push(publicUrl);
    } else {
      console.log('err', error);
    }
  }

  return urls;
};

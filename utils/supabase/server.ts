import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getYoutubeList } from '../etc/youtube';

export function createClient() {
  const cookieStore = cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name, options) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function saveYoutubeList() {
  try {
    const data = await getYoutubeList();
    const supabase = createClient();
    const { error } = await supabase.from('youtube_videos').insert([{ data }]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('YouTube list saved successfully.');
    }
  } catch (error) {
    console.error('Error fetching YouTube list:', error);
  }
}

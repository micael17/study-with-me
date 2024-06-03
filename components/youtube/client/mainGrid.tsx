'use client';

import { createClient, uploadFileToSupabase } from '@/utils/supabase/client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function MainGridComponent() {
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <SimpleGrid columns={[1, 2]} spacing="40px">
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </div>
  );
}

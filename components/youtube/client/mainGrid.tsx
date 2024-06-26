'use client';

import { createClient, uploadFileToSupabase } from '@/utils/supabase/client';
import {
  Box,
  Grid,
  Image,
  Text,
  Container,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Video = {
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
    };
  };
};

interface Props {
  videos: Video[];
}

export default function MainGridComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVideo, setSelectedVideo] = useState<Video>();

  const handleThumbnailClick = (video: Video) => {
    setSelectedVideo(video);
    onOpen();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log('test', user);
      console.log(props.videos);
    };

    fetchUser();
  }, []);

  return (
    <Container maxW="1600px" p={4}>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {props.videos.map((video) => (
          <Box
            key={video.id.videoId}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={() => handleThumbnailClick(video)}
            cursor="pointer"
          >
            <AspectRatio ratio={16 / 9}>
              <Image src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </AspectRatio>
            <Box p="6">
              <Text fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
                {video.snippet.title}
              </Text>
              <Text mt={2} noOfLines={2}>
                {video.snippet.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>

      {selectedVideo && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedVideo.snippet.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                  title={selectedVideo.snippet.title}
                  allowFullScreen
                />
              </AspectRatio>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

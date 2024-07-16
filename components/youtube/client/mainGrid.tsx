'use client';

import { supabase } from '@/utils/supabase/supabaseClient';

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
import { useEffect, useRef, useState } from 'react';

interface Props {
  videos: Video[];
}

export default function MainGridComponent(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState<Video>();

  const handleThumbnailClick = (video: Video) => {
    setSelectedVideo(video);
    onOpen();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    };

    fetchUser();
  }, []);

  return (
    <>
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
              <Image src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
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

      {selectedVideo && ( //blockScrollOnMount={false} 이거 안하면 모달 열릴때 body깨짐!
        <Modal
          blockScrollOnMount={false}
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
          isCentered
        >
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
              <Text>{selectedVideo.snippet.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

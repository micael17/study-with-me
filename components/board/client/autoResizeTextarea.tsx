'use client';

import { Textarea } from '@chakra-ui/react';
import { useRef, useEffect, ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (s: string) => void;
}

export default function AutoResizeTextarea(props: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      // Reset height to auto to correctly calculate the new height
      textareaRef.current.style.height = 'auto';
      // Set the height to the scrollHeight of the textarea
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [props.value]);

  useEffect(() => {
    resizeTextarea();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={props.value}
      onChange={handleChange}
      style={{
        overflow: 'hidden',
        resize: 'none',
      }}
      rows={3}
    />
  );
}

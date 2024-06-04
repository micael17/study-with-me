'use client';

import { useState, FormEvent } from 'react';
import { createClient, signUp } from '@/utils/supabase/client';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signUp(email, password, id);
    if (result === 422) {
      toast({
        title: '회원가입 실패',
        description: '이미 가입된 이메일입니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (result === 200) {
      toast({
        title: '회원가입 성공',
        description: '이제 로그인해주세요!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push('/login'); // Redirect to home page after 2 seconds
      }, 2000);
    } else {
      toast({
        title: '회원가입 실패',
        description: '알 수 없는 오류입니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        회원가입
      </Heading>
      <form onSubmit={handleSignUp}>
        <FormControl id="email" isRequired mb={4}>
          <FormLabel>이메일</FormLabel>
          <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="id" isRequired mb={4}>
          <FormLabel>아이디(닉네임)</FormLabel>
          <Input type="id" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired mb={4}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={loading} width="full" mt={4}>
          회원가입
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;

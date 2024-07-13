'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import useSessionStore from '@/utils/etc/useSessionStore';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useSessionStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/'); // 로그인 성공 시 홈 페이지로 리디렉션
    } catch (err) {
      setError('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        로그인
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl id="email">
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </FormControl>
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" onClick={handleLogin}>
          로그인
        </Button>
        <Box textAlign="center">
          <Link color="teal.500" onClick={() => router.push('/reset-password')}>
            비밀번호 찾기
          </Link>
        </Box>
        <Box textAlign="center">
          <Link color="teal.500" onClick={() => router.push('/signup')}>
            회원 가입
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginPage;

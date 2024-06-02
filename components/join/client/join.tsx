'use client';
import { FormEvent, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('회원가입이 완료되었습니다! 이메일을 확인하세요.');
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
}

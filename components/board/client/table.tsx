'use client';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Link,
  theme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import style from './table.module.css';
import NextLink from 'next/link';
import { getWritingList, getWritingListCount } from '@/utils/supabase/writing';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  title: string;
}

interface PageDataParam {
  (page: number, pageSize: number): void;
}

const PAGE_SIZE = 10; // 한 페이지에 보여줄 항목 수
const maxPagesToShow = 6; // 페이지네이션에서 표시할 최대 페이지 버튼 수

export default function BoardTable(props: Props) {
  const [data, setData] = useState<Writing[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const params = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(params.get('page') || '1', 10);

  const fetchData = async (page: number, pageSize: number) => {
    const totalCount: number = await getWritingListCount();
    const data: Writing[] = await getWritingList(page, pageSize);
    setTotalCount(totalCount);
    setData(data);
  };

  useEffect(() => {
    fetchData(currentPage, PAGE_SIZE);
  }, [currentPage, params]);

  const onPageChange = (page: number) => {
    const query = `?page=${page}`;
    router.push(`/board${query}`);
  };

  // 현재 페이지 주변의 페이지 번호만 표시
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) - 1;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const visiblePages = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);

  const dateFormat = (dateString: string) => {
    const date = new Date(dateString);
    let dateFormat2 =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      ' ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':' +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return dateFormat2;
  };

  return (
    <>
      <TableContainer my={5} p={2}>
        <h1 style={{ borderLeft: '6px solid gray', paddingLeft: '10px' }}>{props.title}</h1>
        <Table mt={5} size="sm" variant="simple" className={style.boardTable}>
          <Thead>
            <Tr>
              <Th w="30px" textAlign={'center'}>
                번호
              </Th>
              <Th w="30px" textAlign={'center'}>
                분류
              </Th>
              <Th w="800px" textAlign={'center'}>
                제목
              </Th>
              <Th textAlign={'center'}>글쓴이</Th>
              <Th textAlign={'center'}>날짜</Th>
              <Th textAlign={'center'}>조회</Th>
              <Th textAlign={'center'}>추천</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((row, index) => (
                <Tr className={style.tr} key={index}>
                  <Td textAlign={'center'}>{row.writing_id}</Td>
                  <Td textAlign={'center'}>{row.category}</Td>
                  <Td>
                    <Link as={NextLink} href={`/board/${row.writing_id}`}>
                      {row.title}
                    </Link>
                  </Td>
                  <Td textAlign={'center'}>{row.member?.member_id}</Td>
                  <Td textAlign={'center'}>{dateFormat(row.created_at || '')}</Td>
                  <Td textAlign={'center'}>{row.view_cnt}</Td>
                  <Td textAlign={'center'}>{row.like_cnt}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {/* 페이지네이션 UI */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {
            <Button
              variant="link"
              onClick={() => onPageChange(currentPage - maxPagesToShow > 1 ? currentPage - maxPagesToShow : 1)}
              isDisabled={currentPage === 1}
            >
              이전
            </Button>
          }
          {startPage > 1 && (
            <>
              <Button variant="link" onClick={() => onPageChange(1)}>
                1
              </Button>
              {startPage > 2 && <span>...</span>}
            </>
          )}
          {visiblePages.map((page) =>
            currentPage === page ? (
              <Button variant="link" key={page} color="black">
                {page}
              </Button>
            ) : (
              <Button variant="link" key={page} onClick={() => onPageChange(page)}>
                {page}
              </Button>
            ),
          )}
          {endPage < totalPages && (
            <>
              {<span>...</span>}
              {/* {                
                <Button variant="link" onClick={() => onPageChange(totalPages)}>
                  {totalPages}
                </Button>            
              } */}
            </>
          )}
          {
            <Button
              variant="link"
              onClick={() =>
                onPageChange(currentPage + maxPagesToShow < totalPages ? currentPage + maxPagesToShow : totalPages)
              }
              isDisabled={currentPage === totalPages}
            >
              다음
            </Button>
          }
        </div>
      </TableContainer>
    </>
  );
}

'use client';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import style from './table.module.css';
import NextLink from 'next/link';
import { getWritingList } from '@/utils/supabase/client';

interface Props {
  title: string;
  data: Writing[];
  totalPages: number;
}
const PAGE_SIZE = 10; // 한 페이지에 보여줄 항목 수

export default function BoardTable(props: Props) {
  const { totalPages } = props;
  const [data, setData] = useState<Writing[]>(props.data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // 페이지네이션에서 표시할 최대 페이지 버튼 수
  const maxPagesToShow = 5;

  // 현재 페이지 주변의 페이지 번호만 표시
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const visiblePages = Array.from({ length: endPage + 1 - startPage }, (_, index) => startPage + index);

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const currentData = data.slice(startIndex, startIndex + PAGE_SIZE);

  const onPageChange = async (page: any) => {
    const newData: Writing[] = await getWritingList(page, PAGE_SIZE);
    console.log(page, newData);
    setData(newData);
    setCurrentPage(currentPage);
  };

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

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <TableContainer my={5} p={2}>
        <h1 style={{ borderLeft: '6px solid gray', paddingLeft: '10px' }}>{props.title}</h1>
        <Table mt={5} size="sm" variant="simple" className={style.boardTable}>
          <Thead>
            <Tr>
              <Th w="100px" textAlign={'center'}>
                분류
              </Th>
              <Th textAlign={'center'}>제목</Th>
              <Th textAlign={'center'}>글쓴이</Th>
              <Th textAlign={'center'}>날짜</Th>
              <Th textAlign={'center'}>조회</Th>
              <Th textAlign={'center'}>추천</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((row, index) => (
              <Tr className={style.tr} key={index}>
                <Td textAlign={'center'}>{row.category}</Td>
                <Td>
                  <Link as={NextLink} href={`/board/${row.writing_id}`}>
                    {row.title}
                  </Link>
                </Td>
                <Td textAlign={'center'}>{row.member?.id}</Td>
                <Td textAlign={'center'}>{dateFormat(row.created_at || '')}</Td>
                <Td textAlign={'center'}>{row.view_cnt}</Td>
                <Td textAlign={'center'}>{row.like_cnt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* 페이지네이션 UI */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {/* <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button> */}
          {startPage > 1 && (
            <>
              <button onClick={() => onPageChange(1)}>1</button>
              {startPage > 2 && <span>...</span>}
            </>
          )}
          {visiblePages.map((page) => (
            <Button m={1} key={page} onClick={() => onPageChange(page)} disabled={currentPage === page}>
              {page}
            </Button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span>...</span>}
              <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </>
          )}
          {/* <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
          </button> */}
        </div>
      </TableContainer>
    </>
  );
}

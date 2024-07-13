'use client';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import style from './table.module.css';
import NextLink from 'next/link';

interface Props {
  title: string;
  data: Writing[];
}

export default function BoardTable(props: Props) {
  const { data } = props;

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
            {data.map((row, index) => (
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
      </TableContainer>
    </>
  );
}

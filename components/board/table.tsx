'use client';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import style from './table.module.css';
import Link from 'next/link';

interface Props {
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
      <TableContainer>
        <Table size="sm" variant="simple" className={style.boardTable}>
          <Thead>
            <Tr>
              <Th>분류</Th>
              <Th>제목</Th>
              <Th>글쓴이</Th>
              <Th>날짜</Th>
              <Th>조회</Th>
              <Th>추천</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr className={style.tr} key={index}>
                <Td>{row.category}</Td>
                <Td>
                  <Link
                    href={{
                      pathname: `/board/${row.id}`,
                    }}
                  >
                    {row.title}
                  </Link>
                </Td>
                <Td>{row.member?.id}</Td>
                <Td>{dateFormat(row.created_at || '')}</Td>
                <Td>{row.view_cnt}</Td>
                <Td>{row.like_cnt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <div className={style.buttons}>
        <Link
          href={{
            pathname: `/board/editor`,
          }}
        >
          <Button className={style.button}>글쓰기</Button>
        </Link>
      </div>
    </>
  );
}

'use client';

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import style from './table.module.css';
import Link from 'next/link';

interface Props {
  title: string;
  data: Writing[];
}

export default function LeftMiniTable(props: Props) {
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
        <h2 style={{ paddingLeft: '10px' }}>{props.title}</h2>
        <hr />
        <Table size="sm" variant="simple" className={style.boardTable}>
          <Tbody>
            {data.map((row, index) => (
              <Tr className={style.tr} key={index}>
                <Td>
                  <Link
                    href={{
                      pathname: `/board/${row.id}`,
                    }}
                  >
                    {row.title}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

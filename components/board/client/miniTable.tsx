'use client';

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import style from './table.module.css';
import Link from 'next/link';

interface Props {
  title: string;
  data: Writing[];
}

export default function MiniBoardTable(props: Props) {
  const { data } = props;

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
                순서
              </Th>
              <Th textAlign={'center'}>제목</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((row, index) => (
                <Tr className={style.tr} key={index}>
                  <Td textAlign={'center'}>{index + 1}</Td>
                  <Td>
                    <Link
                      href={{
                        pathname: `/board/${row.writing_id}`,
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

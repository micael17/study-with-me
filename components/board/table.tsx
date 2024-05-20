import { createClient } from '@/utils/supabase/client';
import style from './board.module.css';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { useEffect } from 'react';

interface Props {
  data: Writing[];
  onDataSend: (writing: Writing) => void;
}

export default function BoardTable(props: Props) {
  const { data } = props;

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
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
            <Tr
              className={style.tr}
              onClick={() => {
                props.onDataSend(row);
              }}
              key={index}
            >
              <Td>{row.category}</Td>
              <Td>{row.title}</Td>
              <Td>{row.member?.id}</Td>
              <Td>{row.created_at}</Td>
              <Td>{row.view_cnt}</Td>
              <Td>{row.like_cnt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

import style from './board.module.css';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

interface Props {
  data: Writing[];
  onDataSend: (writing: Writing) => void;
  onChangeBoardState: (state: string) => void;
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

  https: useEffect(() => {
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
                <Td>{dateFormat(row.created_at)}</Td>
                <Td>{row.view_cnt}</Td>
                <Td>{row.like_cnt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <div className={style.buttons}>
        <Button
          className={style.button}
          onClick={() => {
            props.onChangeBoardState('write');
          }}
        >
          글쓰기
        </Button>
      </div>
    </>
  );
}

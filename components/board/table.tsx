import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

export default function BoardTable() {
  return (
    <TableContainer>
      <Table shadow="base" rounded="5px" size="xs" bgColor="#f7f3b7" variant="simple">
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
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To con94rf0r9io56897875r89t89vert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

import React, { useEffect, useState } from 'react';
import BoardList from '../../components/board/BoardList';
import * as boards from '../../apis/boards';
import { useLocation } from 'react-router-dom';

const ListContainer = () => {

  const [boardList, setBoardList] = useState([]);
  const [pagination, setpagination] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  // ?파라미터=값 가져오는 방법
  const location = useLocation()

  const updatePage =() => {
    const query = new URLSearchParams(location.search)
    const newPage = query.get("page") ?? 1
    const newSize = query.get("size ") ?? 10
    setPage(newPage)
    setSize(newSize)
  }

  // 게시글 목록 데이터를 가져오는 함수
  const getList = async () => {
    try {
      const response = await boards.list(page,size);
      const data = response.data;
      setBoardList(data.list);
      setpagination(data.pagination);
      console.dir( data.list);
    } catch (error) {
      console.error('목록 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    getList()
  }, [page,size]);

  useEffect(() => {
    updatePage()
  }, [location.search]);


  return (
    <>
      <BoardList boardList={boardList} pagination={pagination} />
    </>
  );
};

export default ListContainer;

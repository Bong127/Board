import React, { useEffect, useState } from 'react';
import BoardList from '../../components/board/BoardList';
import * as boards from '../../apis/boards';
import { useLocation } from 'react-router-dom';

const ListContainer = () => {

  const [boardList, setBoardList] = useState([]);
  const [pagination, setpagination] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const location = useLocation()

  const updatePage =() => {
    const query = new URLSearchParams(location.search)
    const newPage = query.get("page") ?? 1
    const newSize = query.get("size ") ?? 10
    setPage(newPage)
    setSize(newSize)
  }

  const getList = async () => {
    try {
      const response = await boards.list(page,size);
      const data = response.data;
      setBoardList(data.list);
      setpagination(data.pagination);
    } catch (error) {
      console.error('목록 데이터를 가져오는 중 오류 발생:', error);
    }
  };

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

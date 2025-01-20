import React, { useEffect, useState } from 'react'
import BoardRead from '../../components/board/BoardRead'
import * as boards from '../../apis/boards';
import * as files from '../../apis/files'
import { useParams } from 'react-router-dom';

const ReadContainer = () => {
  const {id} = useParams()

  //state
  const [board, setboard] = useState({})
  const [fileList, setFileList] = useState([])
  const [mainFile, setMainFile] = useState()

  // 게시글 데이터 요청
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data
    setboard(data.board)
    setFileList(data.fileList);

    const no = await data.board.no
    getMainFile(no)
    
  }

  // 다운로드
  const onDownload = async (id, fileName) => {
    // API 요청
    const response = await files.download(id)
    console.log(response);

    // 1. 서버에서 응답 파일 데이터를 받은 Blob 변환
    // 2. 브라우저를 통해 a 태그로 등록
    // 3. a태그의 다운로드 기능으로 요청
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href=url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)    
  }

  // 메인 파일 조회
  const getMainFile = async (no) => {
    const response = await files.fileByType("boards", no, "MAIN")
    const file = await response.data
    setMainFile(file)
  }

  useEffect(() => {
    getBoard()
    getMainFile()
  }, [])
  

  return (
    <>
        <BoardRead board={board} fileList={fileList} mainFile={mainFile} onDownload={onDownload}/>
    </>
  )
}

export default ReadContainer
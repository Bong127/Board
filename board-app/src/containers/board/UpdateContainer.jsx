import React, { useEffect, useState } from 'react'
import BoardUpdateForm from '../../components/board/BoardUpdateForm'
import * as boards from '../../apis/boards';
import * as files from '../../apis/files'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const UpdateContainer = () => {
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

  const navigate = useNavigate()
  
  const onUpdate = async (formData,headers) => {
    try{
      const response = await boards.update(formData, headers)
      const data = await response.data
      console.log(data);
      alert('수정 완료')
      // 게시글 목록으로 이동
      navigate('/boards')
    }catch(error){
      console.log(error);
      
    }
  }

  const onDelete = async (id) => {
    try{
      const response = await boards.remove(id)
      const data = await response.data
      console.log(data);
      alert('삭제 완료')
      // 게시글 목록으로 이동
      navigate('/boards')
    }catch(error){
      console.log(error);
      
    }
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

  // 파일 삭제
  const onFileDelete = async (fileId) => {
    try {
      // 파일 삭제 요청
      const fileResponse = await files.remove(fileId)
      console.log(fileResponse.data);

      // 요청 성공 여부 체크

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
      getMainFile(board.no)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  // 선택 삭제 요청
  const deleteCheckedFiles = async (idList) => {
    const fileIdList = idList.join(",")
    console.log(fileIdList);
    try {
      // 파일 선택 삭제 요청
      const response = await files.removeFiles(fileIdList)
      console.log(response.data);

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)

      getMainFile(board.no)

    } catch (error) {
      console.log(error);
      
    }
  }

  // 메인 파일 조회
    const getMainFile = async (no) => {
      const response = await files.fileByType("boards", no, "MAIN")
      const file = await response.data
      setMainFile(file)
  }

  useEffect(() => {
    getBoard()
  }, [])
  return (
    <>
        <BoardUpdateForm board={board} 
                         onUpdate={onUpdate} 
                         onDelete={onDelete} 
                         fileList={fileList} 
                         onDownload={onDownload} 
                         onFileDelete={onFileDelete}
                         deleteCheckedFiles={deleteCheckedFiles}
                         mFile={mainFile}
        />
    </>
  )
}

export default UpdateContainer
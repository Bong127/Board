import React, { useEffect, useState } from 'react'
import BoardUpdateForm from '../../components/board/BoardUpdateForm'
import * as boards from '../../apis/boards';
import * as files from '../../apis/files'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const UpdateContainer = () => {
  const {id} = useParams()
  const [board, setboard] = useState({})
  const [fileList, setFileList] = useState([])
  const [mainFile, setMainFile] = useState()

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
      alert('수정 완료')
      navigate('/boards')
    }catch(error){
      console.log(error);
      
    }
  }

  const onDelete = async (id) => {
    try{
      const response = await boards.remove(id)
      const data = await response.data
      alert('삭제 완료')
      navigate('/boards')
    }catch(error){
      console.log(error);
      
    }
  }

  const onDownload = async (id, fileName) => {
    const response = await files.download(id)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href=url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)    
  }

  const onFileDelete = async (fileId) => {
    try {
      const fileResponse = await files.remove(fileId)
      console.log(fileResponse.data);
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
      getMainFile(board.no)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteCheckedFiles = async (idList) => {
    const fileIdList = idList.join(",")
    try {
      const response = await files.removeFiles(fileIdList)
      console.log(response.data);
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)

      getMainFile(board.no)

    } catch (error) {
      console.log(error);
      
    }
  }

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
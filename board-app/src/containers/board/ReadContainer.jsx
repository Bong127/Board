import React, { useEffect, useState } from 'react'
import BoardRead from '../../components/board/BoardRead'
import * as boards from '../../apis/boards';
import * as files from '../../apis/files'
import { useParams } from 'react-router-dom';

const ReadContainer = () => {
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
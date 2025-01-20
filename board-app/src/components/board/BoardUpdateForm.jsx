import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import styles from './css/BoardUpdateForm.module.css'
import * as format from '../../utils/format'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
const BoardUpdateForm = (
    {board,onUpdate,onDelete,fileList,onDownload,onFileDelete
        ,deleteCheckedFiles,mFile}) => {

  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')  
  const [fileIdList, setFileIdList] = useState([])
  const [mainFile, setMainFile] = useState(null)
  const [files, setFiles] = useState(null)

  const changeTitle = (e) => { setTitle(e.target.value)}
  const changeWriter = (e) => { setWriter(e.target.value)}
  const changeContent = (e) => { setContent(e.target.value)}
  const {id} = useParams()

  const changeMainFile = (e) => {
    setMainFile(e.target.files[0])
  }

  const changeFile = (e) => {
    setFiles(e.target.files)
  }

  const handleUpdate = () => {
    const formData = new FormData()

    formData.append('id',id)
    formData.append('title',title)
    formData.append('writer',writer)
    formData.append('content',content)

    if(mainFile){
        formData.append('mainFile', mainFile)
    }
    if(files){
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            formData.append('files', file)
        }
    }

    const headers = {
        'Content-Type' : 'multipart/form-data'
    }

    onUpdate(formData,headers)
  }

  const handleDelete = () => {
    const check = window.confirm('정말로 삭제하시겠습니까?')
    if(check)
        onDelete(id)
  }

  const handleFileDelete = (fileId) => {
    const check = window.confirm('파일을 삭제하시겠습니까?')
    if(check){
        console.log('파일삭제');
        onFileDelete(fileId);
    }
  }

  const handleChekedFileDelete = () => {
    const check = window.confirm(`선택한 ${fileIdList.length}파일을 삭제하시겠습니까?`)
    if(check){
        deleteCheckedFiles(fileIdList)
        setFileIdList([])
    }
  }

  const checkFileId = (id) => {
    console.log(`체크한 아이디는 : ${id}`);
    
    let checked = false

    for(let i = 0; i < fileIdList.length; i++){
        const fileId = fileIdList[i];
        if(fileId == id ){
            fileIdList.splice(i, 1)
            checked = true
        }
    }

    if(!checked){
        fileIdList.push(id)
    }
    console.log(fileIdList);
    setFileIdList(fileIdList)
  }

  useEffect(() => {
      if (board) {
        setTitle(board.title);
        setWriter(board.writer);
        setContent(board.content);
      }
  }, [board]);

  return (
    <div className="container">
    <h1 className="title">게시글 수정</h1>
    <div>
            {
                mFile
                ?
                <img src={`/api/files/img/${mFile?.id}`} alt={mFile?.originName} />
                :<></>
            }
        </div>
    <table className={styles.table}>
            <tr>
                <th>제목</th>
                <td>
                    <input type="text" defaultValue={title} onChange={changeTitle} className={`${styles['form-input']}`}/>
                </td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>
                    <input type="text" defaultValue={writer} onChange={changeWriter} className={`${styles['form-input']}`}/>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <textarea cols={40} rows={10} defaultValue={content} onChange={changeContent} className={`${styles['form-input']}`}></textarea>
                </td>
            </tr>
            {
                mFile
                ?
                <></>
                :
                (
                <tr>
                    <td>대표 파일</td>
                    <td>
                        <input type="file" onChange={changeMainFile} />
                    </td>
                </tr>
                )
            }
            <tr>
                <td>첨부 파일</td>
                <td>
                    <input type="file" multiple onChange={changeFile} />
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    {
                        fileList.map((file) => (
                            <div className='flex-box' key={file.id}>
                                <div className="item">
                                    <Checkbox fontSize="large" onClick={() => checkFileId(file.id)}/>
                                    <div className="item-img">
                                        {file.type=='MAIN' && <span className='badge'>대표</span>}
                                        <img src={`/api/files/img/${file.id}`} alt={file.originName} className='file-img'/>
                                    </div>
                                    <span>{file.originName}({format.byteToUnit(file.fileSize)})</span>
                                </div>
                                <div className="item">
                                    <button className='btn' onClick={() => onDownload(file.id, file.originName)}><DownloadIcon fontSize='large'/></button>
                                    <button className='btn' onClick={() => handleFileDelete(file.id)} ><DeleteForeverIcon fontSize='large'/></button>
                                </div>
                            </div>
                        )) 
                    }
                </td>
            </tr>
        </table>
    <div className="btn-box">
        <div>
            <Link to="/boards" className="btn">목록</Link>
            <button className='btn' onClick={handleChekedFileDelete}>선택 삭제</button>
        </div>
        <div>
            <button onClick={handleUpdate} className="btn">수정</button>
            <button onClick={handleDelete} className="btn">삭제</button>
        </div>
    </div>
</div>
  )
}

export default BoardUpdateForm
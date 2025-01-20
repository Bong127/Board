import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styles from './css/BoardInsertForm.module.css'

const BoardInsertForm = ({onInsert}) => {

  const [title, settitle] = useState('')
  const [writer, setwriter] = useState('')
  const [content, setContent] = useState('')
  const [mainFile, setMainFile] = useState(null)
  const [files, setFiles] = useState(null)

  const changeTitle = (e) => { settitle(e.target.value)}
  const changeWriter = (e) => { setwriter(e.target.value)}
  const changeContent = (e) => { setContent(e.target.value)}

  const changeMainFile = (e) => {
    setMainFile(e.target.files[0])
  }

  const changeFile = (e) => {
    setFiles(e.target.files)
  }
  const onSumbit = () => {
    const formData = new FormData()

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

    onInsert(formData,headers)
  }

  return (
    <div className="container">
        <h1 className="title">게시글 쓰기</h1>
        <table className={styles.table}>
            <tr>
                <th>제목</th>
                <td>
                    <input type="text" onChange={changeTitle} className={`${styles['form-input']}`}/>
                </td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>
                    <input type="text" onChange={changeWriter} className={`${styles['form-input']}`}/>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <textarea cols={40} rows={10} onChange={changeContent} className={`${styles['form-input']}`}></textarea>
                </td>
            </tr>
            <tr>
                <td>메인 파일</td>
                <td>
                    <input type="file" onChange={changeMainFile} />
                </td>
            </tr>
            <tr>
                <td>첨부 파일</td>
                <td>
                    <input type="file" multiple onChange={changeFile} />
                </td>
            </tr>
        </table>
        <div className="btn-box">
            <Link to="/boards" className="btn">목록</Link>
            <button className='btn' onClick={onSumbit}>등록</button>
        </div>
    </div>
  )
}

export default BoardInsertForm
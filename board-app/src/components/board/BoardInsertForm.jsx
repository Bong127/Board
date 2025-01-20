import React, { useState } from 'react'
import {Link} from 'react-router-dom'
// import './css/BoardInsertForm.css'
import styles from './css/BoardInsertForm.module.css'

const BoardInsertForm = ({onInsert}) => {


  // state 선언
  const [title, settitle] = useState('')
  const [writer, setwriter] = useState('')
  const [content, setContent] = useState('')
  const [mainFile, setMainFile] = useState(null)
  const [files, setFiles] = useState(null)

  const changeTitle = (e) => { settitle(e.target.value)}
  const changeWriter = (e) => { setwriter(e.target.value)}
  const changeContent = (e) => { setContent(e.target.value)}
  // 메인 파일 변경 이벤트 핸들러 추가
  const changeMainFile = (e) => {
    setMainFile(e.target.files[0])
  }
  // 파일 변경 이벤트 핸들러 추가
  const changeFile = (e) => {
    setFiles(e.target.files)
  }
  const onSumbit = () => {
    // 파일 업로드
    const formData = new FormData()

    // 게시글 정보 세팅
    formData.append('title',title)
    formData.append('writer',writer)
    formData.append('content',content)

    // 파일 데이터 세팅
    if(mainFile){
        formData.append('mainFile', mainFile)
    }
    if(files){
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            formData.append('files', file)
        }
    }

    // 헤더
    const headers = {
        'Content-Type' : 'multipart/form-data'
    }

    //onInsert(title,writer,content)    // appllication/json
    onInsert(formData,headers)          // multipart/form-data
  }

  return (
    <div className="container">
        <h1 className="title">게시글 쓰기</h1>
        <table className={styles.table}>
            <tr>
                <th>제목</th>
                <td>
                    {/* 
                        CSS modules의 클래스 선택자는 카멜 케이스로 쓰는것이 관례
                        * 카멜케이스 : .formInput -> {styles.formInput} 
                        * 케밥케이스 : .form-input -> {styles.form-input}
                    */}
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
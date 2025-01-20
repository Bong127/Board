import React from 'react'
import {Link, useParams} from 'react-router-dom'
import styles from './css/BoardRead.module.css'
import * as format from '../../utils/format'
const BoardRead = ({board,mainFile, fileList, onDownload}) => {
  return (
    <div className="container">
        <h1 className="title">게시글 조회</h1>
        <div>
            {
                mainFile
                ?
                <img src={`/api/files/img/${mainFile?.id}`} alt={mainFile?.originName} />
                :<></>
            }
        </div>
        <table className={styles.table}>
            <tr>
                <th>제목</th>
                <td>
                    <input type="text" defaultValue={board.title ?? ''} className={`${styles['form-input']}`} readOnly/>
                </td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>
                    <input type="text" defaultValue={board.writer ?? ''} className={`${styles['form-input']}`} readOnly/>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <textarea cols={40} rows={10} defaultValue={board.content ?? ''} className={`${styles['form-input']}`} readOnly></textarea>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    {
                        fileList.map((file) => (
                            <div className='flex-box' key={file.id}>
                                <div className="item">
                                    <div className="item-img">
                                        {file.type=='MAIN' && <span className='badge'>대표</span>}
                                        <img src={`/api/files/img/${file.id}`} alt={file.originName} className='file-img'/>
                                    </div>
                                    <span>{file.originName}({format.byteToUnit(file.fileSize)})</span>
                                </div>
                                <div className="item">
                                    <button className='btn' onClick={() => onDownload(file.id, file.originName)}>다운로드</button>
                                </div>
                            </div>
                        )) 
                    }
                </td>
            </tr>
        </table>
        <div className="btn-box">
            <Link to="/boards" className="btn">목록</Link>
            <Link to={`/boards/update/${board.id}`} className="btn">수정</Link>
        </div>
    </div>
  )
}

export default BoardRead
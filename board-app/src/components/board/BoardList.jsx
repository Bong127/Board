import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import * as format from '../../utils/format'
// import './css/BoardList.css'
import styles from './css/BoardList.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const BoardList = ({boardList,pagination}) => {
  const { start, end, prev, next} = pagination;

  const [pageList, setPageList] = useState([])

 

  const createPageList = () => {
    let newPageList = []
    for (let i = start; i <= end; i++) {
        newPageList.push(i)
    }
    setPageList(newPageList)
  }

  useEffect(() => {
    createPageList()
  }, [pagination])
  
  return (
    <div className="container">
        <h1 className='title'>게시글 제목</h1>
        <Link to="/boards/insert" className="btn">글쓰기</Link>

        <table border={1} className={`${styles.table}`}>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>이미지</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>등록일자</th>
                </tr>
            </thead>
            <tbody>
                {/* 화살표 함수 내용이 한 문장이면, {}, return 생략 */}
                    {/* () => */}
                    {/* () => () */}
                {/* { } 안에서 함수 내용 작성 - return 선택 */}
                {/* () => {return ?} */}
                {
                    boardList.length == 0
                    ?
                        <tr>
                            <td colSpan={5}>조회된 데이터가 없습니다.</td>
                        </tr>
                    :
                    boardList.map((board) => {
                        return (
                        <tr key={board.no}>
                            <td align='center'>{board.no}</td>
                            <td>
                                {
                                    board.file == null
                                    ?
                                    <img src={'/api/files/img/null'} className='file-img' />
                                    :
                                    <img src={`/api/files/img/${board.file.id}`} className='file-img' alt={board.file.originName} />
                                }
                            </td>
                            <td align='left'>
                                <Link to={`/boards/${board.id}`}>
                                    {board.title}
                                </Link>
                            </td>
                            <td align='center'>{board.writer}</td>
                            <td align='center'>{format.formatDate(board.createdAt)}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {/* 페이지네이션 - a */}
        {/* <div className='pagination'>
            {prev > 0 && 
                <a href={`/boards?page=${start}`} className='btn-page'>
                    처음
                </a>
            }
            {prev > 0 && 
                <a className='btn-page' href={`/boards?page=${prev}`}>
                    &laquo; 이전
                </a>
            }
            {
                pageList.map(page => (
                    <a className={page==pagination.page ? 'btn-page active' : 'btn-page'} 
                    href={`/boards?page=${page}`}>{page}</a>
                ))
            }
            {next <= end && 
                <a className='btn-page' href={`/boards?page=${next}`}>
                    다음 &raquo;
                </a>
            }
            {next <= end && 
                <a className='btn-page' href={`/boards?page=${end}`}>
                    마지막
                </a>
            }
        </div> */}
        {/* 페이지네이션 - Link */}
        {
            (pagination != null && pagination.total > 0)
            &&
            (
                <div className='pagination'>
                    <Link to={`/boards?page=${start}`} className='btn-page'>
                        <KeyboardDoubleArrowLeftIcon/>
                    </Link>
                    {(pagination.page <= pagination.first)
                        ||
                        <Link className='btn-page' to={`/boards?page=${prev}`}>
                            <KeyboardArrowLeftIcon/>
                        </Link>
                    }
                    {
                        pageList.map(page => (
                            <Link className={page==pagination.page ? 'btn-page active' : 'btn-page'} 
                            to={`/boards?page=${page}`}>{page}</Link>
                        ))
                    }
                    {(pagination.page >= pagination.last)
                        ||
                        <Link className='btn-page' to={`/boards?page=${next}`}>
                            <KeyboardArrowRightIcon/>
                        </Link>
                    }
                    <Link className='btn-page' to={`/boards?page=${end}`}>
                        <KeyboardDoubleArrowRightIcon/>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default BoardList
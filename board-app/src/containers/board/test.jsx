import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reset.css";
import "./admin.css";

const AdminPage = ({ pageInfo, search }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  const selectNotice = (id) => {
    window.location.href = `/admin/notice/select?id=${id}`;
  };

  return (
    <div className="container-fluid" style={{ height: "98vh" }}>
      <br />
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
          <Link to="/" style={{ marginRight: "30px" }}>
            <img src="/image?id=C:/upload/vora_purple_black.png" alt="Logo" style={{ width: "105px", height: "40px" }} />
          </Link>
          <h1>
            <Link to="/admin">
              ADMINISTRATOR : <span className="adminTitle"></span>
            </Link>
          </h1>
        </div>
        <div>
          <hr className="ms-0" style={{ width: "700px" }} />
        </div>
      </div>
      <div className="row" style={{ height: "90%" }}>
        <div className="col-md-8" style={{ textAlign: "center", padding: "20px" }}>
          <h1>공지 관리</h1>
          <br />
          <div className="container mt-5">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">제목</th>
                  <th scope="col">생성일자</th>
                  <th scope="col">수정일자</th>
                  <th scope="col">비고</th>
                </tr>
              </thead>
              <tbody>
                {pageInfo.list.map((notice) => (
                  <tr key={notice.id} style={{ lineHeight: "40px" }}>
                    <td>{notice.title}</td>
                    <td>{formatDate(notice.regDate)}</td>
                    <td>{formatDate(notice.updDate)}</td>
                    <td>
                      <button className="btn btn-primary" type="button" onClick={() => selectNotice(notice.id)}>
                        조회
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="container mt-4">
              <form action="/admin/notice/list" className="d-flex" method="get">
                <input
                  className="form-control me-3"
                  style={{ width: "90%" }}
                  name="search"
                  type="search"
                  defaultValue={search}
                  placeholder="검색어를 입력하세요"
                  aria-label="Search"
                />
                <input className="btn btn-outline-success" type="submit" value="검색" />
              </form>
            </div>
            {pageInfo.pages > 0 && (
              <div className="pagination flex justify-content-center">
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    {pageInfo.pageNum > 1 && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/notice/list?page=1&search=${search}&size=${pageInfo.pageSize}`}
                        >
                          &laquo;
                        </Link>
                      </li>
                    )}
                    {pageInfo.hasPreviousPage && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/notice/list?page=${pageInfo.prePage}&search=${search}&size=${pageInfo.pageSize}`}
                        >
                          &lt;
                        </Link>
                      </li>
                    )}
                    {pageInfo.navigateFirstPage &&
                      pageInfo.navigateLastPage &&
                      [...Array(pageInfo.navigateLastPage - pageInfo.navigateFirstPage + 1)].map((_, i) => {
                        const page = pageInfo.navigateFirstPage + i;
                        return (
                          <li key={page} className={`page-item ${pageInfo.pageNum === page ? "active" : ""}`}>
                            <Link
                              className="page-link"
                              to={`/admin/notice/list?page=${page}&search=${search}&size=${pageInfo.pageSize}`}
                            >
                              {page}
                            </Link>
                          </li>
                        );
                      })}
                    {pageInfo.hasNextPage && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/notice/list?page=${pageInfo.nextPage}&search=${search}&size=${pageInfo.pageSize}`}
                        >
                          &gt;
                        </Link>
                      </li>
                    )}
                    {pageInfo.pageNum < pageInfo.pages && (
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to={`/admin/notice/list?page=${pageInfo.pages}&search=${search}&size=${pageInfo.pageSize}`}
                        >
                          &raquo;
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-2">
          <div style={{ marginTop: "100px", fontSize: "26px" }}>
            <ul className="mt-5">
              <li>
                <Link to="/admin/notice/insert">공지 생성</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default AdminPage;

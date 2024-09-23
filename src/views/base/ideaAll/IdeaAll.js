import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IdeaAll = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 2; // Số lượng ý tưởng mỗi trang

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/ideas/all?page=${currentPage}&size=${itemsPerPage}`);
        const data = await response.json();
        if (data.code === 200) {
          setIdeas(data.result.content);
          setTotalPages(data.result.page.totalPages);
        }
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Danh sách ý tưởng đã đăng</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo Title"
          aria-label="Tìm kiếm"
        />
        <button className="btn btn-outline-secondary" type="button">
          Tìm kiếm
        </button>
      </div>
      <div className="row">
        {ideas.map((idea) => (
          <div className="col-md-12 mb-4" key={idea.id}>
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src='https://res.cloudinary.com/dtzcwfxqb/image/upload/v1726947715/ngrcp4gm0oorrapswsls.jpg'
                    alt={idea.title}
                    className="img-fluid rounded-start"
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{idea.title}</h5>
                    <p className="card-text">{idea.description}</p>
                    <p className="card-text"><small className="text-muted">Created at: {idea.createAt}</small></p>
                    <p className="card-text"><strong>Số lượng feedback: {idea.countFeedback}</strong></p>
                    <p className="card-text"><strong>Giải thưởng: {idea.awardForOneFeedback}</strong></p>
                    <p className="card-text"><strong>Chủ sở hữu: {idea.accountUsername}</strong></p>
                    <p className="card-text"><small className="text-muted">Trạng thái: {idea.status}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Phân trang */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
              <button className="page-link" onClick={() => setCurrentPage(index)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default IdeaAll;

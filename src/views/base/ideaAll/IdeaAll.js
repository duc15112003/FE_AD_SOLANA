import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IdeaAll = () => {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 4;

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

  const handleEditClick = (idea) => {
    setSelectedIdea(idea);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ideas/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedIdea),
      });
      const data = await response.json();
      if (data.code === 200) {
        setIdeas(ideas.map(i => (i.id === data.result.id ? data.result : i)));
        setShowModal(false);
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating idea:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Danh sách ý tưởng đã đăng</h2>
      <div className="row">
        {ideas.map((idea) => (
          <div className="col-md-6 mb-4" key={idea.id}>
            <div 
              className="card h-100 border-0 shadow-lg hover-shadow" 
              onClick={() => handleEditClick(idea)}
              style={{ transition: 'transform 0.2s' }}
            >
              <div className="row g-0 h-100">
                <div className="col-md-4">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="img-fluid rounded-start"
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold fs-5">{idea.title}</h5>
                    <p className="card-text text-secondary">{idea.description}</p>
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

      {/* Modal Form Chi Tiết */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Chỉnh sửa ý tưởng</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {selectedIdea && (
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedIdea.title}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, title: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Chủ sở hữu</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedIdea.accountUsername}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, accountUsername: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={selectedIdea.description}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, description: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Số lượng feedback</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedIdea.countFeedback}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, countFeedback: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Giải thưởng</label>
                        <input
                          type="number"
                          className="form-control"
                          value={selectedIdea.awardForOneFeedback}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, awardForOneFeedback: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Created At</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedIdea.createAt}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Trạng thái</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedIdea.status}
                          onChange={(e) => setSelectedIdea({ ...selectedIdea, status: e.target.value })}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaAll;

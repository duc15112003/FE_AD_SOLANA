import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const AppHeaderDropdown = () => {
  const us = localStorage.getItem("us")
  return (
    <div className="dropdown">
     <button
      className="btn btn-secondary dropdown-toggle d-flex align-items-center p-2"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ fontSize: '12px', height: '40px' }}  // Điều chỉnh chiều cao và cỡ chữ
    >
      <img src="/path-to-your-avatar.jpg" alt="avatar" className="rounded-circle me-2" width="20" height="20" /> {/* Điều chỉnh kích thước ảnh */}
      <p className="mb-0" style={{ fontSize: '12px' }}>{us}</p>  {/* Điều chỉnh cỡ chữ */}
    </button>

     
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        <li>
          <h6 className="dropdown-header bg-body-secondary fw-semibold mb-2">Tài Khoản</h6>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-bell me-2"></i>
            Cập Nhật
            <span className="badge bg-info ms-2">42</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-envelope-open me-2"></i>
            Messages
            <span className="badge bg-success ms-2">42</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-check2-square me-2"></i>
            Tasks
            <span className="badge bg-danger ms-2">42</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-chat me-2"></i>
            Comments
            <span className="badge bg-warning ms-2">42</span>
          </a>
        </li>
        <li>
          <h6 className="dropdown-header bg-body-secondary fw-semibold my-2">Settings</h6>
        </li>
        <li>
          <a className="dropdown-item" href="admin/profile">
            <i className="bi bi-person me-2"></i>
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-gear me-2"></i>
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-credit-card me-2"></i>
            Payments
            <span className="badge bg-secondary ms-2">42</span>
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-file-earmark me-2"></i>
            Projects
            <span className="badge bg-primary ms-2">42</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="#">
            <i className="bi bi-lock me-2"></i>
            Lock Account
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AppHeaderDropdown;

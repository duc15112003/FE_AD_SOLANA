import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffProfile = () => {
  const [admin, setAdmin] = useState({
    firstname: 'John',
    lastname: 'Doe',
    birthday: '1990-01-01',
    address: '123 Main St, City, Country',
    phonenumber: '+123456789',
    position: 'Admin',  // Thêm vị trí
    salary: '5000',     // Thêm lương
    avatar: 'https://via.placeholder.com/250', // Placeholder cho avatar lớn hơn
  });

  // Hàm thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin({ ...admin, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý thay đổi thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="row">
          {/* Phần ảnh đại diện */}
          <div className="col-md-4 d-flex justify-content-center align-items-center position-relative">
            <div className="position-relative" style={{ width: '250px', height: '250px' }}>
              <img
                src={admin.avatar}
                alt="Admin Avatar"
                className="rounded-circle img-fluid"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              {/* Nút upload hình bán cầu nằm ở góc dưới bên phải */}
              <div
                className="position-absolute bottom-0 end-0 translate-middle"
                style={{
                  transform: 'translate(50%, 50%)',
                }}
              >
                <label className="btn btn-primary btn-sm rounded-pill">
                  <i className="bi bi-upload"></i>
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Phần thông tin cá nhân với input */}
          <div className="col-md-8">
            <h2 className="mb-4">Thông tin cá nhân</h2>
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    value={admin.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    value={admin.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    className="form-control"
                    value={admin.birthday}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phonenumber"
                    className="form-control"
                    value={admin.phonenumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={admin.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Position</label>
                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    value={admin.position}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={admin.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;

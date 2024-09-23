import React, { useEffect, useState, createRef } from 'react';
import axios from 'axios';
const Staff = () => {
  const [staff, setStaff] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/all');
      setStaff(response.data.result.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          Danh sách nhân viên
          <a href="https://coreui.io/docs/utilities/colors/" className="ms-2">
            DocsLink
          </a>
          <a className='button' href='/admin/addStaff'>Add</a>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo First name"
                aria-describedby="button-addon2"
              />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                Search
              </button>
            </div>
            <table className="table" style={{ borderCollapse: 'unset' }}>
              <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Phone number</th>
                <th scope="col">Birthday</th>
                <th scope="col">Email</th>
                <th scope="col">Positon</th>
                <th scope="col">Salary</th>
                <th scope="col">Control</th>
              </tr>
              </thead>
              <tbody>
              {staff.map((member, index) => (
                <tr key={index}>
                  <th scope="row">{member.id}</th>
                  <td>{member.firstname}</td>
                  <td>{member.lastname}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.birthday}</td>
                  <td>{member.email}</td>
                  <td>{member.position}</td>
                  <td>{member.salary}</td>
                  <td>
                    <button className="btn btn-primary me-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-warning">
                      <i className="bi bi-x-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddStaffForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    avatar: '',
    birthday: '',
    address: '',
    email: '',
    position: '',
    salary: '',
    phoneNumber: '',
    publicKey: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const uploadImage = async () => {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:8080/api/upload/image', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Image upload failed');
        throw error;
      }
    };

    try {
      const uploadedImageUrl = await uploadImage();
      setImageUrl(uploadedImageUrl);

      const staffData = {
        ...formData,
        avatar: uploadedImageUrl,
        createAt: new Date().toISOString(),
        updateAt: null,
        deleteAt: null,
      };

      await axios.post('http://localhost:8080/api/staff', staffData);
      alert('Staff added successfully!');
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">Thêm Nhân Viên Mới</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {[
              { label: 'ID', name: 'id', type: 'text' },
              { label: 'First Name', name: 'firstname', type: 'text' },
              { label: 'Last Name', name: 'lastname', type: 'text' },
              { label: 'Birthday', name: 'birthday', type: 'date' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Position', name: 'position', type: 'text' },
              { label: 'Salary', name: 'salary', type: 'text' },
              { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
              { label: 'Public Key', name: 'publicKey', type: 'text' },
            ].map((field, index) => (
              <div className="form-group" key={index}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
            <div className="form-group">
              <label>Avatar</label>
              <input type="file" onChange={handleFileChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Thêm Nhân Viên</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaffForm;

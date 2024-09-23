import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddIdeaForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    image: '',
    createAt: '',
    updateAt: null,
    endAt: null,
    countFeedback: '',
    awardForOneFeedback: '',
    accountUsername: '',
    reward_wallet: ''
  })

  const [selectedFile, setSelectedFile] = useState(null) // State for file selection
  const [imageUrl, setImageUrl] = useState('') // State to store image URL preview

  // Set current date for createAt field (without time)
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Get only YYYY-MM-DD
    setFormData(prevData => ({
      ...prevData,
      createAt: today
    }));

    const username = localStorage.getItem('us')
    if (username) {
      setFormData(prevData => ({
        ...prevData,
        accountUsername: username
      }))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle file selection for image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file) // Update selected file state
      const imagePreviewUrl = URL.createObjectURL(file) // Generate a local preview URL
      setImageUrl(imagePreviewUrl) // Display image preview
    }
  }

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile) {
      return null
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post('http://localhost:8080/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error)
      alert('Tải lên ảnh thất bại')
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Lấy ngày hôm nay và thêm thời gian mặc định
    const today = new Date().toISOString().split('T')[0]; // Chỉ lấy phần ngày
    const createAtWithTime = `${today}T00:00:00`; // Thêm thời gian mặc định
  
    const updatedFormData = {
      ...formData,
      createAt: createAtWithTime // Đặt ngày với thời gian mặc định
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/ideas/create', updatedFormData);
      console.log('Ý tưởng đã được thêm thành công', response);
  
      // Reset form sau khi thành công
      setFormData({
        title: '',
        description: '',
        status: '',
        image: '',
        createAt: '',
        updateAt: '',
        endAt: '',
        countFeedback: '',
        awardForOneFeedback: '',
        accountUsername: localStorage.getItem('us'),
        reward_wallet: ''
      });
      setImageUrl(''); // Reset URL của ảnh sau khi thành công
    } catch (error) {
      console.error('Có lỗi xảy ra khi thêm ý tưởng!', error);
    }
  };
  

  return (
    <div className="container my-5 p-5 bg-light rounded shadow-lg" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4 text-primary">Thêm Ý Tưởng Mới</h2>
      <form onSubmit={handleSubmit} className="row g-4">

        {/* Tiêu đề */}
        <div className="col-md-6">
          <label className="form-label">Tiêu đề</label>
          <input
            type="text"
            className="form-control border-primary shadow-sm"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề ý tưởng"
            required
          />
        </div>

        {/* Mô tả */}
        <div className="col-md-6">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control border-primary shadow-sm"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả ý tưởng của bạn"
            required
            rows="3"
          />
        </div>

        {/* Trạng thái */}
        <div className="col-md-6">
          <label className="form-label">Trạng thái</label>
          <select
            className="form-select border-primary shadow-sm"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Chọn trạng thái</option>
            <option value="START">BẮT ĐẦU</option>
            <option value="END">KẾT THÚC</option>
            <option value="DELETE">XOÁ</option>
            <option value="INPROGRESS">ĐANG TIẾN HÀNH</option>
          </select>
        </div>

        {/* Tải ảnh lên */}
        <div className="col-md-6">
          <label className="form-label">Ảnh</label>
          <input
            type="file"
            className="form-control border-primary shadow-sm"
            onChange={handleFileChange}
          />
          {imageUrl && (
            <img src={imageUrl} alt="Ảnh đã chọn" className="img-fluid mt-2 shadow" style={{ maxHeight: '200px' }} />
          )}
        </div>

        {/* Ngày tạo */}
        <div className="col-md-6">
          <label className="form-label">Ngày tạo</label>
          <input
            type="text"
            className="form-control border-primary shadow-sm"
            name="createAt"
            value={formData.createAt}
            readOnly
          />
        </div>

        {/* Số phản hồi */}
        <div className="col-md-6">
          <label className="form-label">Số phản hồi</label>
          <input
            type="number"
            className="form-control border-primary shadow-sm"
            name="countFeedback"
            value={formData.countFeedback}
            onChange={handleChange}
            placeholder="Nhập số phản hồi"
            required
          />
        </div>

        {/* Giải thưởng cho một phản hồi */}
        <div className="col-md-6">
          <label className="form-label">Giải thưởng cho một phản hồi</label>
          <input
            type="number"
            className="form-control border-primary shadow-sm"
            name="awardForOneFeedback"
            value={formData.awardForOneFeedback}
            onChange={handleChange}
            placeholder="Nhập số tiền thưởng cho mỗi phản hồi"
            required
          />
        </div>

        {/* Ví thưởng */}
        <div className="col-md-6">
          <label className="form-label">Ví thưởng</label>
          <input
            type="text"
            className="form-control border-primary shadow-sm"
            name="reward_wallet"
            value={formData.reward_wallet}
            onChange={handleChange}
            placeholder="Nhập địa chỉ ví thưởng"
          />
        </div>

        {/* Nút submit */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary btn-lg px-5 shadow">Gửi Ý Tưởng</button>
        </div>
      </form>
    </div>
  )
}

export default AddIdeaForm

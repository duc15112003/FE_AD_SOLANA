import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow } from '@coreui/react'
import { DocsLink } from 'src/components'
import axios from 'axios'

const Typography = () => {
  const [customers, setCustomers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 3 // Adjust page size as needed

  const fetchCustomers = async (page = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/customer/all?page=${page}&size=${pageSize}`,
      )
      console.log('API Response:', response.data) // Log the full response to see what is returned
      console.log('Page:', page, 'Page Size:', pageSize) // Log current page and page size

      // Extracting the content and totalPages from the API response
      const content = response.data.result?.content || []
      const totalPages = response.data.result?.totalPages || 1

      setCustomers(content)
      setTotalPages(totalPages)

      console.log('Content Length:', content.length) // Log the number of items received
      console.log('Total Pages:', totalPages) // Log total pages
    } catch (err) {
      console.error('Error fetching customers:', err)
    }
  }

  useEffect(() => {
    fetchCustomers(currentPage)
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Thông tin chi tiết
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader>
        <CCardBody>{/* Details form here */}</CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Danh sách khách hàng
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader>
        <CCardBody>
          <CRow>
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
            <table className={'table'} style={{ borderCollapse: 'unset' }}>
              <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Phone number</th>
                <th scope="col">Birthday</th>
                <th scope="col">Public key</th>
                <th scope="col">Control</th>
              </tr>
              </thead>
              <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <th scope="row">{customer.id}</th>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.birthday}</td>
                  <td>{customer.publicKey}</td>
                  <td>
                    <button className={'btn btn-primary me-2'}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className={'btn btn-warning'}>
                      <i className="bi bi-x-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography

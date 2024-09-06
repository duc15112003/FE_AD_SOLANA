import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsExample, DocsLink } from 'src/components'

import ReactImg from 'src/assets/images/react.jpg'

const Cards = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Danh sách ý tưởng đã thanh toán
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader>
        <CCardBody>
          <CRow>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo Title"
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
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Created at</th>
                  <th scope="col">End at</th>
                  <th scope="col">Number of feedback</th>
                  <th scope="col">Award for a feedback</th>
                  <th scope="col">Owner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>hehe</td>
                  <td>hehe</td>
                  <td>hehe</td>
                  <td>hehe</td>
                </tr>
              </tbody>
            </table>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Cards

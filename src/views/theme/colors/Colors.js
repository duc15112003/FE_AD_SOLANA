import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import adminService from '../../../service/admin'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()
  const [listAdmin, setListAdmin] = useState([])

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  setListAdmin(adminService.getAllAdmins)



  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Thông tin chi tiết
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader>
        <CCardBody>
          <CRow>
            <div className={'col-3 mb-3 d-flex justify-content-center'}>
              <div
                style={{
                  border: 'solid 1px gray',
                  height: '198px',
                  width: '198px',
                  borderRadius: '99px',
                }}
              ></div>
              <input type="file" className={'d-none'} />
            </div>
            <div className={'col-9 mb-3'}>
              <input type="text" placeholder={'Id'} className={'form-control mb-3'} />
              <input type="text" placeholder={'First name'} className={'form-control mb-3'} />
              <input type="text" placeholder={'Last name'} className={'form-control mb-3'} />
              <input type="text" placeholder={'Phone number'} className={'form-control'} />
            </div>
            <div className={'col-6 mb-3'}>
              <input type="date" placeholder={'Birthday'} className={'form-control'} />
            </div>
            <div className={'col-6 mb-3'}>
              <input type="text" placeholder={'Public key'} className={'form-control'} />
            </div>
            <div className={'col-12 mb-3'}>
              <textarea
                placeholder={'Address'}
                className={'form-control'}
                name=""
                id=""
                cols="30"
                rows="6"
              ></textarea>
            </div>
            <div className={'col-12 mb-3'}>
              <button className={'btn btn-success me-2 text-light'}>Add</button>
              <button className={'btn btn-info me-2 text-light'}>Update</button>
              <button className={'btn btn-warning me-2'}>Delete</button>
              <button className={'btn btn-light'}>Reset</button>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          Danh sách nhân viên
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
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>hehe</td>
                  <td>hehe</td>
                  <td>
                    <button className={'btn btn-primary me-2'}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className={'btn btn-warning'}>
                      <i className="bi bi-x-square"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors

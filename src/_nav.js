import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilWallet,
  cilAddressBook,
  cilGroup,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: 'dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Nhân viên',
    to: '/admin/employee',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Khách hàng',
    to: '/admin/customer',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Ý tưởng',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ý tưởng đã đăng',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Ý tưởng đã làm',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Ý tưởng đã thanh toán',
        to: '/base/cards',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Ví ứng dụng',
    to: '/theme/typography',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/admin/chart',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav

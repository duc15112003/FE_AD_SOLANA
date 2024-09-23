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
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Ý tưởng',
    to: '/admin',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Toàn bộ ý tưởng',
        to: '/admin/ideaAll',
      },
      {
        component: CNavItem,
        name: 'Ý tưởng đã đóng',
        to: '/admin/ideaDone',
      },
      {
        component: CNavItem,
        name: 'Thêm ý tưởng',
        to: '/admin/form',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Ví ứng dụng',
    to: '/theme/typography',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
]

const role = localStorage.getItem('role');

if (role && role.split(',').includes('ROLE_ADMIN_USER')) {
  _nav.splice(1, 0, {
    component: CNavItem,
    name: 'Khách hàng',
    to: '/admin/customer',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  });
}

if (role && role.split(',').includes('ROLE_ADMIN_STAFF')) {
  _nav.splice(1, 0, { // Thêm "Nhân viên" vào vị trí thứ 1
    component: CNavItem,
    name: 'Nhân viên',
    to: '/admin/employee',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  });
}

if (role && role.split(',').includes('ROLE_ADMIN_STATISTIC')) {
  _nav.push({
    component: CNavItem,
    name: 'Thống kê',
    to: '/admin/chart',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  });
}

if (role && role.split(',').includes('ROLE_ADMIN')) {
  _nav.splice(1, 0, {
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
  }
);


  _nav.push({
    component: CNavItem,
    name: 'Thống kê',
    to: '/admin/chart',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  });
}


export default _nav

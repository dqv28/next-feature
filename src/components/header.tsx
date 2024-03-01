'use client'

import React, { useState } from 'react'
import { HomeOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Link from 'next/link'

const items: MenuProps['items'] = [
  {
    label: <Link href="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link href="/users">User Manage</Link>,
    key: 'user',
    icon: <UserOutlined />,
  },
  {
    label: <Link href="/blogs">Blog Manage</Link>,
    key: 'blog',
    icon: <UnorderedListOutlined />,
  },
]

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default Header

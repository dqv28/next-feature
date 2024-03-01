'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import type { IUser } from '@/types/backend'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import CreateModalForm from './createModalForm'
import UpdateModal from './updateModalForm'
import { handleDeleteUser } from '@/actions'
import { revalidateTag } from 'next/cache'

interface IProps {
  users: IUser[] | []
  meta: {
    current: number
    pageSize: number
    total: number
  }
}

const UsersTable: React.FC<IProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>()

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const { users, meta } = props

  useEffect(() => {
    if (users) setIsLoading(false)
  }, [users])

  const setDataUpdate = (user: IUser) => {
    setUser(user)
    setIsUpdateModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    await handleDeleteUser(id).then(() => {
      message.success('Delete user successful!')
    })
  }

  const columns: TableProps<IUser>['columns'] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => setDataUpdate(record)} />

          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const onChange = (pagination: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams)
      params.set('page', pagination.current)
      replace(`${pathName}?${params.toString()}`)
      setIsLoading(true)
    }
  }

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>User Table</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Add new
        </Button>
      </div>
    )
  }

  return (
    <>
      <Table
        title={renderHeader}
        rowKey="id"
        columns={columns}
        dataSource={users}
        onChange={onChange}
        loading={isLoading}
        pagination={{
          ...meta,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} on {total} items
              </div>
            )
          },
        }}
      />

      <CreateModalForm openCreateModalForm={isModalOpen} setOpenCreateModalForm={setIsModalOpen} />

      <UpdateModal
        openUpdateModal={isUpdateModalOpen}
        setOpenUpdateModal={setIsUpdateModalOpen}
        user={user}
      />
    </>
  )
}

export default UsersTable

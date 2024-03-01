'use client'

import { handleUpdateUser } from '@/actions'
import type { IUser } from '@/types/backend'
import { Form, Input, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'

interface UpdateModalProps {
  openUpdateModal?: boolean

  setOpenUpdateModal?: (o: boolean) => void

  user?: IUser
}

const UpdateModal: React.FC<UpdateModalProps> = ({ openUpdateModal, setOpenUpdateModal, user }) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user)
    }
  }, [user, form])

  const handleClose = () => {
    form.resetFields()
    setIsConfirm(false)
    setOpenUpdateModal?.(false)
  }

  const handleUpdate = async (formData: IUser) => {
    setIsConfirm(true)
    if (user) {
      await handleUpdateUser({
        ...formData,
        id: user.id,
      }).then(() => {
        handleClose()
        message.success('Update user successful!')
      })
    }
  }

  return (
    <Modal
      title="Update new user"
      open={openUpdateModal}
      onOk={() => form.submit()}
      onCancel={() => handleClose()}
      confirmLoading={isConfirm}
    >
      <Form name="basic" layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateModal

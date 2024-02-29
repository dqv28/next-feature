'use client'

import { handleCreateUser } from "@/actions"
import type { IUser } from "@/types/backend"
import { Form, Input, Modal, message } from "antd"
import React, { useState } from "react"

interface CreateModalFormProps {
	openCreateModalForm?: boolean,
	setOpenCreateModalForm?: (o: boolean) => void
}

const CreateModalForm: React.FC<CreateModalFormProps> = ({ openCreateModalForm, setOpenCreateModalForm }) => {
	const [isConfirm, setIsConfirm] = useState<boolean>(false)
	const [form] = Form.useForm()

	const handleClose = () => {
		form.resetFields()
		setIsConfirm(false)
		setOpenCreateModalForm?.(false)
	}
	
	const handleCreate = async (formData: IUser) => {
		setIsConfirm(true)
		const res = await handleCreateUser(formData)

		if (res) {
			handleClose()
			message.success('Add user successful!')
		}
	}

	return (
		<Modal
			title='Add new user'
			open={openCreateModalForm}
			onOk={() => form.submit()}
			onCancel={() => handleClose()}
			confirmLoading={isConfirm}
		>
			<Form
				name="basic"
				layout="vertical"
				form={form}
				onFinish={handleCreate}
			>
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

export default CreateModalForm
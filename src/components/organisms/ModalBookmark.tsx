import { Form, Input, InputNumber, Modal } from "antd"
import { useState } from "react"

export const ModalBookmark: React.FC<{
    onCancel?(): void
    onOk?<T>(value: T): void
    value?: number
}> = ({ onOk, onCancel, value = 0 }) => {

    const [form] = Form.useForm()
    const [open, setOpen] = useState(true)
    const _onCancel = () => {
        setOpen(false)
        onCancel?.()
    }
    const _onOk = () => {
        setOpen(false)
        onOk?.(form.getFieldsValue())
    }

    return (
        <Modal destroyOnClose onCancel={_onCancel} onOk={_onOk} visible={open} title="Số trang bạn muốn đánh dấu" >
            <Form form={form} initialValues={{ bookmark: value }}>
                <Form.Item label="Số trang" name="bookmark" >
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
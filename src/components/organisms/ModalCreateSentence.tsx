import { AutoComplete, Form, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useCallback, useEffect } from 'react'

const ModalCreateSentence: React.FC<{
    visible: boolean,
    onCancel: () => void
    onCreate: (voca: Sentence) => void
}> = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.resetFields()
    }, [visible])


    const onFinish = useCallback((values: any) => {

    }, [])

    return (
        <Modal
            title="Thêm câu mới"
            okText="Thêm câu mới"
            visible={visible}
            onCancel={onCancel}
        >
            <Form
                onFinish={onFinish}
                labelCol={{ span: 6 }}
            >
                <Form.Item label="Câu văn" name="text" required>
                    <Input onPaste={(e) => { e.preventDefault() }} />
                </Form.Item>
                <Form.Item label="Chủ đề" name="subject" required>
                    <AutoComplete />
                </Form.Item>
                <Form.Item label="Hình ảnh (nếu có)" name="image">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalCreateSentence
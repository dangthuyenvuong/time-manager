import { DatePicker, Form, Input, Modal, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DATE_FORMAT } from 'config'
import { useQuery } from 'core'
import moment from 'moment'
import { useEffect } from 'react'
import { bookService } from 'services/book.service'
import _ from 'utils/_'



const BOOK_TYPE = {
    'self-help': 'Phát triển bản thân',
    'business': 'Kinh doanh',
    'product': 'Sản phẩm',
    'manager': 'Quản trị'
}

const ModalCreateBook: React.FC<{
    visible: boolean
    onCancel: () => void
    onCreate: () => void
    request?: boolean
}> = ({ visible, onCancel, onCreate, request = false }) => {


    const { data: categories } = useQuery(() => bookService.getCategories())

    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields()
    }, [visible])


    const onFinish = async (values: any) => {
        try {
            let { name, type, cover, createdAt } = values

            const data = {
                name, type, cover, createdAt, request
            }

            await bookService.themBook(data)
            onCreate()
            onCancel()
        } catch (err) {
        }

    }



    return (
        <Modal
            visible={visible}
            title={`Thêm Sách${request ? ' vào danh sách chờ mua': ''}`}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText="Thêm Sách"
            maskClosable={false}
        >
            <Form
                labelCol={{ span: 6 }}
                onFinish={onFinish}
                onFieldsChange={(changeField) => {

                }}
                form={form}

                initialValues={{
                    createdAt: moment(),
                }}
            >
                <Form.Item label="Tên sách" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Hình đại diện" name="cover" rules={[{ required: true }]}>
                    <TextArea />
                </Form.Item>

                <Form.Item label="Loại" name="type" rules={[{ required: true }]}>
                    <Select>
                        {
                            _.object.map(categories, (item, i) => <Select.Option value={item.id}>{item.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Ngày tạo" name="createdAt" rules={[{ required: true }]}>
                    <DatePicker format={DATE_FORMAT} />
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default ModalCreateBook
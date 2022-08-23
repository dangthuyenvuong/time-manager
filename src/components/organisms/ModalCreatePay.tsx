import { AutoComplete, DatePicker, Form, InputNumber, Modal, Select } from 'antd'
import { DATE_FORMAT } from 'config'
import { BILL_TYPE } from 'config/financial'
import moment from 'moment'
import { useEffect } from 'react'
import { financialService } from 'services/financial.service'
import _ from 'utils/_'


const _autoComplete: any = {
    'Đóng tiền phòng tháng ': {
        type: _.object.key(BILL_TYPE, 'life')
    },
    'Mua cơm': {
        type: _.object.key(BILL_TYPE, 'life')
    },
    'Đóng tiền phòng gym tháng ': {
        type: _.object.key(BILL_TYPE, 'personal')
    },
    'Siêu thị' : {
        type: _.object.key(BILL_TYPE, 'life')
    }
}

const ModalCreatePay: React.FC<{
    visible: boolean
    onCancel: () => void
    onCreate: () => void
}> = ({ visible, onCancel, onCreate }) => {

    const [form] = Form.useForm()

    useEffect(() => {
        form.resetFields()
    }, [visible])


    const onFinish = async (values: any) => {
        try {
            let { money, type, title, createdAt } = values

            const data = {
                money, type, title, createdAt
            }

            await financialService.addBill(data)
            onCreate()
            onCancel()
        } catch (err) {
        }

    }



    return (
        <Modal
            visible={visible}
            title="Thêm Bill"
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText="Tạo Bill"
            maskClosable={false}
        >
            <Form
                labelCol={{ span: 6 }}
                onFinish={onFinish}
                onFieldsChange={(changeField) => {
                    const field = {
                        name: changeField?.[0].name.toString(),
                        value: changeField?.[0].value
                    }

                    if (field.name === 'title' && typeof _autoComplete[field.value] !== 'undefined') {
                        form.setFieldsValue(_autoComplete[field.value])
                    }
                }}
                form={form}

                initialValues={{
                    createdAt: moment(),
                }}
            >
                <Form.Item label="Số tiền" name="money" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} addonAfter={<span className="capitalize">Đồng</span>} />
                </Form.Item>
                <Form.Item label="Chi tiết" name="title" rules={[{ required: true }]}>
                    <AutoComplete
                        options={[
                            { value: 'Đóng tiền phòng tháng ' },
                            { value: 'Mua cơm' },
                            { value: 'Siêu thị' },
                            { value: 'Đóng tiền phòng gym tháng ' },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Loại" name="type">
                    <Select>
                        {
                            _.object.map(BILL_TYPE, (item, i) => <Select.Option value={i}>{item}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Ngày" name="createdAt" rules={[{ required: true }]}>
                    <DatePicker format={DATE_FORMAT} />
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default ModalCreatePay
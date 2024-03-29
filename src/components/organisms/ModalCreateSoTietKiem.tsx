import { DatePicker, Divider, Form, InputNumber, Modal, Select } from 'antd'
import { useAsync } from 'core/hooks/useAsync'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { financialService } from 'services/financial.service'
import { currency, formatNumber } from 'utils/number'

const ModalCreateSoTietKiem: React.FC<{
    visible: boolean
    onCancel: () => void
    onCreate: () => void,
    soTietKiem?: any
}> = ({ visible, onCancel, onCreate, soTietKiem }) => {

    const { execute: themSoTietKiem, status } = useAsync(financialService.themSoTietKiem)
    const { execute: editSoTietKiem, status: editSoTietKiemStatus } = useAsync(financialService.editSoTietKiem)
    const [form] = Form.useForm()
    const [calculator, setCalculator] = useState({
        dateDue: moment(),
        investmentMoney: 0,
        interestMoeny: 0,
        sum: 0
    })

    useEffect(() => {
        form.resetFields()
    }, [visible])

    useEffect(() => {
        if (soTietKiem) {
            form.setFieldsValue({
                ...soTietKiem,
                interestRate: (soTietKiem.interestRate * 100).toFixed(2)
            })
            forcecast()
        }
    }, [soTietKiem])


    const forcecast = () => {
        let { depositMonth, interestRate, investmentMoney, startDate } = form.getFieldsValue()

        if (depositMonth && interestRate && investmentMoney) {
            interestRate = interestRate / 100
            setCalculator({
                dateDue: startDate.clone().add({ month: depositMonth }),
                investmentMoney: Math.round(investmentMoney),
                interestMoeny: Math.round(investmentMoney * (interestRate / 12 * depositMonth)),
                sum: Math.round(investmentMoney + investmentMoney * (interestRate / 12 * depositMonth)),
            })
        }

    }




    const onFinish = async (values: any) => {
        try {
            let { depositMonth, interestRate, investmentMoney, startDate } = values
            interestRate = interestRate / 100
            const data = {
                investmentMoney: Math.round(investmentMoney),
                startDate,
                interestRate,
                depositMonth
            }
            
            if (soTietKiem) {
                await editSoTietKiem(soTietKiem.id, data)
            } else {
                await themSoTietKiem(data)
            }

            onCreate()
            onCancel()
        } catch (err) {
        }

    }



    return (
        <Modal
            visible={visible}
            title={soTietKiem ? "Chỉnh sửa sổ tiết kiệm" : "Thêm sổ tiết kiệm"}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okButtonProps={{
                loading: status === 'pending' || editSoTietKiemStatus === 'pending'
            }}
            maskClosable={false}
            okText="Tạo sổ tiết kiệm"
        >
            <Form
                labelCol={{ span: 6 }}
                onFinish={onFinish}
                form={form}
                onFieldsChange={forcecast}
                initialValues={{
                    startDate: moment(),
                    depositMonth: 13
                }}
            >
                <Form.Item label="Số tiền tiết kiệm" name="investmentMoney" rules={[{ required: true }]}>
                    <InputNumber
                        style={{ width: '100%' }}
                        addonAfter={<span className="capitalize">Đồng</span>}
                        formatter={value => formatNumber(value as number)}
                        // parser={value => value!.replace(',', '')}
                    />
                </Form.Item>
                <Form.Item label="Kỳ hạn (tháng)" name="depositMonth">
                    <Select>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                        <Select.Option value={5}>5</Select.Option>
                        <Select.Option value={6}>6</Select.Option>
                        <Select.Option value={7}>7</Select.Option>
                        <Select.Option value={8}>8</Select.Option>
                        <Select.Option value={9}>9</Select.Option>
                        <Select.Option value={10}>10</Select.Option>
                        <Select.Option value={11}>11</Select.Option>
                        <Select.Option value={12}>12</Select.Option>
                        <Select.Option value={13}>13</Select.Option>
                        <Select.Option value={15}>15</Select.Option>
                        <Select.Option value={18}>18</Select.Option>
                        <Select.Option value={24}>24</Select.Option>
                        <Select.Option value={36}>36</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Lãi xuất" name="interestRate" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} addonAfter="%" />
                </Form.Item>
                <Form.Item label="Ngày gửi" name="startDate" rules={[{ required: true }]}>
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Divider />
                <div style={{ background: 'rgb(226, 234, 247)', padding: '10px 20px' }}>
                    <p className="flex justify-between"><span>Ngày đáo hạn:</span> <span>{calculator.dateDue.format('DD/MM/YYYY')}</span></p>
                    <p className="flex justify-between"><span>Số tiền lãi:</span> <span>{currency(calculator.interestMoeny)} đồng</span></p>
                    <p className="flex justify-between mb-0"><span>Số tiền khi đến hạn:</span> <span>{currency(calculator.sum)} đồng</span></p>
                </div>
            </Form>
        </Modal>
    )
}


export default ModalCreateSoTietKiem
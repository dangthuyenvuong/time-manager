import { Button, DatePicker, Divider, Form, Input, InputNumber, Modal, Select, Table } from "antd"
import MainLayout from "components/MainLayout"
import { useLocalStorage, useQuery } from "core"
import moment from "moment"
import { useCallback, useMemo, useState } from "react"
import { financialService } from "services/financial.service"
import styled from "styled-components"
import { currency } from "utils/number"

const TableRoot = styled.div`
  tr{
    &.disabled{
      background: #e2eaf7;
    }
    .xem-lai-xuat{
      cursor: pointer;
    }
  }
`

const UNIT: any = {
    1_000_000: 'triệu',
    1_000: 'nghìn',
    1: 'vnđ'
}

const FinancialTemplate: React.FC = () => {
    const [rowSelect, setRowSelect] = useState<any>()
    const [countYear, setCountYear] = useState(5)
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [unit, setUnit] = useLocalStorage('financial_unit', 1_000_000)
    const [rate, setRate] = useLocalStorage('financial_rate', 0.0745)
    const [money, setMoney] = useLocalStorage('financial_money', 16)
    const [year, setYear] = useLocalStorage('financial_year', 1)
    const [dateLoan, setDateLoan] = useLocalStorage('financial_date', 25)
    const [monthLoan, setMonthLoan] = useLocalStorage('finanlcial_month', 13)
    const { data, isFetching } = useQuery(() => financialService.getSoTietKiem(), [])

    const dataFinancial = [
        {
            id: -1,
            date: '01-25-2021',
            money: 100_000_000,
            dateFinish: '02-25-2022',
            tienNamTruoc: 0,
            daTaiDauTu: false
        },
        {
            id: 0,
            date: '01-25-2022',
            money: 100_000_000,
            dateFinish: '02-25-2023',
            tienNamTruoc: 0
        },
        {
            id: 1,
            date: '07-12-2022',
            money: 16_000_000,
            dateFinish: '08-12-2023',
            tienNamTruoc: 0
        },
        {
            id: 2,
            date: '07-30-2022',
            money: 16_000_000,
            dateFinish: '08-30-2023',
            tienNamTruoc: 0
        },
        {
            id: 3,
            date: '08-04-2022',
            money: 10_000_000,
            dateFinish: '09-04-2023',
            tienNamTruoc: 0

        },
    ]

    const calLoan = useCallback((money: number) => {
        return money * (rate / 12 * monthLoan)
    }, [rate, monthLoan])


    let sum = 0;
    const _dataFinancial = useMemo(() => {

        let date: any
        let _data = dataFinancial.map(e => {
            const loan = calLoan(e.money)

            sum += e.money + loan
            date = moment(e.date)
            const dateFinish = moment(e.dateFinish)
            return { ...e, sum, loan, date, dateFinish }
        })

        let _year = date.year() + year
        if (date.month() < 11) {
            _year -= 1
        }

        date = date.clone().set({ date: dateLoan })
        if (date.date() > dateLoan) {
            date.add({ month: 1 })
        }
        while (date.year() <= _year) {
            const dateFinish = date.clone().add({ month: monthLoan })
            let _money = money * unit

            // let preLoan: any = _.array.findReverse(_data, (item: any) => {
            //   let dateFinish = item.dateFinish
            //   if (item.daThu) return false
            //   return dateFinish <= date
            // })


            let preMoney = _data.reduce((sum, item: any) => {

                if (item.dateFinish <= date && !item.daThu) {
                    item.daThu = true
                    return sum + item.money + item.loan
                }
                return sum
            }, 0)


            let tienNamTruoc = 0
            if (preMoney) {

                // const preMoney = preLoan.money + preLoan.loan
                sum -= preMoney
                tienNamTruoc = preMoney
                _money += preMoney
            }

            const loan = calLoan(_money)

            sum += _money + loan



            _data.push({
                date,
                id: _data.length,
                loan,
                money: _money,
                sum,
                dateFinish,
                tienNamTruoc
            })
            date = date.clone().add({ month: 1 })
            // date = moment(date)

        }
        return _data
    }, [rate, money, year, unit, dateLoan, monthLoan])

    const now = useMemo(() => moment(), [])
    const rowSelectLoan = useMemo(() => {
        const data: any[] = []
        if (rowSelect) {
            let sum = 0
            for (let i = 1; i <= countYear; i++) {
                let lai = 0
                let goc = 0
                let date = null
                if (i === 1) {
                    lai = calLoan(rowSelect.money)
                    goc = rowSelect.money
                    date = rowSelect.date.clone().add({ year: 1, month: 1 })
                } else {
                    goc = sum
                    lai = calLoan(sum)
                    date = data[data.length - 1].date.clone().add({ year: 1, month: 1 })
                }
                sum = goc + lai

                data.push({
                    date,
                    money: sum,
                    lai,
                    goc
                })
            }
        }
        return data
    }, [rowSelect, countYear, rate])


    const _unitText = useMemo(() => UNIT[unit], [unit])

    const _onEnter = useCallback((callback: any) => (e: any) => {
        if (e.key === 'Enter') {
            callback(e.currentTarget.value)
        }
    }, [])



    return (
        <MainLayout
            title="Quản lý tài chính"
            afterTitle={<Button type='primary' danger key={3} size="large" onClick={() => setIsOpenAdd(true)}>Thêm sổ tiết kiệm</Button>}
        >
            <TableRoot>
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center ">
                        Ngân hàng SCB, Lãi xuất: <span><Input style={{ width: 80 }} defaultValue={(rate * 100).toFixed(2)}
                            onKeyUp={_onEnter((e: any) => {
                                const _v = parseFloat(e)
                                if (_v) setRate(_v / 100)
                            })}
                        />%</span> / <span>
                            <Input style={{ width: 80 }} maxLength={2} defaultValue={monthLoan}
                                onKeyUp={_onEnter((e: any) => {
                                    const _v = parseInt(e)
                                    if (_v) setMonthLoan(_v)
                                })}
                            />tháng
                        </span>,
                        Số tiền tiết kiệm mõi tháng:
                        <span>
                            <Input style={{ width: 120 }} defaultValue={money}
                                onKeyUp={_onEnter((e: any) => {
                                    const _v = parseFloat(e)
                                    if (_v) setMoney(_v)
                                })}
                            />
                        </span> {_unitText},
                        Số năm cho dự đoán:
                        <span>
                            <Input maxLength={2} style={{ width: 40, textAlign: 'center' }} defaultValue={year}
                                onKeyUp={_onEnter((e: any) => {
                                    const _v = parseInt(e)
                                    if (_v) setYear(_v)
                                })}
                            />
                        </span>
                        Ngày gửi tiết kiệm hàng tháng:
                        <span>
                            <Input maxLength={2} style={{ width: 40, textAlign: 'center' }} defaultValue={dateLoan}
                                onKeyUp={_onEnter((e: any) => {
                                    const _v = parseInt(e)
                                    if (_v) setDateLoan(_v)
                                })}
                            />
                        </span>
                    </div>


                    <div className="flex gap-2 items-center justify-space">
                        Dự đoán: <div style={{ width: 20, height: 20, background: '#e2eaf7' }}></div>
                        Đơn vị:
                        <Select style={{ width: 120 }} value={unit} onChange={e => setUnit(e)}>
                            <Select.Option value={1_000_000}>Triệu đồng</Select.Option>
                            <Select.Option value={1_000}>Nghìn đồng</Select.Option>
                            <Select.Option value={1}>Đồng</Select.Option>
                        </Select>
                    </div>
                </div>
                <Table
                    rowSelection={{}}
                    rowKey="id"
                    columns={[
                        {
                            title: 'Ngày',
                            render: (item) => item.date.format('DD/MM/YYYY')
                        },
                        {
                            title: 'Số tiền tiết kiệm + tái đầu tư',
                            render: (item) => <div>
                                {
                                    item.tienNamTruoc ? <div>
                                        {currency((item.money - item.tienNamTruoc) / unit)} + {currency(item.tienNamTruoc / unit)} = {currency(item.money / unit)} {_unitText}
                                    </div> : <div>{currency(item.money / unit)} {_unitText}</div>
                                }

                            </div>
                        },
                        {
                            title: 'Ngày đáo hạn',
                            render: (item) => item.dateFinish.format('DD/MM/YYYY')
                        },
                        {
                            title: 'Gốc + lãi',
                            render: (item) => <div>
                                {currency(item.money / unit)} + {currency(item.loan / unit)} = {currency((item.money + item.loan) / unit)} {_unitText}
                            </div>
                        },
                        {
                            title: 'Tổng số tiền tiết kiệm',
                            render: (item) => <div>{currency(item.sum / unit)} {_unitText}</div>
                        },
                        {
                            title: '',
                            render: (item) => <div className="xem-lai-xuat" onClick={() => setRowSelect(item)}>
                                Xem lãi xuất kép
                            </div>
                        }
                    ]}
                    dataSource={_dataFinancial}
                    rowClassName={(item) => item.date > now ? 'disabled' : ''}
                />

                <Modal
                    width={768}
                    visible={!!rowSelect}
                    onCancel={() => {
                        setRowSelect(null)
                        setCountYear(5)
                    }}
                    title={rowSelect && <div>Lãi xuất kép: Gốc <span className="text-primary-900">{currency(rowSelect.money / unit)} {_unitText}</span>
                        <span className="ml-1 mr-1">
                            <Select value={countYear} onChange={v => setCountYear(v)}>
                                <Select.Option value={5}>5 lần gửi</Select.Option>
                                <Select.Option value={10}>10 lần gửi</Select.Option>
                                <Select.Option value={15}>15 lần gửi</Select.Option>
                                <Select.Option value={20}>20 lần gửi</Select.Option>
                                <Select.Option value={25}>25 lần gửi</Select.Option>
                                <Select.Option value={30}>30 lần gửi</Select.Option>
                            </Select>
                        </span>
                        --{">"} Tổng: <span className="text-primary-900">{currency(rowSelectLoan[rowSelectLoan.length - 1].money / unit)} {_unitText}</span>
                    </div>}
                    footer={null}
                >
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: 'Năm',
                                render: (_, __, num) => <div>Năm {num + 1}</div>
                            },
                            {
                                title: 'Ngày đáo hạn',
                                render: (item) => item.date.format('DD/MM/YYYY')
                            },
                            {
                                title: 'Gốc + Lãi',
                                render: (item) => <div> {currency(item.goc / unit)} + {currency(item.lai / unit)} = {currency(item.money / unit)} {_unitText}</div>
                            },
                        ]}
                        dataSource={rowSelectLoan}
                    />
                </Modal>
                <Modal
                    visible={isOpenAdd}
                    title="Thêm sổ tiết kiệm"
                    onCancel={() => setIsOpenAdd(false)}
                >
                    <Form
                        labelCol={{ span: 6 }}
                    >
                        <Form.Item label="Số tiền tiết kiệm">
                            <InputNumber style={{ width: '100%' }} addonAfter={<span className="capitalize">{_unitText}</span>} />
                        </Form.Item>
                        <Form.Item label="Kỳ hạn (tháng)">
                            <Select defaultValue={13} >
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
                        <Form.Item label="Lãi xuất">
                            <InputNumber style={{ width: '100%' }} addonAfter="%" />
                        </Form.Item>
                        <Form.Item label="Ngày gửi">
                            <DatePicker format="DD/MM/YYYY" defaultValue={moment()} />
                        </Form.Item>
                        <Divider />
                        <p className="flex justify-between"><span>Ngày đáo hạn:</span> <span>25/02/2025</span></p>
                        <p className="flex justify-between"><span>Số tiền lãi:</span> <span>1,726,576</span></p>
                        <p className="flex justify-between"><span>Số tiền khi đến hạn:</span> <span>51,726,575</span></p>

                    </Form>
                </Modal>
            </TableRoot>
        </MainLayout>
    )
}


export default FinancialTemplate
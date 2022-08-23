import { Button, Modal, Select, Table } from 'antd'
import { TableRoot } from 'assets/styles/Table'
import { Link, Popconfirm, ThreeDotAction } from 'atoms'
import MainLayout from 'components/MainLayout'
import ModalCreatePay from 'components/organisms/ModalCreatePay'
import { DATE_FORMAT } from 'config'
import { SO_TIET_KIEM_PATH } from 'config/path'
import { useLocalStorage, useQuery } from 'core'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { financialService } from 'services/financial.service'
import { formatNumber } from 'utils/number'
import _ from 'utils/_'


export default function Bill() {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [billType, setBillType] = useLocalStorage('financial_bill_type', 'none')
    const [dataDetail, setDataDetail] = useState<any>({})
    const { data: bills, isFetching, reFetch }: any = useQuery(() => financialService.getBill(), [])
    const data = useMemo(() => {
        if (bills) {
            if (billType === 'none') {
                return bills.map((e: any) => ({ ...e, createdAt: moment(e.createdAt) }))
            }
            let res: any = {}
            let keyFormat = 'DD/MM/YYYY'
            let title = 'Những Bill trong ngày'
            if (billType === 'thang') {
                keyFormat = 'MM/YYYY'
                title = 'Những Bill trong tháng'
            } else if (billType === 'nam') {
                keyFormat = 'YYYY'
                title = 'Những Bill trong năm'
            }

            bills.forEach((e: any) => {
                const createdAt = moment(e.createdAt)
                const _k = createdAt.format(keyFormat)
                if (!res[_k]) {
                    res[_k] = {
                        date: createdAt,
                        money: 0,
                        id: _k,
                        title,
                        keyFormat,
                        list: []
                    }
                }
                res[_k].money += e.money
                res[_k].list.push({ ...e, createdAt })
            })

            return _.object.map(res, (e: any) => e)

        }
        return []
    }, [bills, billType])


    const columns = useMemo(() => {
        if (billType === 'none') {
            return [
                {
                    title: 'Chi tiết',
                    dataIndex: 'title'
                },
                {
                    title: 'Ngày',
                    render: (item: any) => <div>{item.createdAt.format(DATE_FORMAT)}</div>
                },
                {
                    title: 'Tiền',
                    render: (item: any) => <div>{formatNumber(item.money)}<sup>đ</sup></div>
                },
                {
                    width: 15,
                    render: (item: any) => <ThreeDotAction menu={[
                        {
                            label: <Popconfirm title="Bạn có chắc chắn muốn xóa bill này" onConfirm={async () => {
                                await financialService.deleteBill(item.id)
                                reFetch()
                            }}>
                                <span className="text-red-500">Xóa</span>
                            </Popconfirm>,
                        }
                    ]} />
                }
            ]
        } else {
            const DIC: any = {
                'ngay': { title: 'Ngày', format: 'DD/MM/YYYY' },
                'thang': { title: 'Tháng', format: 'MM/YYYY' },
                'nam': { title: 'Năm', format: 'YYYY' },
            }
            return [
                {
                    title: DIC[billType].title,
                    render: (item: any) => <div>{item.date.format(DIC[billType].format)}</div>
                },
                {
                    title: 'Tổng tiền',
                    render: (item: any) => <div>{formatNumber(item.money)}<sup>đ</sup></div>
                },
                {
                    width: 15,
                    render: (item: any) => <ThreeDotAction menu={[
                        {
                            label: <span onClick={() => {
                                setDataDetail(item)
                                setIsOpenDetail(true)
                            }}>Xem chi tiết</span>,
                        }
                    ]} />
                }
            ]
        }

    }, [billType, data])





    return (
        <MainLayout
            title="Quản lý tài chính"
            afterTitle={<Button type='ghost' size="large"><Link to={SO_TIET_KIEM_PATH}>Sổ tiết kiệm</Link></Button>}
        >
            <TableRoot>
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center ">
                        Thống kê theo: <Select style={{ width: 130 }} value={billType} onChange={(e) => setBillType(e)}>
                            <Select.Option value="none">Bill</Select.Option>
                            <Select.Option value={'ngay'}>Ngày</Select.Option>
                            <Select.Option value={'thang'}>Tháng</Select.Option>
                            <Select.Option value={'nam'}>Năm</Select.Option>
                        </Select>
                    </div>

                    <div className="flex gap-2 items-center justify-space">
                        <Button type='primary' danger key={3} size="large" onClick={() => setIsOpenAdd(true)}>Thêm Bill</Button>
                    </div>
                </div>
                <Table
                    rowKey={"id"}
                    onRow={(item) => ({
                        style: { cursor: billType !== 'none' ? 'pointer' : 'auto' },
                        onClick: () => {
                            if (billType !== 'none') {
                                setDataDetail(item)
                                setIsOpenDetail(true)
                            }
                        }
                    })}
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                />
            </TableRoot>
            <ModalCreatePay
                visible={isOpenAdd}
                onCancel={() => setIsOpenAdd(false)}
                onCreate={reFetch}
            />
            <Modal footer={null} title={`${dataDetail.title} ${dataDetail?.id}`} visible={isOpenDetail} onCancel={() => setIsOpenDetail(false)}>
                <Table
                    pagination={false}
                    dataSource={dataDetail?.list || []}
                    columns={[
                        {
                            title: 'Chi tiết',
                            dataIndex: 'title'
                        },
                        {
                            title: 'Ngày',
                            render: (item: any) => <div>{item.createdAt.format(DATE_FORMAT)}</div>
                        },
                        {
                            title: 'Tiền',
                            render: (item: any) => <div>{formatNumber(item.money)}<sup>đ</sup></div>
                        },
                    ]}

                />
            </Modal>
        </MainLayout>
    )
}

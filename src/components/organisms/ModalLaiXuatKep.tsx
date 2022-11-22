import { Modal, Select, Table } from "antd"
import { useMemo, useState } from "react"
import { currency } from "utils/number"

export const ModalLaiXuatKep: React.FC<{
    investment: any
    forecastYear: number

}> = () => {
    return <></>
    // const [forecaseYear, setForecastYear] = useState()

    // const rowSelectLoan = useMemo(() => {

    //     const data: any[] = []
    //     if (rowSelect) {
    //         let sum = 0
    //         for (let i = 1; i <= forecastYear; i++) {
    //             let lai = 0
    //             let goc = 0
    //             let date = null
    //             if (i === 1) {
    //                 lai = calLoan(rowSelect.investMoney)
    //                 goc = rowSelect.investMoney
    //                 date = rowSelect.date.clone().add({ year: 1, month: 1 })
    //             } else {
    //                 goc = sum
    //                 lai = calLoan(sum)
    //                 date = data[data.length - 1].date.clone().add({ year: 1, month: 1 })
    //             }
    //             sum = goc + lai

    //             data.push({
    //                 date,
    //                 money: sum,
    //                 lai,
    //                 goc
    //             })
    //         }
    //     }
    //     return data
    // }, [rowSelect, forecastYear, rate])


    // return (
    //     <Modal
    //         width={768}
    //         visible={!!rowSelect}
    //         onCancel={() => {
    //             setRowSelect(null)
    //             setforecastYear(5)
    //         }}
    //         title={rowSelect && <div>Lãi xuất kép: Gốc <span className="text-primary-900">{currency(rowSelect.investMoney / unit)} {_unitText}</span>
    //             <span className="ml-1 mr-1">
    //                 <Select value={forecastYear} onChange={v => setforecastYear(v)}>
    //                     <Select.Option value={5}>5 lần gửi</Select.Option>
    //                     <Select.Option value={10}>10 lần gửi</Select.Option>
    //                     <Select.Option value={15}>15 lần gửi</Select.Option>
    //                     <Select.Option value={20}>20 lần gửi</Select.Option>
    //                     <Select.Option value={25}>25 lần gửi</Select.Option>
    //                     <Select.Option value={30}>30 lần gửi</Select.Option>
    //                 </Select>
    //             </span>
    //             --{">"} Tổng: <span className="text-primary-900">{currency(rowSelectLoan[rowSelectLoan.length - 1].money / unit)} {_unitText}</span>
    //         </div>}
    //         footer={null}
    //     >
    //         <Table
    //             pagination={false}
    //             columns={[
    //                 {
    //                     title: 'Năm',
    //                     render: (_, __, num) => <div>Năm {num + 1}</div>
    //                 },
    //                 {
    //                     title: 'Ngày đáo hạn',
    //                     render: (item) => item.startDate.format('DD/MM/YYYY')
    //                 },
    //                 {
    //                     title: 'Gốc + Lãi',
    //                     render: (item) => <div> {currency(item.goc / unit)} + {currency(item.lai / unit)} = {currency(item.investmentMoney / unit)} {_unitText}</div>
    //                 },
    //             ]}
    //             dataSource={rowSelectLoan}
    //         />
    //     </Modal>
    // )
}
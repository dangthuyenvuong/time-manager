import { Dropdown, Input, Menu, Modal, Select, Table } from "antd"
import moment from "moment"
import { useMemo, useState } from "react"
import { useLocalStorage } from "src/core"
import { formatNumber } from "src/utils/number"
import styled from "styled-components"

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

export default function Financial() {
  const [rowSelect, setRowSelect] = useState<any>()
  const [countYear, setCountYear] = useState(5)
  const [unit, setUnit] = useLocalStorage('financial_unit', 1_000_000)
  const [rate, setRate] = useLocalStorage('financial_rate', 0.0745)
  // const rate = 0.0745

  const dataFinancial = [
    {
      id: 1,
      date: moment('01-25-2022'),
      money: 100_000_000
    },
    {
      id: 2,

      date: moment('07-12-2022'),
      money: 16_000_000
    },
    {
      id: 3,

      date: moment('07-30-2022'),
      money: 16_000_000
    },
    {
      id: 4,

      date: moment('08-04-2022'),
      money: 10_000_000
    },
    {
      id: 5,

      date: moment('08-25-2022'),
      money: 16_000_000
    },
    {
      id: 6,

      date: moment('09-25-2022'),
      money: 16_000_000
    },
    {
      id: 7,

      date: moment('10-25-2022'),
      money: 16_000_000
    },
    {
      id: 8,

      date: moment('11-25-2022'),
      money: 16_000_000
    },
    {
      id: 9,

      date: moment('12-25-2022'),
      money: 16_000_000
    },
  ]

  const _dataFinancial = useMemo(() => {
    let sum = 0;
    return dataFinancial.map(e => {
      const loan = e.money * rate
      sum += e.money + loan
      return { ...e, sum, loan }
    })
  }, [rate])

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
          lai = rowSelect.money * rate
          goc = rowSelect.money
          date = rowSelect.date.clone().add({ year: 1, month: 1 })
        } else {
          goc = sum
          lai = sum * rate
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
  return (
    <TableRoot>
      <div className="mb-2 flex gap-2 items-center">
        Đơn vị:
        <Select style={{ width: 120 }} value={unit} onChange={e => setUnit(e)}>
          <Select.Option value={1_000_000}>Triệu đồng</Select.Option>
          <Select.Option value={1_000}>Nghìn đồng</Select.Option>
          <Select.Option value={1}>Đồng</Select.Option>
        </Select>
        Lãi xuất: <span><Input defaultValue={rate}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              const _v = parseFloat(e.currentTarget.value)
              if (_v) setRate(_v)
            }
          }}
        /></span>
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
            title: 'Số tiền tiết kiệm',
            render: (item) => <div>{formatNumber(item.money / unit)} {_unitText}</div>
          },
          {
            title: 'Ngày đáo hạn',
            render: (item) => item.date.clone().add({ year: 1, month: 1 }).format('DD/MM/YYYY')
          },
          {
            title: 'Gốc + lãi',
            render: (item) => <div>
              {formatNumber(item.money / unit)} + {formatNumber(item.money * rate / unit)} = {formatNumber(item.money * (1 + rate) / unit)} {_unitText}
            </div>
          },
          {
            title: 'Tổng số tiền tiết kiệm',
            render: (item) => <div>{formatNumber(item.sum / unit)} {_unitText}</div>
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
        title={rowSelect && <div>Lãi xuất kép: Gốc <span className="text-primary-900">{formatNumber(rowSelect.money / unit)} {_unitText}</span>
          <span className="ml-1 mr-1">
            <Select value={countYear} onChange={v => setCountYear(v)}>
              <Select.Option value={5}>5 năm</Select.Option>
              <Select.Option value={10}>10 năm</Select.Option>
              <Select.Option value={15}>15 năm</Select.Option>
              <Select.Option value={20}>20 năm</Select.Option>
              <Select.Option value={25}>25 năm</Select.Option>
              <Select.Option value={30}>30 năm</Select.Option>
            </Select>
          </span>
          --{">"} Tổng: <span className="text-primary-900">{formatNumber(rowSelectLoan[rowSelectLoan.length - 1].money / unit)} {_unitText}</span>
        </div>}
        footer={null}
      >
        <Table
          pagination={{
            pageSize: 1000,
          }}
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
              render: (item) => <div> {formatNumber(item.goc / unit)} + {formatNumber(item.lai / unit)} = {formatNumber(item.money / unit)} {_unitText}</div>
            },
          ]}
          dataSource={rowSelectLoan}
        />
      </Modal>
    </TableRoot>
  )
}

import { Dropdown, Menu, Modal, Select, Table } from "antd"
import moment from "moment"
import { useMemo, useState } from "react"
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


export default function Financial() {
  const [rowSelect, setRowSelect] = useState<any>()
  const [countYear, setCountYear] = useState(5)
  const rate = 0.0735
  const round = 1_000_000

  const dataFinancial = [
    {
      date: moment('01-25-2022'),
      money: 100_000_000
    },
    {
      date: moment('07-12-2022'),
      money: 16_000_000
    },
    {
      date: moment('07-30-2022'),
      money: 16_000_000
    },
    {
      date: moment('08-04-2022'),
      money: 10_000_000
    },
    {
      date: moment('08-25-2022'),
      money: 16_000_000
    },
    {
      date: moment('09-25-2022'),
      money: 16_000_000
    },
    {
      date: moment('10-25-2022'),
      money: 16_000_000
    },
    {
      date: moment('11-25-2022'),
      money: 16_000_000
    },
    {
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
  }, [])

  const now = useMemo(() => moment(), [])
  const rowSelectLone = useMemo(() => {
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
  }, [rowSelect, countYear])
  return (
    <TableRoot>
      <Table
        rowSelection={{
          // onSelect(item) {
          //   setRowSelect(item)
          // },
        }}
        columns={[
          {
            title: 'Ngày',
            render: (item) => item.date.format('DD/MM/YYYY')
          },
          {
            title: 'Số tiền tiết kiệm',
            render: (item) => <div>{formatNumber(item.money / round)} triệu</div>
          },
          {
            title: 'Ngày đáo hạn',
            render: (item) => item.date.clone().add({ year: 1, month: 1 }).format('DD/MM/YYYY')
          },
          {
            title: 'Gốc + lãi',
            render: (item) => <div>
              {formatNumber(item.money / round)} + {formatNumber(item.money * rate / round)} = {formatNumber(item.money * (1 + rate) / round)} triệu
            </div>
          },
          {
            title: 'Tổng số tiền tiết kiệm',
            render: (item) => <div>{formatNumber(item.sum / round)} triệu</div>
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
        onCancel={() => setRowSelect(null)}
        title={<div>Lãi xuất kép
          <span className="ml-1">
            <Select value={countYear} onChange={v => setCountYear(v)}>
              <Select.Option value={5}>5 năm</Select.Option>
              <Select.Option value={10}>10 năm</Select.Option>
              <Select.Option value={15}>15 năm</Select.Option>
              <Select.Option value={20}>20 năm</Select.Option>
              <Select.Option value={25}>25 năm</Select.Option>
              <Select.Option value={30}>30 năm</Select.Option>
            </Select>
          </span>
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
              render: (item) => <div> {formatNumber(item.goc / round)} + {formatNumber(item.lai / round)} = {formatNumber(item.money / round)} triệu</div>
            },
          ]}
          dataSource={rowSelectLone}
        />
      </Modal>
    </TableRoot>
  )
}

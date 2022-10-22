import { Button, Input, Modal, Select, Table } from "antd"
import { TableRoot } from "assets/styles/Table"
import MainLayout from "components/MainLayout"
import ModalCreateSoTietKiem from "components/organisms/ModalCreateSoTietKiem"
import { useLocalStorage, useQuery } from "core"
import moment from "moment"
import { useCallback, useMemo, useState } from "react"
import { Link, ThreeDotAction, Popconfirm } from "atoms"
import { financialService } from "services/financial.service"
import { onEnter } from "utils/event"
import { currency } from "utils/number"
import { BILL_PATH } from "config/path"
import { useSetting } from "hooks/useSetting"



const UNIT: any = {
  1_000_000: 'triệu',
  1_000: 'nghìn',
  1: 'đ'
}

export default function Financial() {
  const [rowSelect, setRowSelect] = useState<any>()
  const [countYear, setCountYear] = useState(5)
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const [unit, setUnit] = useSetting('financial_unit', 1_000_000)
  const [rate, setRate] = useSetting('financial_rate', 0.0745)
  const [money, setMoney] = useSetting('financial_money', 16)
  const [year, setYear] = useSetting('financial_year', 1)
  const [dateLoan, setDateLoan] = useSetting('financial_date', 25)
  const [monthLoan, setMonthLoan] = useSetting('finanlcial_month', 13)
  const [tietKiemDetail, setTietKiemDetail] = useState<any>()
  const { data: dataFinancial, isFetching, reFetch }: any = useQuery(() => financialService.getSoTietKiem(), [])
  const now = useMemo(() => moment(), [])

  const calLoan = useCallback((money: number) => {
    return money * (rate / 12 * monthLoan)
  }, [rate, monthLoan])

  let sum = 0;
  const _dataFinancial = useMemo(() => {
    if (!dataFinancial) return []

    let date: any = moment()
    let _data = dataFinancial.map((e: any) => {
      const interestMoney = calLoan(e.investmentMoney)

      sum += e.investmentMoney + interestMoney
      date = moment(e.startDate)
      const dateDue = moment(e.dateDue)
      return { ...e, sum, loan: interestMoney, startDate: date, dateDue }
    })

    let _year = date.year() + year
    if (date.month() < 11) {
      _year -= 1
    }
    date = date.clone().set({ date: dateLoan, month: moment().month() })

    if (now.date() > dateLoan) {
      date.add({ month: 1 })
    }
    while (date.year() <= _year) {
      const dateDue = date.clone().add({ month: monthLoan })
      let _investMoney = money * unit


      let preMoney = _data.reduce((sum: any, item: any) => {

        if (item.dateDue <= date && !item.daThu) {
          item.daThu = true
          return sum + item.investmentMoney + item.interestMoney
        }
        return sum
      }, 0)


      let reInvestmentMoney = 0
      if (preMoney) {

        // const preMoney = preLoan.money + preLoan.loan
        sum -= preMoney
        reInvestmentMoney = preMoney
        _investMoney += preMoney
      }

      const interestMoney = calLoan(_investMoney)

      sum += _investMoney + interestMoney

      _data.push({
        startDate: date,
        dateDue,
        id: _data.length,
        interestMoney,
        investmentMoney: _investMoney,
        sum,
        reInvestmentMoney: reInvestmentMoney,
        isForecast: true
      })
      date = date.clone().add({ month: 1 })
      // date = moment(date)

    }
    return _data
  }, [rate, money, year, unit, dateLoan, monthLoan, dataFinancial])

  const rowSelectLoan = useMemo(() => {
    const data: any[] = []
    if (rowSelect) {
      let sum = 0
      for (let i = 1; i <= countYear; i++) {
        let lai = 0
        let goc = 0
        let date = null
        if (i === 1) {
          lai = calLoan(rowSelect.investMoney)
          goc = rowSelect.investMoney
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


  const _unitText = useMemo(() => <sup>{UNIT[unit]}</sup>, [unit])
  const _totalInvenst = useMemo(() => dataFinancial?.reduce?.((pre: number, e: any) => pre + e.investmentMoney, 0) || 0, [dataFinancial])
  const _totalInterest = useMemo(() => dataFinancial?.reduce?.((pre: number, e: any) => pre + e.interestMoney, 0) || 0, [dataFinancial])

  return (
    <MainLayout
      title="Quản lý tài chính"
      afterTitle={
        <div className="flex gap-1 text-base items-center">
          <Button type='ghost' key={3} size="large"><Link to={BILL_PATH}>Thống kê bill</Link></Button>
          Tổng vốn <b>{currency(_totalInvenst)}</b>, tổng lãi: <b>{currency(_totalInterest)}</b>
        </div>
      }
    >
      <TableRoot>
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center ">
            Ngân hàng SCB, Lãi xuất: <span><Input style={{ width: 80 }} defaultValue={(rate * 100).toFixed(2)}
              onKeyUp={onEnter((e: any) => {
                const _v = parseFloat(e)
                if (_v) setRate(_v / 100)
              })}
            />%</span> / <span>
              <Input style={{ width: 80 }} maxLength={2} defaultValue={monthLoan}
                onKeyUp={onEnter((e: any) => {
                  const _v = parseInt(e)
                  if (_v) setMonthLoan(_v)
                })}
              />tháng
            </span>,
            Số tiền tiết kiệm mõi tháng:
            <span>
              <Input style={{ width: 120 }} defaultValue={money}
                onKeyUp={onEnter((e: any) => {
                  const _v = parseFloat(e)
                  if (_v) setMoney(_v)
                })}
              />
            </span> {_unitText},
            Số năm cho dự đoán:
            <span>
              <Input maxLength={2} style={{ width: 40, textAlign: 'center' }} defaultValue={year}
                onKeyUp={onEnter((e: any) => {
                  const _v = parseInt(e)
                  if (_v) setYear(_v)
                })}
              />
            </span>
            Ngày gửi tiết kiệm hàng tháng:
            <span>
              <Input maxLength={2} style={{ width: 40, textAlign: 'center' }} defaultValue={dateLoan}
                onKeyUp={onEnter((e: any) => {
                  const _v = parseInt(e)
                  if (_v) setDateLoan(_v)
                })}
              />
            </span>
          </div>


          <div className="flex gap-2 items-center justify-space">
            <Button type='primary' danger key={3} size="large" onClick={() => setIsOpenAdd(true)}>Thêm sổ tiết kiệm</Button>
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
          loading={isFetching}
          onRow={(item) => ({
            style: {
              cursor: item.isForecast ? 'auto' : 'pointer'
            },
            onClick: () => {
              if (!item.isForecast) {
                setTietKiemDetail(item)
                setIsOpenAdd(true)
              }
            }
          })}
          columns={[
            {
              title: 'Ngày',
              render: (item) => item.startDate.format('DD/MM/YYYY')
            },
            {
              title: 'Số tiền tiết kiệm + tái đầu tư',
              render: (item) => <div>
                {
                  item.reInvestmentMoney ? <div>
                    {currency((item.investmentMoney - item.reInvestmentMoney) / unit)} + {currency(item.reInvestmentMoney / unit)} = {currency(item.investmentMoney / unit)} {_unitText}
                  </div> : <div>{currency(item.investmentMoney / unit)} {_unitText}</div>
                }

              </div>
            },
            {
              title: 'Ngày đáo hạn',
              render: (item) => item.dateDue.format('DD/MM/YYYY')
            },
            {
              title: 'Gốc + lãi',
              render: (item) => <div>
                {currency(item.investmentMoney / unit)} + {currency(item.interestMoney / unit)} = {currency((item.investmentMoney + item.interestMoney) / unit)} {_unitText}
              </div>
            },
            {
              title: 'Tổng số tiền tiết kiệm',
              render: (item) => <div>{currency(item.sum / unit)} {_unitText}</div>
            },
            {
              width: 15,
              render: (item) => <ThreeDotAction menu={[
                {
                  label: <span onClick={() => setRowSelect(item)}>Xem lãi xuất kép</span>
                },
                {
                  label: <Popconfirm title="Bạn có chắc chắn muốn xóa sổ tiết kiệm này" onConfirm={async () => {
                    await financialService.deleteSoTietKiem(item.id)
                    reFetch()
                  }}>
                    <span className="text-red-500">Xóa</span>
                  </Popconfirm>
                },
              ]} />
            }
          ]}
          dataSource={_dataFinancial}
          rowClassName={(item) => item.startDate > now ? 'disabled' : ''}
        />

        <Modal
          width={768}
          visible={!!rowSelect}
          onCancel={() => {
            setRowSelect(null)
            setCountYear(5)
          }}
          title={rowSelect && <div>Lãi xuất kép: Gốc <span className="text-primary-900">{currency(rowSelect.investMoney / unit)} {_unitText}</span>
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
                render: (item) => item.startDate.format('DD/MM/YYYY')
              },
              {
                title: 'Gốc + Lãi',
                render: (item) => <div> {currency(item.goc / unit)} + {currency(item.lai / unit)} = {currency(item.investmentMoney / unit)} {_unitText}</div>
              },
            ]}
            dataSource={rowSelectLoan}
          />
        </Modal>
        <ModalCreateSoTietKiem
          visible={isOpenAdd}
          onCancel={() => {
            setIsOpenAdd(false)
            setTietKiemDetail(undefined)
          }}
          onCreate={reFetch}
          soTietKiem={tietKiemDetail}
        />
      </TableRoot>
    </MainLayout>
  )
}

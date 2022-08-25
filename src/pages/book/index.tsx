import { Button } from 'antd'
import { ActionMenuDeleteRoot } from 'assets/styles'
import { ThreeDotAction, Popconfirm } from 'atoms'
import MainLayout from 'components/MainLayout'
import ModalCreateBook from 'components/organisms/ModalCreateBook'
import { useQuery } from 'core'
import moment from 'moment'
import { useState } from 'react'
import { bookService } from 'services/book.service'
import styled from 'styled-components'



const CardCover = styled.div`
  margin: 20px;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:after{
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
`

const CardTitle = styled.div`
  padding: 0 20px 20px 20px;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
`

const CardAction = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: none;
`


const CardRoot = styled.div`
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  position: relative;

  &:hover {
    ${CardAction} {
      display: block;
    }
  }
`

const CardFooter = styled.div`

`
export default function Book() {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const { data, isFetching, reFetch }: any = useQuery(() => bookService.getBook(), [])

  return (
    <MainLayout
      title="Quản lý sách"
      afterTitle={<Button type='primary' key={3} size="large" onClick={() => setIsOpenAdd(true)}>Thêm sách</Button>}
    >
      <div className='mb-2 flex'>
        Tổng số sách đã đọc: {data?.length} cuốn
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {
          data?.map((e: any) => {

            const menu = [
              {
                label: 'Chỉnh sữa'
              },
              {
                label: 'Markbook'
              },

              {
                label: <ActionMenuDeleteRoot>Xóa</ActionMenuDeleteRoot>
              }
            ]

            if (!e.finishedAt) {
              menu.splice(2, 0,
                {
                  label: <Popconfirm okText="Đã hoàn thành" title="Đánh dấu hoàn thành quyển sách này, thao tác này sẽ không thể được thay đổi?" onConfirm={() => {
                    bookService.editBook(e.id, { finishedAt: moment() })
                  }}>
                    <span>Đánh dấu đã hoàn thành</span>
                  </Popconfirm>
                }
              )
            }
            return <CardRoot key={e.id}>
              <CardAction>
                <ThreeDotAction
                  menu={menu}
                />
              </CardAction>
              <CardCover>
                <img src={e.cover} />
              </CardCover>
              <CardTitle>{e.name}</CardTitle>
              <CardFooter></CardFooter>
            </CardRoot>
          }

          )
        }
      </div>
      <ModalCreateBook
        visible={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
        onCreate={reFetch}
      />
    </MainLayout>
  )
}

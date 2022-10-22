import { StarIcon } from '@heroicons/react/solid'
import { Button } from 'antd'
import { ActionMenuDeleteRoot } from 'assets/styles'
import { Popconfirm, ThreeDotAction } from 'atoms'
import MainLayout from 'components/MainLayout'
import { BookCard } from 'components/molecules/BookCard'
import { ModalBookmark } from 'components/organisms/ModalBookmark'
import ModalCreateBook from 'components/organisms/ModalCreateBook'
import { BOOK_DETAIL_PATH, BOOK_REQUEST_PATH } from 'config/path'
import { openModal, useQuery } from 'core'
import { slugify } from 'core/utils'
import moment from 'moment'
import { useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { bookService } from 'services/book.service'

export default function Book() {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  const navigate = useNavigate()
  // const { openPrompt } = usePage()
  const { data, isFetching, reFetch }: any = useQuery(() => bookService.getBook(), [])
  const { data: today, reFetch: refetchToday }: any = useQuery(() => bookService.getReadToday())
  
  return (
    <MainLayout
      title="Quản lý sách"
      afterTitle={
        <span className="flex gap-1 items-center font-normal">
          <Button type='primary' danger size="large" onClick={() => navigate(BOOK_REQUEST_PATH)}>Sách chờ mua</Button>
          <Button type='primary' size="large" onClick={() => setIsOpenAdd(true)}>Thêm sách</Button>
          <span className='text-base '>Số trang sách đã đọc hôm nay: <b>{today?.read}</b> trang</span>
        </span>
      }
    >
      <div className='mb-2 flex'>
        Tổng số sách đã đọc: {data?.length} cuốn
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {
          data?.map((e: any) => {

            const menu: any = [
              {
                label: <span >Bookmark</span>,
                onClick: async () => {
                  const bookmark = await openModal(<ModalBookmark value={e.bookmark} onCancel={() => console.log('onCancel')} />)
                  await bookService.editBook(e.id, bookmark)
                  reFetch()
                  refetchToday()
                }
              },
              {
                label: 'Chỉnh sữa'
              },
              {
                label: <span className='flex gap-1'><StarIcon className='w-4 text-gray' />{e.star ? 'Bỏ sao' : 'Đánh dấu sao'}</span>,
                onClick: async () => {
                  await bookService.editBook(e.id, { ...e, star: !e.star })
                  reFetch()
                }
              },
              {
                label: <ActionMenuDeleteRoot>Xóa</ActionMenuDeleteRoot>,
                onClick: async () => {
                  await bookService.deleteBook(e.id)
                  reFetch()
                }
              }
            ]

            if (!e.finishedAt) {
              menu.splice(2, 0,
                {
                  label: <Popconfirm okText="Đã hoàn thành" title="Đánh dấu hoàn thành quyển sách này, thao tác này sẽ không thể được thay đổi?" onConfirm={() => {
                    bookService.editBook(e.id, { finishedAt: moment() })
                  }}>
                    <span>Đánh dấu đã hoàn thành</span>
                  </Popconfirm>,
                }
              )
            }

            const path = generatePath(BOOK_DETAIL_PATH, { slug: slugify(e.name), id: e.id })
            return <BookCard
              key={e.id}
              book={e}
              bookmark
              star
              path={path}
              action={<ThreeDotAction menu={menu} />}
            />
          }

          )
        }
      </div>
      <ModalCreateBook
        visible={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
        onCreate={reFetch}
      />
    </MainLayout >
  )
}

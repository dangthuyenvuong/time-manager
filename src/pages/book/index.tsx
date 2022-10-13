import { BookmarkIcon, BookOpenIcon, TagIcon } from '@heroicons/react/solid'
import { Button } from 'antd'
import { ActionMenuDeleteRoot } from 'assets/styles'
import { ThreeDotAction, Popconfirm, Link } from 'atoms'
import MainLayout from 'components/MainLayout'
import { ModalBookmark } from 'components/organisms/ModalBookmark'
import ModalCreateBook from 'components/organisms/ModalCreateBook'
import { BOOK_DETAIL_PATH } from 'config/path'
import { usePage, useQuery } from 'core'
import { prompt, slugify } from 'core/utils'
import { openModal } from 'core/utils/openPrompt'
import moment from 'moment'
import { useState } from 'react'
import { generatePath } from 'react-router-dom'
import { bookService } from 'services/book.service'
import styled from 'styled-components'



export const CardCover = styled.div`
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

export const CardTitle = styled.div`
  padding: 0 20px 20px 20px;
  font-size: 20px;
  text-align: center;
  font-weight: 500;
`

export const CardAction = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: none;
`


export const CardRoot = styled.div`
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

export const CardFooter = styled.div`

`


export const Bookmark = styled.div<{ background?: string, position?: { left: string, top: string } }>`
  display: flex;
  aligin-items: center;
  border-radius: 100px;
  position: absolute;
  left: ${(props) => props?.position?.left || '0px'};
  top: ${(props) => props?.position?.top || '0px'};
  z-index: 1;
  font-weight: bold;

  width: fit-content;
  background: ${({ background }: any) => background || '#383d97de'};
  color: white;
  font-size: 13px;
  gap: 6px;
  padding: 3px 15px;
}
`

export default function Book() {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  // const { openPrompt } = usePage()
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

            const menu: any = [
              {
                label: 'Chỉnh sữa'
              },
              {
                label: <span >Bookmark</span>,
                onClick: async () => {
                  const bookmark = await openModal(<ModalBookmark value={e.bookmark} onCancel={() => console.log('onCancel')}/>)
                  bookService.editBook(e.id, bookmark)
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
            return <CardRoot key={e.id}>
              <CardAction>
                <ThreeDotAction
                  menu={menu}
                />
              </CardAction>
              <CardCover>
                {
                  e.bookmark && <Bookmark position={{ left: 'calc(100% - 66px)', top: '0' }}><TagIcon className='w-4 text-blue' /> {e.bookmark}</Bookmark>
                }

                <Link to={path}>
                  <img src={e.cover} />
                </Link>
              </CardCover>
              <Link to={path}>
                <CardTitle>{e.name}</CardTitle>
              </Link>
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

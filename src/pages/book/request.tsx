import { StarIcon } from '@heroicons/react/solid'
import { Button } from 'antd'
import { ThreeDotAction } from 'atoms'
import MainLayout from 'components/MainLayout'
import { BookCard } from 'components/molecules/BookCard'
import ModalCreateBook from 'components/organisms/ModalCreateBook'
import { BOOK_PATH } from 'config/path'
import { useQuery } from 'core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookService } from 'services/book.service'


export default function BookRequest() {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const navigate = useNavigate()
    // const { openPrompt } = usePage()
    const { data, isFetching, reFetch }: any = useQuery(() => bookService.getBook(`?request=true`), [])

    return (
        <MainLayout
            title="Quản lý sách"
            afterTitle={
                <span className="flex gap-1">
                    <Button type='primary' size="large" onClick={() => navigate(BOOK_PATH)}>Sách đã đọc</Button>
                    <Button type='primary' size="large" onClick={() => setIsOpenAdd(true)}>Thêm sách</Button>
                </span>
            }
        >
            <div className='mb-2 flex'>
                Tổng số sách chờ mua: {data?.length} cuốn
            </div>
            <div className='grid grid-cols-6 gap-4'>
                {
                    data?.map((e: any) => {

                        const menu: any = [
                            {
                                label: <span className='flex gap-1'><StarIcon className='w-4 text-gray' />Vote</span>,
                                onClick: async () => {
                                    await bookService.editBook(e.id, { ...e, vote: (e.vote || 0) + 1 })
                                    reFetch()
                                }
                            },

                        ]


                        return <BookCard
                            key={e.id}
                            book={e}
                            bookmark
                            star
                            vote={e.vote}
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
                request
            />
        </MainLayout >
    )
}

import { ThreeDotAction, Link } from "atoms"
import MainLayout from "components/MainLayout"
import { CardAction, CardCover, CardFooter, CardRoot, CardTitle } from "components/molecules/BookCard"
import { useQuery } from "core"
import { useParams } from "react-router-dom"
import { bookService } from "services/book.service"

export default function BookDetail() {
  const { id } = useParams()
  const { data }: any = useQuery(() => bookService.getBookDetail(id as string), [id])
  const book = data?.data || {}
  return (
    <MainLayout
      title="Quản lý sách"
    >
      <div className="sidebar" style={{ width: 330, maxWidth: '100%' }}>
        <CardRoot>
          <CardAction>
            {/* <ThreeDotAction
            // menu={menu}
          /> */}
          </CardAction>
          <CardCover>
            <img src={book.cover} />
          </CardCover>
          <CardTitle>{book.name}</CardTitle>
          <CardFooter></CardFooter>
        </CardRoot>
      </div>
      <div>
        
      </div>
    </MainLayout>
  )
}

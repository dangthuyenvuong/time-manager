import { ThreeDotAction, Link } from "atoms"
import MainLayout from "components/MainLayout"
import { useQuery } from "core"
import { useParams } from "react-router-dom"
import { bookService } from "services/book.service"
import { CardAction, CardCover, CardFooter, CardRoot, CardTitle } from "."

export default function BookDetail() {
  const { id } = useParams()
  const { data }: any = useQuery(() => bookService.getBookDetail(id as string), [id])
  const book = data?.data || {}
  return (
    <MainLayout
      title="Quản lý sách"
    >
      <div className="sidebar" style={{width: 330}}>
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
    </MainLayout>
  )
}

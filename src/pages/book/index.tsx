import { Button } from 'antd'
import MainLayout from 'components/MainLayout'

export default function Book() {
  return (
    <MainLayout
      title="Quản lý sách"
      afterTitle={<Button type='ghost' key={3} size="large">Thêm sách</Button>}
    >
        <div>Book</div>
    </MainLayout>
  )
}

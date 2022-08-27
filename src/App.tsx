import { BOOK_DETAIL_PATH } from 'config/path';
import { AuthRequired } from 'layouts';
import Book from 'pages/book';
import BookDetail from 'pages/book/[slug]';
import Bill from 'pages/financial/bill';
import Knowledge from 'pages/knowledge';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import './global.less';
import Page404 from './pages/404';
import Financial from './pages/financial';
import Login from './pages/login';
import TimeManagement from './pages/time-management';
import './variable.module.css';


function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<AuthRequired />}>
        <Route index element={<Financial />} />
        <Route path='financial'>
          {/* <Route index element={<Financial />} /> */}
          <Route path="bill" element={<Bill />} />
        </Route>
        <Route path='book'>
          <Route index element={<Book />} />
          <Route path={BOOK_DETAIL_PATH} element={<BookDetail />} />
        </Route>
        <Route path='knowledge'>
          <Route index element={<Knowledge />} />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App

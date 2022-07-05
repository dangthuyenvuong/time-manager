import './global.less'
import './variable.module.css';
import Input from 'antd/lib/input/Input'
import { createTheme } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages'
import Page404 from './pages/404'
import Login from './pages/login';
import AuthLayout from './components/AuthLayout';

const theme = createTheme({

})

function App() {

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App

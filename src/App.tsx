import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import MainLayout from './components/MainLayout';
import './global.less';
import TimeManagement from './pages/time-management';
import Page404 from './pages/404';
import Login from './pages/login';
import './variable.module.css';
import Financial from './pages/financial';


function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<TimeManagement />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App

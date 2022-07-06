import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './stores'
import { createTheme } from '@mui/material'
import { ConfigProvider, Empty } from 'antd'



const theme = createTheme({

})

ConfigProvider.config({
  // prefixCls: "core",
  theme: {
    // primaryColor: '#00ADB5',

  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        renderEmpty={() => <Empty description="Không có dữ liệu phù hợp" />}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

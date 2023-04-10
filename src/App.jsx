import { AppRouter } from "./AppRouter"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd';
function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#2c3e50',
                fontFamily: 'Kanit, sans-serif',
              },
            }}
          >
        <AppRouter />
          </ConfigProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App

import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../store'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PersistLogin } from "@/components/auth/PersistentLogin";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();


  const renderLayout = () => {
    if (pathname?.includes('/public/exam')) {
      return (
        <Component {...pageProps} />
      )
    }
    return (
      <PersistLogin>
        <ProtectedRoute>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ProtectedRoute>
      </PersistLogin>
    )
  };

  return (
    <Provider store={store}>
      <ChakraProvider>
        {renderLayout()}
      </ChakraProvider>
    </Provider>
  )
}

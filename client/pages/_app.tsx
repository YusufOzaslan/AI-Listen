import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../store'
import { Provider } from 'react-redux'
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PersistLogin } from "@/components/auth/PersistentLogin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistLogin>
        <ChakraProvider>
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </ChakraProvider>
      </PersistLogin>
    </Provider>
  )
}

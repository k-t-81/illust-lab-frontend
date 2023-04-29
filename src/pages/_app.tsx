import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from '@/configs/chakra';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

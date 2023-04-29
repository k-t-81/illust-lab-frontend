import { cacheExchange, dedupExchange, fetchExchange, mapExchange, Client } from 'urql';
import { NextUrqlClientConfig } from 'next-urql';

export const nextUrqlClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  url: 'http://localhost:8000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrExchange,
    fetchExchange,
    mapExchange({
      onError: (error, operation) => {
        console.error(`The operation ${operation.key} has errored with:`, error);
        throw error;
      },
    }),
  ],
  requestPolicy: 'cache-and-network',
});

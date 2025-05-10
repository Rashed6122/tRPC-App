// utils/trpcClient.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from "../../../server/src/index";


export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc', // Update to your API base URL
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include', 
        });
      },
    }),
  ],
});

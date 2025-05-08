import { useState } from "react";
import "./App.css";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    });
  });
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Link to="/"></Link>
        <Outlet />
        {/* <Register /> */}
        {/* <SignIn /> */}
        {/* <PhoneNumberWithCountryCode /> */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
export default App;

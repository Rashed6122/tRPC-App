import { useState } from "react";
import "./App.css";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import Aside from "./components/Aside";
import Pinned from "./components/Pinned";

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
        <div className="relative min-h-screen md:flex">
          <Aside />
          <div className="flex-1 max-w-xl mx-auto justify-items-center">
            <div className="max-w-md max-h-md mx-auto gap-y-4 mt-8">
              <Link to="/"></Link>
              <Outlet />
            </div>
          </div>
          <Pinned />
        </div>
        {/* <SignIn /> */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
export default App;

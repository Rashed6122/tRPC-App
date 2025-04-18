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
        <div className="max-w-xl mx-auto">
          <div className="text-center text-3xl font-bold text-gray-700 mt-9">
            <h1>Rashedlogy </h1>
          </div>
          <div className="max-w-md max-h-md mx-auto grid gap-y-4 mt-8">
            <Link to="/"></Link>
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
export default App;

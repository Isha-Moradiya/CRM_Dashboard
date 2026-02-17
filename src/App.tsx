import { Route, Routes } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { MainErrorFallback } from "./components/errors/error"
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";

import { FetchPost } from "./app/TanstackQuery/FetchPost";
import { Layout } from "./components/Layout";
import { Dashboard } from "./app/Dashboard/Dashboard";
import { Leads } from "./app/Leads/Leads";
import { Deals } from "./app/Deals/Deals";
import { Contacts } from "./app/Contacts/Contacts";
import { Tasks } from "./app/Tasks/Tasks";
import { Reports } from "./app/Reports/Reports";
import { Settings } from "./app/Settings/Settings";

const App = () => {
  const queryClient = new QueryClient()

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="leads" element={<Leads />} />
                <Route path="opportunities" element={<Deals />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="activities" element={<Tasks />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/posts" element={<FetchPost />} />
            </Routes>
          </AnimatePresence>
        </QueryClientProvider>
        <Toaster position="top-right" gap={3} />
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default App;

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { QueryPanel } from './components/QueryPanel';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#0F172A] text-white">
        <header className="border-b border-slate-800 bg-[#0d1526] px-6 py-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
            UNI
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">University Record Management System</h1>
            <p className="text-[11px] text-slate-500 leading-tight">Query Console</p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
        </header>
        <QueryPanel />
      </div>
    </QueryClientProvider>
  );
}

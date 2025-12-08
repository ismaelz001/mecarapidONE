import Sidebar from './Sidebar';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-mr-bg">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

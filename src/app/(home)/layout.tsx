import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";

export default function AppUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex">
      <Sidebar />

      <div className="flex-grow md:ml-56 min-h-[calc(100vh-2rem)] transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
          <Header />
          <main className="flex-1 py-4 sm:py-6 lg:py-8 text-gray-800">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

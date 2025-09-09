import { AppSidebar, Header } from "@/components/custom";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-accent h-screen p-4 sm:py-6 sm:px-10 w-full">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}

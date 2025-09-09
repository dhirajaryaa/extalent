import { AppSidebar, Header } from "@/components/custom";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-accent h-screen py-6 px-10 w-full">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}

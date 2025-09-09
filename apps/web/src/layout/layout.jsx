import { AppSidebar, Header } from "@/components/custom";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-accent w-full min-h-svh">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}

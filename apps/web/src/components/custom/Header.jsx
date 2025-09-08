import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

function Header() {
  return (
    <header className="bg-muted flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
      </div>
      <Button>
        <ExternalLink /> Get Extension
      </Button>
    </header>
  );
}

export default Header;

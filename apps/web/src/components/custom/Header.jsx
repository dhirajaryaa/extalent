import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import uiStore from "@/store/ui.store";
import { Link } from "react-router";
import { UserAvatar } from ".";

function Header() {
  const {activePage} = uiStore();
  return (
    <header className="bg-muted flex items-center justify-between sticky top-4 z-40 p-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg sm:text-xl font-semibold capitalize">{activePage}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link to={"/profile"}>
<UserAvatar />
        </Link>
      <Button>
        <ExternalLink /> Get Extension
      </Button>
      </div>
    </header>
  );
}

export default Header;

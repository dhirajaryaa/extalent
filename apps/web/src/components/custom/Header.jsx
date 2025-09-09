import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import userStore from "@/store/user.store";

function Header() {
  const {user} = userStore();
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
      <div className="flex items-center gap-2">
      <Avatar className="rounded-lg border border-primary p-[1px]">
        <AvatarImage
          src={user?.avatar}
          alt={user?.name}
          className={'object-cover rounded-lg'}
        />
        <AvatarFallback>{user?.name.split(" ").map((word) => word[0])}</AvatarFallback>
      </Avatar>
      <Button>
        <ExternalLink /> Get Extension
      </Button>
      </div>
    </header>
  );
}

export default Header;

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";
import {
  LayoutGridIcon,
  BriefcaseBusinessIcon,
  UserCircleIcon,
  StarIcon,
  LogOut,
  CircleQuestionMark
} from "lucide-react";

const AppSidebar = () => {
  const { pathname } = useLocation();
  const links = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGridIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserCircleIcon,
    },
    {
      title: "Job Matches",
      url: "/jobs",
      icon: BriefcaseBusinessIcon,
    },
    {
      title: "Saved Jobs",
      url: "/saved-jobs",
      icon: StarIcon,
    },
  ];

  return (
    <Sidebar >
      <SidebarHeader >
      {/* logo */}
      <SidebarMenu>
        <SidebarMenuItem >
          <SidebarMenuButton
            asChild
          >
            <Link to="/dashboard">
              <Logo />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* nav links  */}
        <SidebarMenu className={"mt-10"}>
          {links.map((link) => (
            <SidebarMenuItem>
              <Link to={link.url}>
                <SidebarMenuButton
                  asChild
                  tooltip={link.name}
                  isActive={pathname.startsWith(link.url)}
                  className="data-[active=true]:bg-primary data-[active=true]:text-background mx-auto text-sidebar-accent-foreground/60 w-[90%]"
                >
                  <div className="py-6 flex gap-3 text-lg sm:text-[16px] px-3 font-medium ">
                    <span>
                      <link.icon className="size-5 sm:size-6"/>
                    </span>
                    <span>{link.title}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
        <SidebarMenuItem>
              <Link to={'support'}>
                <SidebarMenuButton
                  asChild
                  tooltip={'support'}
                   isActive={pathname.startsWith('support')}
                  className=" mx-auto text-sidebar-accent-foreground/60 w-[90%]"
                >
                  <div className="py-5 flex gap-3 text-lg sm:text-[16px] px-3 font-medium ">
                    <span>
                        <CircleQuestionMark className="size-5 sm:size-6" />
                    </span>
                    <span>Support</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {/* logout  */}
        <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={'Logout'}
                  className="mx-auto text-sidebar-accent-foreground/60 w-[90%]"
                >
                  <div className="py-5 flex gap-3 text-lg sm:text-[16px] px-3 font-medium ">
                    <span>
                        <LogOut className="size-5 sm:size-6" />
                    </span>
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

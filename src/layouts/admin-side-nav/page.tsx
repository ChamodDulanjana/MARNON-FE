 import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { menus} from "@/assets/data/adminPanelMenus.ts"


const AdminSideNav = () => {
  return (
    <div>
        <Sidebar className=" mt-[70px]" collapsible="icon">
        <SidebarContent className="bg-black text-white">
            <SidebarGroup>
            <SidebarGroupLabel className="text-white">Admin panel</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="pt-2 gap-2">
                {menus.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                            <span>
                                <item.icon className="text-lg"/>
                            </span>
                            <span className="text-[14px]">{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
    </div>
  )
}

export default AdminSideNav 
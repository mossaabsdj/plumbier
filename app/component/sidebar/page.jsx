import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import data from "@/app/Texts/content.json";
// Menu items.
const items = data.SliderMenu;

export function AppSidebar({ setpagesVisibility }) {
  const handleClick = (pageKey) => {
    //  console.log("ke" + pageKey);
    setpagesVisibility((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), // set all false
      [pageKey]: true, // activate the selected one
    }));
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{data.TitleApp}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => handleClick(item.title)}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

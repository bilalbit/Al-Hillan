import React from 'react';
import {BadgeDollarSign, BookText, Home, PackagePlus, PersonStandingIcon,File} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import Image from "next/image";
import {UserMenuContent} from "@/features/dashboard/components/user-menu-content";
import NavLink from '@/components/nav-link';

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Students",
        url: "/dashboard/students",
        icon: PersonStandingIcon,
    },
     {
        title: "Registers",
        url: "/dashboard/register",
        icon: File,
    },
    {
        title: "Payments",
        url: "/dashboard/payments",
        icon: BadgeDollarSign,
    },
    {
        title: "Courses",
        url: "/dashboard/courses",
        icon: BookText,
    },
    {
        title: "Package",
        url: "/dashboard/packages",
        icon: PackagePlus,
    },
];

export const AppSideBar = () => {
    return (
        <Sidebar collapsible='icon' variant="floating" className="border-2 *:bg-primary-foreground">
            {/*HEADER*/}
            <SidebarHeader className="py-1">
                <SidebarMenu>
                    <SidebarMenuButton asChild>
                        <div>
                            <Image src='/logo.svg' alt='log' width={20} height={20}/>
                            <span>Admin Page</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator/>

            {/*CONTENT*/}
            <SidebarContent>
                {/*APPLICATION GROUP*/}
                <SidebarGroup>
                    <SidebarGroupLabel>Accessibility</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <NavLink active="bg-tertiary/80 dark:bg-primary/80 dark:text-black text-white" href={item.url}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator/>


            </SidebarContent>


            {/*FOOTER*/}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserMenuContent/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );

};

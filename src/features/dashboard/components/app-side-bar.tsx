import React from 'react';
import {BadgeDollarSign, BookText, ChevronUp, Home, PackagePlus, PersonStandingIcon, User2,} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    // SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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
                                            <Link href={item.url}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </Link>
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2/>
                                    John Doe
                                    <ChevronUp className="ml-auto"/>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );

};

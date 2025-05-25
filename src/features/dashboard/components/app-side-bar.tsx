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
                               <span>Admin Profile</span>
                           </div>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>

                <SidebarSeparator/>

                {/*CONTENT*/}
                <SidebarContent>
                    {/*APPLICATION GROUP*/}
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
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

                    {/*<SidebarSeparator/>*/}

                    {/*PROJECTS GROUP*/}
                    {/*<SidebarGroup>*/}
                    {/*    <SidebarGroupLabel>Projects</SidebarGroupLabel>*/}
                    {/*    <SidebarGroupAction title="Add Project">*/}
                    {/*        <Plus/> <span className="sr-only">Add Project</span>*/}
                    {/*    </SidebarGroupAction>*/}
                    {/*    <SidebarContent>*/}
                    {/*        <SidebarMenu>*/}
                    {/*            <SidebarMenuItem>*/}
                    {/*                <SidebarMenuButton asChild>*/}
                    {/*                    <Link href='#'>*/}
                    {/*                        <Projector/>*/}
                    {/*                        See All Projects*/}
                    {/*                    </Link>*/}
                    {/*                </SidebarMenuButton>*/}
                    {/*            </SidebarMenuItem>*/}
                    {/*            <SidebarMenuItem>*/}
                    {/*                <SidebarMenuButton asChild>*/}
                    {/*                    <Link href='#'>*/}
                    {/*                        <Plus/>*/}
                    {/*                        Add Projects*/}
                    {/*                    </Link>*/}
                    {/*                </SidebarMenuButton>*/}
                    {/*            </SidebarMenuItem>*/}
                    {/*        </SidebarMenu>*/}
                    {/*    </SidebarContent>*/}
                    {/*</SidebarGroup>*/}

                    {/*<SidebarSeparator/>*/}

                    {/*COLLAPSIBLE GROUP*/}


                    {/*<Collapsible defaultOpen className="group/collapsible">*/}
                    {/*    <SidebarGroup>*/}
                    {/*        <SidebarGroupLabel asChild>*/}
                    {/*            <CollapsibleTrigger>*/}
                    {/*                help*/}
                    {/*                <ChevronDown*/}
                    {/*                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>*/}
                    {/*            </CollapsibleTrigger>*/}
                    {/*        </SidebarGroupLabel>*/}
                    {/*        <CollapsibleContent>*/}
                    {/*            <SidebarGroupContent>*/}
                    {/*                <SidebarMenu>*/}
                    {/*                    <SidebarMenuItem>*/}
                    {/*                        <SidebarMenuButton asChild>*/}
                    {/*                            <Link href="/#">*/}
                    {/*                                <Projector/>*/}
                    {/*                                See All Projects*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuButton>*/}
                    {/*                    </SidebarMenuItem>*/}
                    {/*                    <SidebarMenuItem>*/}
                    {/*                        <SidebarMenuButton asChild>*/}
                    {/*                            <Link href="/#">*/}
                    {/*                                <Plus/>*/}
                    {/*                                Add Project*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuButton>*/}
                    {/*                    </SidebarMenuItem>*/}
                    {/*                </SidebarMenu>*/}
                    {/*            </SidebarGroupContent>*/}
                    {/*        </CollapsibleContent>*/}
                    {/*    </SidebarGroup>*/}
                    {/*</Collapsible>*/}

                    {/*<SidebarSeparator/>*/}
                    {/*STICKY HEADER*/}
                    {/*<SidebarHeader className="min-w-full">*/}
                    {/*    <SidebarMenu>*/}
                    {/*        <SidebarMenuItem>*/}
                    {/*            <DropdownMenu>*/}
                    {/*                <DropdownMenuTrigger asChild>*/}
                    {/*                    <SidebarMenuButton>*/}
                    {/*                        <span>Select Workspace</span>*/}
                    {/*                        <ChevronDown className="ml-auto"/>*/}
                    {/*                    </SidebarMenuButton>*/}
                    {/*                </DropdownMenuTrigger>*/}
                    {/*                <DropdownMenuContent sideOffset={4}>*/}
                    {/*                    <DropdownMenuItem>*/}
                    {/*                        <span>Acme Inc</span>*/}
                    {/*                    </DropdownMenuItem>*/}
                    {/*                    <DropdownMenuItem>*/}
                    {/*                        <span>Acme Corp.</span>*/}
                    {/*                    </DropdownMenuItem>*/}
                    {/*                </DropdownMenuContent>*/}
                    {/*            </DropdownMenu>*/}
                    {/*        </SidebarMenuItem>*/}
                    {/*    </SidebarMenu>*/}
                    {/*</SidebarHeader>*/}

                    {/*NESTED ITEMS*/}
                    {/*<SidebarGroup>*/}
                    {/*    <SidebarGroupLabel>Nested Items</SidebarGroupLabel>*/}
                    {/*    <SidebarContent>*/}
                    {/*        <SidebarMenu>*/}
                    {/*            <SidebarMenuItem>*/}
                    {/*                <SidebarMenuButton asChild>*/}
                    {/*                    <Link href='#'>*/}
                    {/*                        <Projector/>*/}
                    {/*                        See All Projects*/}
                    {/*                    </Link>*/}
                    {/*                </SidebarMenuButton>*/}
                    {/*                <SidebarMenuSub>*/}
                    {/*                    <SidebarMenuSubItem>*/}
                    {/*                        <SidebarMenuSubButton asChild>*/}
                    {/*                            <Link href='#'>*/}
                    {/*                                <Plus/>*/}
                    {/*                                Add Project*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuSubButton>*/}
                    {/*                    </SidebarMenuSubItem>*/}
                    {/*                    <SidebarMenuSubItem>*/}
                    {/*                        <SidebarMenuSubButton asChild>*/}
                    {/*                            <Link href='#'>*/}
                    {/*                                <Plus/>*/}
                    {/*                                Add Category*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuSubButton>*/}
                    {/*                    </SidebarMenuSubItem>*/}
                    {/*                </SidebarMenuSub>*/}
                    {/*            </SidebarMenuItem>*/}
                    {/*            <SidebarMenuItem>*/}
                    {/*                <SidebarMenuButton asChild>*/}
                    {/*                    <Link href='#'>*/}
                    {/*                        <Projector/>*/}
                    {/*                        See All data*/}
                    {/*                    </Link>*/}
                    {/*                </SidebarMenuButton>*/}
                    {/*                <SidebarMenuSub>*/}
                    {/*                    <SidebarMenuSubItem>*/}
                    {/*                        <SidebarMenuSubButton asChild>*/}
                    {/*                            <Link href='#'>*/}
                    {/*                                <Plus/>*/}
                    {/*                                Add data*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuSubButton>*/}
                    {/*                    </SidebarMenuSubItem>*/}
                    {/*                    <SidebarMenuSubItem>*/}
                    {/*                        <SidebarMenuSubButton asChild>*/}
                    {/*                            <Link href='#'>*/}
                    {/*                                <Plus/>*/}
                    {/*                                Add Info*/}
                    {/*                            </Link>*/}
                    {/*                        </SidebarMenuSubButton>*/}
                    {/*                    </SidebarMenuSubItem>*/}
                    {/*                </SidebarMenuSub>*/}
                    {/*            </SidebarMenuItem>*/}
                    {/*        </SidebarMenu>*/}
                    {/*    </SidebarContent>*/}
                    {/*</SidebarGroup>*/}

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

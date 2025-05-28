'use client'
import React from 'react';
import Link from "next/link";
import {LogOut, Moon, Sun, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/layout/mode-toggle";

export const NavBar = () => {
    const {setTheme} = useTheme()
    return (
        <nav className="p-4 flex items-center justify-between sticky z-10 top-0 bg-background">

            {/*LEFT*/}

            <SidebarTrigger/>

            {/*RIGHT*/}

            <div className="flex items-center gap-4">
                <Link href='/dashboard'>Dashboard</Link>
                <ModeToggle />
                {/*USER MENU*/}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="/logo.svg" alt="@shadcn"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {/*<DropdownMenuItem>*/}
                        {/*    <User className="h-[1.2rem] w-[1.2rem] mr-2"/>*/}
                        {/*    Profile*/}
                        {/*</DropdownMenuItem>*/}
                        <DropdownMenuItem>
                            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

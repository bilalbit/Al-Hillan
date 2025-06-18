// 'use client'
import React from 'react';
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ModeToggle} from "@/components/layout/mode-toggle";
import {LogOutButton} from "@/features/dashboard/components/log-out-button";

export const NavBar = () => {
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
                        <LogOutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

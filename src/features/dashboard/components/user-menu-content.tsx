'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {ChevronUp, Settings, User2} from 'lucide-react';
import Link from 'next/link';
import {LogOutButton} from "@/features/dashboard/components/log-out-button";
import React from "react";
import {SidebarMenuButton} from '@/components/ui/sidebar';
import {useUser} from "@/components/user-context";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


export const UserMenuContent = () => {
    const {user, loading} = useUser();
    if (loading) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <User2/>
                    {user?.username}
                    <ChevronUp className="ml-auto"/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ml-4" align="end">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        {/*<UserInfo user={user} showEmail={true}/>*/}
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                            <AvatarImage src='/images/logo.svg' alt={user?.username}/>
                            <AvatarFallback
                                className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {user?.username}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user?.username}</span>
                            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" href='/dashboard/setting/profile'>
                            <Settings className="mr-2"/>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <LogOutButton/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

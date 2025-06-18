'use client';
import React from 'react';
import {LogOut} from "lucide-react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {logOut} from "@/features/login/actions";

export const LogOutButton = () => {
    return (
        <DropdownMenuItem onClick={logOut}>
            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"/>
            Logout
        </DropdownMenuItem>
    );
};

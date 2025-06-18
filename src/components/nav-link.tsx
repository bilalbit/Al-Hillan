'use client';
import React from "react";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from "@/lib/utils";

type NavLinkProps = {
    href: string
    children: React.ReactNode
    className?: string
    active?: string
}

const NavLink = ({href, className="",active, children}: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(className,isActive ? active : "")}
        >
            {children}
        </Link>
    );
};

export default NavLink;
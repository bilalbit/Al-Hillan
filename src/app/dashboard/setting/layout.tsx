import NavLink from '@/components/nav-link';
import React from 'react';

const SettingLayout = async ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="px-4 py-6">
            <div className="mb-8 space-y-0.5"><h2 className="text-xl font-semibold tracking-tight">Settings</h2><p
                className="text-sm text-muted-foreground">Manage your profile and account settings</p></div>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        <NavLink
                            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 has-[&gt;svg]:px-2.5 w-full justify-start"
                            active="bg-muted"
                            href="/dashboard/setting/profile">
                            Profile
                        </NavLink>
                        <NavLink
                            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 has-[&gt;svg]:px-2.5 w-full justify-start"
                            active="bg-muted"
                            href="/dashboard/setting/password">
                            Password
                        </NavLink>
                    </nav>
                </aside>
                <div data-orientation="horizontal" role="none" data-slot="separator-root"
                     className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-6 md:hidden"></div>
                {children}
            </div>
        </div>
    );
};

export default SettingLayout;
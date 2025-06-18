import React from "react";
import {PublicNavBar} from "@/components/layout/public-nav-bar";
import {PublicFooter} from "@/components/layout/public-footer";


const RootLayout = async ({
                              children,
                          }: Readonly<{
    children: React.ReactNode;
}>) => {


    return (


        <section className="font-body text-gray-800">
            <PublicNavBar/>
            {children}
            <PublicFooter/>
        </section>

    );
}
export default RootLayout;
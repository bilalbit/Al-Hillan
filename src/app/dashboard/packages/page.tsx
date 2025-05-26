import React from 'react';
import {PackagesList} from "@/features/packages/components/packages-list";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {AddPackageDialog} from "@/features/packages/components/add-package-dialog";

const PackagesPage = () => {
    return (
        <>
           <AddPackageDialog />
            <PackagesList/>
        </>
    )
}

export default PackagesPage;
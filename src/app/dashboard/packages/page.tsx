import React from 'react';
import {PackagesList} from "@/features/packages/components/packages-list";
import {AddOrEditPackageDialog} from "@/features/packages/components/add-or-edit-package-dialog";

const PackagesPage = () => {
    return (
        <>
           <AddOrEditPackageDialog form_type="add" />
            <PackagesList/>
        </>
    )
}

export default PackagesPage;
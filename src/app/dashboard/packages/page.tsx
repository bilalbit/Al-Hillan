import React from 'react';
import {PackagesList} from "@/features/packages/components/packages-list";
import {AddOrEditPackageDialog} from "@/features/packages/components/add-or-edit-package-dialog";
import {filterQueryType} from "@/lib/cache/types";

const PackagesPage = async ({searchParams}: { searchParams: filterQueryType }) => {
    const query = (await searchParams)

    return (
        <section>
            <AddOrEditPackageDialog form_type="add"/>
            <PackagesList searchParams={query}/>
        </section>
    )
};

export default PackagesPage;
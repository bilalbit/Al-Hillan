import React from 'react';
import {PackageCard} from "@/features/packages/components/package-card";
import {PaginationWithLinks} from "@/components/ui+/pagination-with-links";
import {getAllPackages} from "@/features/packages/server/api";
import {filterQueryType} from "@/lib/cache/types";

export const PackagesList = async ({searchParams}: {searchParams: filterQueryType}) => {
    const {data, total} = await getAllPackages(searchParams);
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {
                    data.length === 0 ? (
                        <p>No Packages Found</p>
                    ): (
                        <div className='grid grid-cols-3 gap-6'>
                            {
                                data.map((packs,index) => (
                                    <PackageCard key={index} packs={packs}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                total > 3 &&
                <PaginationWithLinks pageSizeSelectOptions={{
                    pageSizeSearchParam: "limit",
                    pageSizeOptions: [3, 6, 9, 15, 18]
                }} pageSearchParam="page" page={Number(searchParams?.page || 1)} limit={Number(searchParams?.limit || 3)} totalCount={total}/>
            }
        </section>

    );
};

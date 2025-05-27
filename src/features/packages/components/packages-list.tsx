import React from 'react';
import {PackageCard} from "@/features/packages/components/package-card";
import {PaginationWithLinks} from "@/components/ui+/pagination-with-links";
const packages = [
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900 ",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    },
    {
        id: "0d854f16-bad4-46ff-a406-62ce89774900",
        course_type: "0d854f16-bad4-46ff-a406-62ce89774900",
        year_price: 999,
        half_year_price: 4999,
        month_price: 999,
    }
]
const sliced_packages = packages.slice(0,6);

export const PackagesList = () => {
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {
                    sliced_packages.length === 0 ? (
                        <p>No Packages Found</p>
                    ): (
                        <div className='grid grid-cols-3 gap-6'>
                            {
                                sliced_packages.map((packs,index) => (
                                    <PackageCard key={index} packs={packs}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                packages.length > 6 &&
                <PaginationWithLinks page={1} limit={5} totalCount={packages.length}/>
            }
        </section>

    );
};

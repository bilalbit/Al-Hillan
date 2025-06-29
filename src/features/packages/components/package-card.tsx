import React from 'react';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {AddOrEditPackageDialog} from "@/features/packages/components/add-or-edit-package-dialog";

import {cn} from "@/lib/utils";
import {PackagesType} from "@/features/packages/schemas";

export const PackageCard = ({packs, className = ""}: {
    packs: Omit<PackagesType, "id"> & { id: string ,course_title:string},
    className?: string
}) => {
    return (
        <Card className={cn("w-[380px] relative", className)}>
            <CardHeader>
                <CardTitle>አሰላሙዐለይኩም ወራህመቱሏሂ ወበረካቱሁ</CardTitle>
                <CardDescription>የምንሰጣቸው አስተምህሮቶች እና ዋጋ.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                        <div className="space-y-3">
                            <p className="font-bold leading-none">
                                {/*GET COURSE NAME*/}
                                {packs.course_title}
                                {/*ለ{packs.course_type}*/}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                የ 1 ዓመት ፓኬጅ በ <b>{packs.year_price}</b> ብር
                            </p>
                            <p className="text-sm text-muted-foreground">
                                የ 6 ወር ፓኬጅ በ <b>{packs.half_year_price}</b> ብር
                            </p>
                            <p className="text-sm text-muted-foreground">
                                ወርሃዊ ክፍያ በ <b>{packs.month_price}</b> ብር
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <AddOrEditPackageDialog defaultValues={packs} form_type='edit'/>
            </CardFooter>
        </Card>

    );
};



// import React from 'react';
//
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
// import {AddOrEditPackageDialog} from "@/features/packages/components/add-or-edit-package-dialog";
//
// import {cn} from "@/lib/utils";
// import {PackagesType} from "@/features/packages/schemas";
// import {DeleteDialog} from "@/components/ui+/delete-Dialog";
//
// export const PackageCard = ({packs, className = ""}: {
//     packs: Omit<PackagesType, "id"> & { id: string },
//     className?: string
// }) => {
//
//     return (
//         <Card className={cn("w-[380px] relative", className)}>
//             <DeleteDialog name={"ለቃዒዳ"} label="package" id={packs.id}/>
//             <CardHeader>
//                 <CardTitle>አሰላሙዐለይኩም ወራህመቱሏሂ ወበረካቱሁ</CardTitle>
//                 <CardDescription>የምንሰጣቸው አስተምህሮቶች እና ዋጋ.</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//                 <div>
//                     <div
//                         className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
//                     >
//                         <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
//                         <div className="space-y-3">
//                             <p className="font-bold leading-none">
//                                 {/*GET COURSE NAME*/}
//                                 ለ ለቃዒዳ
//                                 {/*ለ{packs.course_type}*/}
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                                 የ 1 ዓመት ፓኬጅ በ <b>{packs.year_price}</b> ብር
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                                 የ 6 ወር ፓኬጅ በ <b>{packs.half_year_price}</b> ብር
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                                 ወርሃዊ ክፍያ በ <b>{packs.month_price}</b> ብር
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <AddOrEditPackageDialog defaultValues={packs} form_type='edit'/>
//             </CardFooter>
//         </Card>
//
//     );
// };

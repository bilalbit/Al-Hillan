import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Edit} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {cn} from "@/lib/utils";
import Link from 'next/link';
import {DeletePackageDialog} from "@/features/packages/components/delete-package-dialog";
import {PackagesType} from "@/features/packages/types";

export const PackageCard = ({packs, className = ""}: { packs: PackagesType, className?: string }) => {

    return (
        <Card className={cn("w-[380px] relative", className)}>
            <DeletePackageDialog />
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
                                ለ{packs.course_type}
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
                <Link href={`/dashboard/packages/${packs.id}`} className='w-full'>
                    <Button className="w-full">
                        <Edit/> Edit Package
                    </Button>
                </Link>
            </CardFooter>
        </Card>

    );
};

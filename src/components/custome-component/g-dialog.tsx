import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

type GDialogType = {
    triggerChild: React.ReactNode;
    heading?: {
        title?: string;
        description?: string;
    };
    children: React.ReactNode;
    footer?: React.ReactNode;

}
const GDialog = ({triggerChild, heading,children,footer}: GDialogType) => {
    return (
        <Dialog>
            <DialogTrigger>
                    {triggerChild}
            </DialogTrigger>
            <DialogContent>
                {
                    heading?.title && <DialogTitle>{heading.title}</DialogTitle>
                }
                {
                    heading?.description && <DialogDescription>{heading.description}</DialogDescription>
                }
                {children}
                {
                    footer && <DialogFooter>{footer}</DialogFooter>
                }
            </DialogContent>
        </Dialog>
    );
};

export default GDialog;
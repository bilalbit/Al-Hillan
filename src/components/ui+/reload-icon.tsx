'use client';
import React from "react";
import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";

export const ReloadIcon = ({action}: { action: () => Promise<void> }) => {

    const [isRotating, setIsRotating] = React.useState(false);

    const handleClick = async () => {
        setIsRotating(true);
        // Reset table state (e.g., filters, sorting, pagination)
        await action()
        setTimeout(() => setIsRotating(false), 500); // Animation duration
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="ml-2 p-2"
        >
            <RotateCcw
                aria-hidden="true"
                className={`size-5 text-muted-foreground ${isRotating ? "animate-spin-once" : ""}`}
            />
        </Button>
    );
};
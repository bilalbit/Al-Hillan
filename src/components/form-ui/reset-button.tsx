import React from "react";
import {Button} from "../ui/button";
import {useFormContext} from ".";

type SubmitButtonProps = {
    className?: string
};

export const ResetButton = ({className}: SubmitButtonProps) => {
    const form = useFormContext();



    return (
        <Button type="button" onClick={()=>form.reset()} aria-autocomplete="inline" className={className || ""}>
            Reset
        </Button>
    );
};
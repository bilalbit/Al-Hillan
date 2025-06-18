import React from "react";
import {useFieldContext} from ".";


export const HiddenInput = () => {
    const field = useFieldContext<string>();

    return (
        <input
            id={field.name}
            name={field.name}
            value={field.state.value}
            type="hidden"
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            className="hidden"
        />
    );
};
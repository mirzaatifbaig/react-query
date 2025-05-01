import React from "react";
import {NavLink} from "react-router-dom";
import {cn} from "@/lib/utils";

const StyledLink = ({to, children}) => {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                    isActive ? "bg-muted text-primary" : "text-muted-foreground",
                )
            }
        >
            {children}
        </NavLink>
    );
};

export default StyledLink;

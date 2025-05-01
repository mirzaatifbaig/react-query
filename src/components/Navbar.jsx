import React from "react";
import {Home} from "lucide-react";
import StyledLink from "./StyledLink";

const Navbar = () => {
    return (
        <nav
            className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 border-b bg-background z-50">
            <div className="flex items-center space-x-2">
                <StyledLink to={"/"}>
                    <Home className="h-6 w-6 text-primary"/>
                </StyledLink>
                <span className="text-lg font-semibold m-4">My App</span>
            </div>
            <div className="flex items-center space-x-2">
                <StyledLink to="/create">Create New</StyledLink>
                <StyledLink to="/post">Post By Id</StyledLink>
            </div>
        </nav>
    );
};

export default Navbar;

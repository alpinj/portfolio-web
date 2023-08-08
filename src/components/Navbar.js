import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="h-20 inline-flex justify-between items-center bg-black text-white w-full px-40 text-xl font-medium">
            <div>
                <NavLink className="font-bold" to="/" exact>
                    alpinj
                </NavLink>
            </div>
            <nav className="inline-flex gap-x-6">
                <NavLink to="/" exact>
                    home
                </NavLink>   
                <NavLink to="/design/">
                    design
                </NavLink>
                <NavLink >
                    about
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
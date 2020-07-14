import React from "react";
import {Helmet} from "react-helmet";

function Header() {
    return (
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css?family=Work+Sans:800|Poppins&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.jsdelivr.net/gh/akzhy/trunk/dist/trunk.min.css"
            />
        </Helmet>
    );
}

export default Header

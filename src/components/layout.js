import React from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ placeholder, children }) => {
    return (
        <React.Fragment>
            <Header />
            <Navbar
                placeholder={placeholder === undefined ? true : placeholder}
            />
            <div className="wrapper">{children}</div>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;

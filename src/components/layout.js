import React from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import CookieConsent from "react-cookie-consent"
import { Link } from "gatsby"

const Layout = ({ placeholder, children }) => {
    return (
        <React.Fragment>
            <Header />
            <Navbar
                placeholder={placeholder === undefined ? true : placeholder}
            />
            <div className="wrapper">{children}</div>
            <Footer/>
            <CookieConsent acceptOnScroll={true} buttonClasses="btn" buttonText="I understand">
                This website uses anonymous cookies to enhance the user experience and for analytics. Please
                read the
                <span>
                    <Link className="span-link"
                        to="/privacy-policy"
                    > privacy policy </Link>
                </span>
                for details.
            </CookieConsent>
        </React.Fragment>
    );
};

export default Layout;

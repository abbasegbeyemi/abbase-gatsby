import React from "react";
import {useStaticQuery, Link, graphql} from "gatsby";
import Logo from "./logo";
import SocialLinks from "./sociallinks";
import "../style/footer.sass"

const Footer = () => {
    const query = useStaticQuery(graphql`
        query {
            site{
                siteMetadata {
                    title
                }
            }
        }`)

    return (
        <footer className="footer">
            <div className="container">
                <Link to="/" title={query.site.siteMetadata.title}>
                    <Logo/>
                </Link>
                <div className="social-buttons">
                    <SocialLinks/>
                </div>
                <p className="text-primary f-d">
                    &copy;{new Date().getFullYear()}{" "}
                    {query.site.siteMetadata.title}.{" "}
                    All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
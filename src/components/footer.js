import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Logo from "./logo"
import SocialLinks from "./sociallinks"
import "../style/footer.scss"

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
        <p>
          &copy;{new Date().getFullYear()}{" "}
          {query.site.siteMetadata.title}.{" "}
          All rights reserved. {" "}
          <span>
            <Link to="/privacy-policy">
                Privacy Policy.
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
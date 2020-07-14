import React from "react"
import SectionTitle from "../components/sectiontitle";
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Link} from "gatsby";

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found"/>
        <section id="404" className="container" style={{minHeight: "700px"}}>
            <div className="section-title">
                <SectionTitle title="404"/>
                <p className="text-primary">The dark lands... we don't go here. Let's head back to
                    {" "}<Link style={{textDecoration: "underline wavy green"}} to="/">civilization.</Link>
                </p>
            </div>
        </section>
    </Layout>
)

export default NotFoundPage

import React from "react"
import Contact from "../components/contact";
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => {

    return (
        <Layout>
            <SEO title="Contact"/>
            <div style={{minHeight: "100vh"}}>
                <Contact/>
            </div>
        </Layout>
    )
}

export default ContactPage
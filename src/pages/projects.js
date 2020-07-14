import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import "../style/aboutpage.sass"
import ProjectsListed from "../components/projects-listed";


export default () => {
    return (
        <Layout>
            <SEO
                lang="en"
                title="Projects"
                description="Portfolio of projects by Dr. Abbas Egbeyemi."/>
            <ProjectsListed/>
        </Layout>
    )
}
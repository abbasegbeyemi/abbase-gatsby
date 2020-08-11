import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import ProjectsListed from "../components/projects-listed";


export default () => {
    return (
        <Layout placeholder={false}>
            <SEO
                lang="en"
                title="Projects"
                description="Portfolio of projects by Dr. Abbas Egbeyemi."/>
            <ProjectsListed/>
        </Layout>
    )
}
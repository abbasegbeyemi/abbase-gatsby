import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import "../style/project-single-page.sass"

export default ({children, pageContext}) => {
    return (
        <Layout>
            <SEO lang="en"
                 title={pageContext.frontmatter.title}
                 description={pageContext.frontmatter.description}/>
            <div className="container">
                <article className="single-project">
                    <div className="content row flex">
                        <div className="col s12">
                            {children}
                        </div>
                    </div>
                </article>
            </div>
        </Layout>
    )
}



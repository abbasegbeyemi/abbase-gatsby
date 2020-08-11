import React from "react";
import Layout from "../components/layout"
import SEO from "../components/seo";
import SectionTitle from "../components/sectiontitle";
import {graphql} from "gatsby"
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from "gatsby-plugin-mdx"


export default ({data}) => {
    const essay_info = data.mdx.frontmatter
    return (
        <Layout>
            <SEO
                lang="en"
                title={essay_info.title}
                description={essay_info.description}/>
            <section id="privacy-policy" className="container about">
                <div className="section-title">
                    <SectionTitle title={essay_info.title}/>
                </div>
                <div className="col s12 m11 l10">
                    <MDXProvider>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    {
        mdx(fileAbsolutePath: {regex: "/privacy-policy/"}) {
            id
            frontmatter {
                title
                description
            }
            body
        }
    }
`
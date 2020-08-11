import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SectionTitle from "../components/sectiontitle"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"


export default ({ data }) => {
  const essay_info = data.mdx.frontmatter
  return (
    <Layout>
      <SEO
        lang="en"
        title={essay_info.title}
        description={essay_info.description}/>
      <section id="about" className="container about">
        <div className="section-title">
          <SectionTitle title={essay_info.title}/>
        </div>
          <MDXProvider>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </MDXProvider>
          <div className="content-bg">
            <a href={essay_info.cv.publicURL} rel="noopener noreferrer" target="_blank">
              Download my CV
            </a>
          </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
    {
        mdx(fileAbsolutePath: {regex: "/about/"}) {
            id
            frontmatter {
                title
                description
                cv{
                    publicURL
                }
            }
            body
        }
    }
`
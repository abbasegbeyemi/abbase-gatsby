import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../style/project-single-page.scss"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import SectionTitle from "../components/sectiontitle"
import ImageGallery from "react-image-gallery"


export default ({ data }) => {
  const projectData = data.mdx
  const images = data.allFile.edges.map(({ node }) =>
    ({
      "thumbnail": node.childImageSharp.thumbnail.src,
      "original": node.childImageSharp.original.src,
      "imageSet": [
        {
          "srcSet": node.childImageSharp.original.srcSet,
          "media": "(max-width: 2400)"
        }
      ]
    })
  )
  return (
    <Layout>
      <SEO lang="en"
           title={projectData.frontmatter.title}
           description={projectData.frontmatter.description}/>

      <section className="container">
        <div className="section-title">
          <SectionTitle title={projectData.frontmatter.title}/>
        </div>
        {
          images && (
            <div className="content image">
              <ImageGallery items={images}
                            showBullets={true}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showThumbnails={false}
              />
            </div>
          )
        }
        <article className="single-project">
          <div className="content-bg">
            <div>
              {
                projectData.frontmatter.techTags && (
                  <p className="text-secondary">
                    Tech Tags: {projectData.frontmatter.techTags}
                  </p>)
              }
              <MDXProvider>
                <MDXRenderer>{projectData.body}</MDXRenderer>
              </MDXProvider>
            </div>
          </div>
        </article>
      </section>
    </Layout>
  )
}

export const query = graphql`
    query ($id: String!, $imagesFolder: String!) {
        mdx(id: {eq: $id}) {
            id
            body
            frontmatter {
                techTags
                title
                description
                image {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        allFile(filter: {absolutePath: {regex: $imagesFolder}, ext: {eq: ".png"}}) {
            edges {
                node {
                    id
                    absolutePath
                    childImageSharp {
                        thumbnail: fluid(maxWidth: 270, maxHeight: 270) {
                            src
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                        original: fluid(maxWidth: 2400) {
                            src
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }`



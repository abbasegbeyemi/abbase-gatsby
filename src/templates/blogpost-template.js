import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import "../style/blog-post.scss"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "../components/code-block"
import BackgroundImage from "gatsby-background-image"
import Share from "../components/share-buttons"


export default ({ data }) => {
  const {
    post: {
      body,
      timeToRead,
      frontmatter: { title, tags, image, date, description, credits },
      fields: { slug }
    },
    site: {
      siteMetadata: { siteUrl, author }
    }
  } = data


  const components = {
    code: props => <CodeBlock {...props}/>,
    a: props => {
      const { children } = props
      return (
        <a target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      )
    },
    inlineCode: props => <code {...props}/>
  }

  return (
    <Layout>
      <SEO lang="en"
           title={title}
           description={description}/>
      <BackgroundImage
        className="head-bg"
        fluid={image.childImageSharp.fluid}
        backgroundColor={`#040e18`}>
        <div className="head">
          <h2>
            {title}
          </h2>
          <p className="post-date">
            {date} {" | "}
            {timeToRead} {" minute read."}
          </p>
        </div>
      </BackgroundImage>
      <div className="container">
        <article>
          <div className="content">
              <MDXProvider components={components}>
                <MDXRenderer>
                  {body}
                </MDXRenderer>
              </MDXProvider>
            </div>
        </article>
        <Share
          socialConfig={{
            twitterHandle: author,
            config: {
              siteUrl: `${siteUrl}${slug}`,
              title
            }
          }}
          tags={tags}/>
        {
          credits
          &&
          (
            <div className="credits-bg">
              <p>Credits</p>
              <CreditField credits={credits}/>
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export const CreditField = ({ credits }) => {
  const creditsList = credits.map(({ asset, name, url }, i) => (
    <li key={`${name}-${i}`}>
      <a target="_blank" rel="noreferrer noopener" href={url}>
        {asset} by {name}
      </a>
    </li>
  ))
  console.log(creditsList)
  return (
    <ul className="text-secondary">{creditsList}</ul>
  )
}

export const query = graphql`
    query ($id: String!) {
        site {
            siteMetadata {
                siteUrl
                author
            }
        }
        post: mdx(id: {eq: $id}) {
            id
            timeToRead
            body
            fields {
                slug
            }
            frontmatter {
                credits {
                    asset
                    name
                    url
                }
                tags
                description
                title
                date(formatString: "DD/MM/YYYY")
                image {
                    childImageSharp {
                        fluid(quality: 100, maxWidth: 1920) {
                            base64
                            tracedSVG
                            srcWebp
                            srcSetWebp
                            originalImg
                            originalName
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }`



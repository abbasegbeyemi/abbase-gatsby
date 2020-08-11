/* ==============================
[ This component serves to create the graphql query, and populate the project items component
 with all the data. Basically continued here for easier readibility] */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProjectItems from "./project-items"
import SectionTitle from "./sectiontitle"

const ProjectsListed = ({limit}) => {
  const query = useStaticQuery(graphql`
      query ProjectsListQuery {
          allMdx(sort: {fields: frontmatter___sn, order: ASC}, filter: {fileAbsolutePath: {regex: "/projects/"}}) {
              edges {
                  node {
                      id
                      fields {
                          slug
                      }
                      frontmatter {
                          title
                          description
                          techTags
                          image {
                              publicURL
                              childImageSharp {
                                  fluid(maxWidth: 1920) {
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
              }
          }
      }
  `)

  return (
    <section id="projects" className="container">
      <div className="section-title">
        <SectionTitle title="Projects"/>
      </div>
      <ProjectItems data={query} limit={limit}/>
    </section>
  )
}

export default ProjectsListed
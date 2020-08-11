import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "../style/project-items.scss"

const ProjectItem = ({data}) => {

  const {
    node: {
      fields: { slug },
      frontmatter: {
        title,
        description,
        techTags,
        image
      }
    }
  } = data || {}

  return (
    <div className="item s12">
      <div className="flex">
        <div className="m6 image">
          {
            image &&
            (
              <Img fluid={image.childImageSharp.fluid}/>
            )
          }
          <Link to={slug}
                title={title}
                aria-label={title}
                className="overlay-link"
                style={{ opacity: 0 }}>
            {title}
          </Link>
        </div>
        <div className="m6 content content-bg">
          <h2 className="text-primary pseudo-divider">
            <Link to={slug}
                  title={title}
                  aria-label={title}>
              {title}
            </Link>
          </h2>
          {
            techTags && (
              <p className="text-secondary">
                Tech Tags: {techTags}
              </p>)
          }
          <p className="text-tertiary">
            {description}
          </p>
          <div className="more-link">
            <Link to={slug}
                  title={title}
                  aria-label={title}
                  className="btn hover-btn">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectItems = ({ data, limit }) => {
  const { allMdx: { edges } } = data
  const lim = limit == null ? edges.length : limit

  const items = edges.slice(0, lim).map(e => (
      <ProjectItem key={e.node.id} data={e}/>
    )
  )
  return <div className="row">{items}</div>
}

export default ProjectItems




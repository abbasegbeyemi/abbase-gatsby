import React from "react";
import {Link} from "gatsby";
import Img from "gatsby-image"
import "../style/project-items.sass"

const ProjectItem = (props) => {
    return (
        <div className="item s12">
            <div className="flex">
                <div className="m6 image">
                    <Img fluid={props.data.node.frontmatter.image.childImageSharp.fluid}/>
                    <Link to={`projects/${props.data.node.frontmatter.slug}`}
                          title={props.data.node.frontmatter.title}
                          aria-label={props.data.node.frontmatter.title}
                          className="overlay-link"
                          style={{opacity: 0}}>
                        {props.data.node.frontmatter.title}
                    </Link>
                </div>
                <div className="m6 content content-bg">
                    <h2 className="text-primary pseudo-divider">
                        <Link to={`projects/${props.data.node.frontmatter.slug}`}
                              title={props.data.node.frontmatter.title}
                              aria-label={props.data.node.frontmatter.title}>
                            {props.data.node.frontmatter.title}
                        </Link>
                    </h2>
                    <p className="text-tertiary">
                        {props.data.node.frontmatter.description}
                    </p>
                    <div className="more-link">
                        <Link to={`projects/${props.data.node.frontmatter.slug}`}
                          title={props.data.node.frontmatter.title}
                          aria-label={props.data.node.frontmatter.title}
                          className="btn hover-btn">
                        Read more
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProjectItems = (props) => {
    const data = props.data.allMdx.edges;
    const items = data.map((e, i) => (
            <ProjectItem key={e.node.id} data={e}/>
        )
    )
    return <div className="row">{items}</div>
}

export default ProjectItems




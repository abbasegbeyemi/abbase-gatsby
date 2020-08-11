import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BlogItems from "./blogpost-item";
import SectionTitle from "./sectiontitle";

export default function() {
    const query = useStaticQuery(graphql`
        query blogList {
            allMdx(
                filter: { fileAbsolutePath: { regex: "/blog/" } }
                limit: 6
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            description
                            date
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    if (query.allMdx.edges.length > 0) {
        return (
            <section id="blog" className="container">
                <div className="section-title">
                    <SectionTitle title="BLOG" />
                </div>
                <BlogItems data={query} />
            </section>
        );
    } else {
        return <React.Fragment/>;
    }
}
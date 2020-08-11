import React from "react";
import {useStaticQuery, graphql} from "gatsby";
import LD from "../../static/images/linkedin.svg"
import TW from "../../static/images/twitter.svg"
import GH from "../../static/images/github.svg"

const ListItem = props => {
    const data = props.data;
    return (
        <li>
            <a href={data.url} title={data.name} target="_blank"
               rel="noopener noreferrer">
                {props.children}
            </a>
        </li>
    );
}

const SocialLinks = () => {
    const data = useStaticQuery(graphql`
        query SocialQuery {
            site {
                siteMetadata {
                    social {
                        icon
                        name
                        url
                    }
                }
            }
        }`)
    const components = {'Linkedin': <LD/>, 'Github': <GH/>, 'Twitter': <TW/>}
    const items = data.site.siteMetadata.social;
    const linksList = items.map((e, i) => (
        <ListItem key={`${e.url}-${e.icon}-${i}`} data={e}>
            {components[e.name]}
        </ListItem>
    ))
    return (
        <ul className="social-links">{linksList}</ul>
    )
}

export default SocialLinks
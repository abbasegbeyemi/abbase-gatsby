import React from "react"
import Layout from "../components/layout"
import {graphql} from "gatsby";
import SEO from "../components/seo"
import SocialLinks from "../components/sociallinks";
import ProjectsListed from "../components/projects-listed";
import Contact from "../components/contact"
import "../style/wall.sass"
import AnchorLink from "react-anchor-link-smooth-scroll";


class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            winHeight: "100vh"
        };
    }

    createSVGElement(n, v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n)
        for (let p in v) {
            n.setAttributeNS(null, p, v[p]);
            return n
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setWindowHeight);
    }

    componentDidMount() {
        this.setWindowHeight();

        window.addEventListener("resize", this.setWindowHeight);

        let sWidth = this.svg.clientWidth,
            tText = this.svg.querySelector("text"),
            tWidth = tText.getBoundingClientRect().width;

        if (tWidth > sWidth) {
            let tInnerText = tText.innerHTML;
            if (tInnerText.split(" ").length > 1) {
                tText.innerHTML = "";
                tInnerText.split(" ").forEach((e, i) => {
                    let tSpan = this.createSVGElement("tspan", {
                        dy: i === 0 ? "0em" : ".8em",
                        x: "50"
                    });
                    tSpan.innerHTML = e;
                    tText.appendChild(tSpan);
                });
                setTimeout(() => {
                    this.svg.style.height =
                        tText.getBoundingClientRect().height + 70;
                    this.svg.style.margin = "15px auto";
                }, 250);
            } else {
                while (tWidth < sWidth) {
                    let fontSize = parseInt(
                        window.getComputedStyle(tText, null)
                            .getPropertyValue("font-size")
                    );
                    tText.style.fontSize = fontSize - 1 + "px";
                    tWidth = tText.getBoundingClientRect().width;
                }
            }
        }
    }

    setWindowHeight = () => {
        this.setState({
            winHeight: window.innerHeight
        });
    }

    render() {
        return (
            <Layout placeholder={false}>
                <SEO title="Home" lang="en"/>
                <div className="wall" style={{height: `${this.state.winHeight}px`}}>
                    <div className="intro container">
                        <div className="main-title text-primary">
                            <svg
                                width="90%"
                                height="180px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid slice"
                                ref={c => (this.svg = c)}>
                                <pattern
                                    id="wallPattern"
                                    patternUnits="userSpaceOnUse"
                                    width="100"
                                    height="100"
                                >
                                    <rect
                                        x="0"
                                        y="0"
                                        className="fill-primary"
                                        width="100"
                                        height="100"
                                    />
                                    <image
                                        xlinkHref="/images/wall_dark.jpg"
                                        height="100"
                                        width="100"
                                        y="0"
                                        preserveAspectRatio="none"/>
                                </pattern>
                                <text
                                    fill="url(#wallPattern)"
                                    textAnchor="middle"
                                    x="50"
                                    y="50">
                                    {this.props.data.site.siteMetadata.title}
                                </text
                                >
                            </svg>
                        </div>
                        <p className="tag-line text-secondary">
                            {this.props.data.site.siteMetadata.introTag}
                        </p>

                        <AnchorLink href="#projects" className="btn hover-btn">
                            View Projects
                        </AnchorLink>
                    </div>
                    <div className="social-buttons">
                        <SocialLinks/>
                    </div>
                </div>
                <ProjectsListed id="projects"/>
                <Contact/>
            </Layout>
        )
    }
}


export default IndexPage

export const query = graphql`
    query  SiteInfoQuery{
        site {
            siteMetadata {
                title
                description
                introTag
                social {
                    name
                    url
                    icon
                }
            }
        }
    }
`;

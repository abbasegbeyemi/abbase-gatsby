import React from "react";
import {useStaticQuery, graphql, Link} from "gatsby";
import {Sun, Moon} from "./icons";

const ListItem = props => {
    const data = props.data
    return (
        <li>
            <Link to={data.url} activeClassName="activeLink">
                <span>{data.name}</span>
            </Link>
        </li>
    )
}

class ThemeSwitcherButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: this.props.darkMode
        }
    }

    componentDidMount() {
        const _this = this
        let darkMode = localStorage.getItem("darkMode");

        document.body.className = _this.state.darkMode ? "darkMode" : "";
        if (darkMode) {
            this.setState(
                {
                    darkMode: darkMode === "true"
                },
                () => {
                    document.body.className = _this.state.darkMode ? "darkMode" : "";
                }
            );
        }

        this.switchBtn.addEventListener("click", () => {
            _this.setState({
                darkMode: !_this.state.darkMode
            });
            localStorage.setItem("darkMode", _this.state.darkMode)
            document.body.className = _this.state.darkMode ? "darkMode" : "";
        });
    }

    render() {
        return (
            <React.Fragment>
                <li className="switch-theme">
                    <div className="switch-button"
                         ref={c => (this.switchBtn = c)}>
                        <div title="Switch to Dark Mode"
                             data-switch-to="dark"
                             className={!this.state.darkMode ? "active" : ""}>
                            <Sun/>
                        </div>
                        <div title="Switch to Light Mode"
                             data-switch-to="light"
                             className={this.state.darkMode ? "active" : ""}>
                            <Moon/>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        )
    }
}

const NavLinks = () => {
    const data = useStaticQuery(graphql`
        query NavBarLinksQuery {
            site {
                siteMetadata {
                    navLinks {
                        name
                        url
                    }
                    darkMode
                    switchTheme
                }
            }
        }
    `);
    const items = data.site.siteMetadata.navLinks
    const navBarItems = items.map((e, i) => (
        <ListItem key={`${e.url}-${i}`} data={e}/>
    ))
    if (data.site.siteMetadata.switchTheme) {
        navBarItems.push(
            <ThemeSwitcherButton key="themeSwitcher" darkMode={data.site.siteMetadata.darkMode}/>
        )
    }
    return <ul className="navbar-links">{navBarItems}</ul>
}

export default NavLinks
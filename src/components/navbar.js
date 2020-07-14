import React from "react";
import Sidebar from "react-sidebar"
import {Link} from "gatsby"
import NavLinks from "./navlinks";
import SocialLinks from "./sociallinks";
import Logo from "./logo"
import {Hamburger} from "./icons";
import "../style/navbar.sass"

const SidebarContents = () => {
    return (
        <div className="sidebar-contents">
            <div className="logo">
                <Link to="/">
                    <Logo/>
                </Link>
            </div>
            <div className="links text-secondary">
                <NavLinks/>
            </div>
            <div className="social-buttons">
                <SocialLinks/>
            </div>
        </div>
    );
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarPlaceholderHeight: 100,
            sidebarOpen: false
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.menuOpen = this.menuOpen.bind(this)
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open})
    }

    menuOpen(event) {
        event.preventDefault();
        this.onSetSidebarOpen(true)
    }

    changeNavbarHeight() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                document.querySelector("nav").classList.add("scrolled")
            } else {
                document.querySelector("nav").classList.remove("scrolled")
            }
        })
    }

    changeNavbarPlaceholderHeight() {
        let navBar = document.querySelector("nav");
        let navBarPlaceholderHeight = navBar.offsetHeight
        this.setState({
            navBarPlaceholderHeight: navBarPlaceholderHeight
        })
    }

    componentDidMount() {
        this.changeNavbarPlaceholderHeight()
        let logo = this.nav.querySelector(".logo"),
            _this = this

        logo.addEventListener("load", () => {
            _this.changeNavbarPlaceholderHeight();
        })

        _this.changeNavbarHeight();
    }

    render() {
        const placeholder = this.props.placeholder
        return (
            <React.Fragment>
                <Sidebar sidebar={<SidebarContents/>}
                         open={this.state.sidebarOpen}
                         onSetOpen={this.onSetSidebarOpen}
                         sidebarClassName="sidebar-content"
                         styles={{
                             sidebar: {
                                 zIndex: 101,
                                 position: "fixed"
                             },
                             overlay: {
                                 zIndex: 100
                             },
                             dragHandle: {
                                 position: "fixed",
                                 zIndex: "99999"
                             }
                         }}
                >
                    <span/>
                </Sidebar>
                <nav className="text-secondary" ref={c => (this.nav = c)}>
                    <a href="#mobilenav" id="menu-open" onClick={this.menuOpen}>
                        <span className="icon">
                            <Hamburger/>
                        </span>
                    </a>
                    <Link to="/"
                          className={this.state.sidebarOpen ? 'nologo' : 'logo'}>
                        <Logo/>
                    </Link>
                    <NavLinks/>
                </nav>
                {placeholder && (
                    <div className="navbar-placeholder" style={{
                        height: `${this.state.navBarPlaceholderHeight}px`
                    }}>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default NavBar

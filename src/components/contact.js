import React from "react";
import SectionTitle from "./sectiontitle";
import {StaticQuery, graphql} from "gatsby";
import {PaperPlane, Loading} from "./icons";
import "../style/contact.scss";

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: false,
            canSubmit: false
        };

        this.textAreaInput = this.textAreaInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputs = this.handleInputs.bind(this);

        this.showContactForm = this.props.contact.api_url !== "";

    }

    textAreaInput(event) {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
        this.handleInputs()
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (!this.state.submitDisabled) {
            this.setState({
                submitDisabled: true
            });

            let name = this.dataName.value,
                email = this.dataEmail.value,
                message = this.dataMessage.value,

                form_data = new FormData()
                const info = {
                    'name': name,
                    'email': email,
                    'message': message
                }
                for (let key in info){
                    form_data.append(key, info[key])
                }

            await fetch(this.props.contact.api_url, {
                method: "post",
                body: form_data,
            })
                .then((res) => res.json())
                .then(
                    result => {
                        this.setState({
                            submitDisabled: false,
                            canSubmit: false
                        });
                        this.resMessage.style.opacity = 1;
                        if (result.response === 'error') {
                            this.resMessage.innerHTML =
                                "Unable to send the message. Please try my other social links below.";
                            this.resMessage.classList.add("color-error");
                        } else {
                            this.resMessage.innerHTML =
                                "Message sent successfully - thank you. I will get back to you shortly.";
                            this.resMessage.classList.add("color-success");
                        }
                        this.dataName.value = "";
                        this.dataEmail.value = "";
                        this.dataMessage.value = "";
                        let _this = this;
                        setTimeout(function () {
                            _this.resMessage.style.opacity = 0;
                        }, 5000);
                    }
                );
        }
    }

    componentDidMount() {
        if (this.showContactForm) {
            let color = window
                .getComputedStyle(this.btn, null)
                .getPropertyValue("color");
            this.btn.querySelector("path").setAttribute("fill", color);
        }

        let li = this.contactArea.querySelectorAll(".item");

        li.forEach(function (e, i) {
            let p = e.querySelector("path");
            if (p)
                p.setAttribute(
                    "fill",
                    window.getComputedStyle(e, null).getPropertyValue("color")
                );
        });
    }
    handleInputs(){
        let name = this.dataName.value.trim(),
            email = this.dataEmail.value.trim(),
            message = this.dataMessage.value.trim()
        const validEmail = validateEmail(email)
        if (name !== "" && validEmail && message !== ""){
            this.setState({canSubmit: true})
        } else {
            this.setState({canSubmit: false})
        }
    }
    render() {
        return (
            <section id="contact" className="container">
                <div className="section-title">
                    <SectionTitle title="Contact"/>
                </div>
                <div
                    className={(this.showContactForm ? "" : " no-form")}
                    ref={c => (this.contactArea = c)}
                >
                    {this.showContactForm && (

                        <div className="form-area">
                            <p className="content-bg">
                                Send me a message, or connect with me on social media via the links below.
                            </p>
                            <form style={{marginTop: "20px"}}>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Your Name:
                                        </span>
                                        <div className="input-border">
                                            <input
                                                type="text"
                                                ref={c => (this.dataName = c)}
                                                className="field-box"
                                                name="name"
                                                id="name"
                                                onChange={this.handleInputs}
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Your Email Address:
                                        </span>
                                        <div className="input-border">
                                            <input
                                                type="email"
                                                ref={c => (this.dataEmail = c)}
                                                className="field-box"
                                                name="email"
                                                onChange={this.handleInputs}
                                                id="email"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Your Message:
                                        </span>
                                        <div className="input-border">
                                            <textarea
                                                style={{overflowY: "hidden"}}
                                                ref={c =>
                                                    (this.dataMessage = c)
                                                }
                                                className="field-box"
                                                onChange={this.textAreaInput}
                                                name="message"
                                                id="message"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field submit-zone">
                                    <label className="ib">
                                        <button
                                            disabled={!this.state.canSubmit}
                                            className={
                                                "btn" +
                                                (!this.state.canSubmit || this.state.submitDisabled
                                                    ? " disabled"
                                                    : "")
                                            }
                                            onClick={this.handleSubmit}
                                            id="submit"
                                            ref={c => (this.btn = c)}
                                        >
                                            Send{" "}
                                            <span
                                                className="icon paper-plane"
                                                style={{
                                                    stroke:"white",
                                                    strokeWidth:"1px",
                                                    display: this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <PaperPlane/>
                                            </span>
                                            <span
                                                className="icon loading"
                                                style={{
                                                    display: !this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <Loading/>
                                            </span>
                                        </button>
                                    </label>
                                    <div>
                                        <p
                                            className="res-message"
                                            ref={c => (this.resMessage = c)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {/*<div*/}
                    {/*    className={*/}
                    {/*        this.showContactForm*/}
                    {/*            ? "col s12 m6 details"*/}
                    {/*            : "col s12 details"*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    {this.props.contact.description && (*/}
                    {/*        <p className="text-tertiary">*/}
                    {/*            {this.props.contact.description}*/}
                    {/*        </p>*/}
                    {/*    )}*/}
                    {/*    <ul>*/}
                    {/*        {this.props.contact.mail && (*/}
                    {/*            <li className="text-secondary item">*/}
                    {/*                <span className="icon">*/}
                    {/*                    <Envelope/>*/}
                    {/*                </span>*/}
                    {/*                <a*/}
                    {/*                    href={*/}
                    {/*                        "mailto:" + this.props.contact.mail*/}
                    {/*                    }*/}
                    {/*                >*/}
                    {/*                    {this.props.contact.mail}*/}
                    {/*                </a>*/}
                    {/*            </li>*/}
                    {/*        )}*/}
                    {/*        <li className="social-buttons">*/}
                    {/*            <SocialLinks/>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </section>
        );
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default () => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        contact {
                            api_url
                            description
                            mail
                        }
                    }
                }
            }
        `}
        render={data => <Contact contact={data.site.siteMetadata.contact}/>}
    />
);
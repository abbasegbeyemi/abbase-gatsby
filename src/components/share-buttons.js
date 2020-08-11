import React from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export default ({ socialConfig, tags }) => (
  <div className="post-social">
    <span>Share this post: </span>
    <LinkedinShareButton url={socialConfig.config.siteUrl} className="button hover-btn linkedin"
                         title={socialConfig.config.title}>
      <span className="icon">
      	<FontAwesomeIcon icon={['fab', 'linkedin-in']} className="fa-2x"/>
      </span>
    </LinkedinShareButton>

    <TwitterShareButton url={socialConfig.config.siteUrl} className="button hover-btn twitter"
                        title={socialConfig.config.title} via={socialConfig.twitterHandle.split("@").join("")}
                        hashtags={tags}>
      <span className="icon">
      	<FontAwesomeIcon icon={['fab', 'twitter']} className="fa-2x"/>
      </span>
    </TwitterShareButton>
    <FacebookShareButton url={socialConfig.config.siteUrl} className="button hover-btn facebook">
      <span className="icon">
      	<FontAwesomeIcon icon={['fab', 'facebook-f']} className="fa-2x"/>
      </span>
    </FacebookShareButton>
    <WhatsappShareButton url={socialConfig.config.siteUrl} className="button hover-btn whatsapp"
                         title={socialConfig.config.title}>
      <span className="icon">
      	<FontAwesomeIcon icon={['fab', 'whatsapp']} className="fa-2x"/>
      </span>
    </WhatsappShareButton>
  </div>
)
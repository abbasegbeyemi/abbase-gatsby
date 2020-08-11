const siteMetadata = {
  title: `Dr. Abbas Egbeyemi`,
  siteUrl: `https://www.abbasegbeyemi.me`,
  description: `Portfolio website for Dr. Abbas Egbeyemi`,
  introTag: `I build scientific desktop and web applications.`,
  author: `@sheybass`,
  blogPostsPerPage: 10,
  projectItemsPerPage: 10,
  darkMode: true,
  switchTheme: true,
  logo: `/images/logo.svg`,
  navLinks: [
    {
      name: "Home",
      url: "/"
    },
    {
      name: "Projects",
      url: "/projects"
    },
    {
      name: "Blog",
      url: "/blog"
    },
    {
      name: "About",
      url: "/about"
    },
    {
      name: "Contact",
      url: "/contact"
    }
  ],
  social: [
    {
      name: "Linkedin",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/abbasegbeyemi/"
    },
    {
      name: "Twitter",
      icon: "/images/twitter.svg",
      url: "https://twitter.com/sheybass"
    },
    {
      name: "Github",
      icon: "/images/github.svg",
      url: "https://github.com/abbasegbeyemi"
    }
  ],
  contact: {
    api_url: "https://script.google.com/macros/s/AKfycbyI7EfePmWmMvm-K0vtafMAtsrNagzgM0-b-KfHeGhyJ-XBv7k/exec",
    description: `Contact Dr. Abbas Egbeyemi`,
    mail: "abbasegbeyemi@gmail.com"
  }
}

const plugins = [
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-172959603-1"
    }
  },
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/static/images/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/content/`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages/`
    }
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200
          }
        }
      ]
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-styled-components`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Abbas Egbeyemi's Website`,
      short_name: `Dr. Abbas`,
      start_url: `/`,
      background_color: `#029E9E`,
      theme_color: `#029E9E`,
      display: `minimal-ui`,
      icon: `static/images/icon.png` // This path is relative to the root of the site.
    }
  },
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      data: `@import "~react-image-gallery/styles/scss/image-gallery.scss";`
    }
  },
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200,
            backgroundColor: `transparent`
          }
        }
      ]
    }
  },
  {
    resolve: `gatsby-plugin-react-svg`,
    options: {
      rule: {
        include: /images/,
        omitKeys: ["xmlnsDc", "xmlnsCc", "xmlnsRdf", "xmlnsSerif", "xmlnsSvg", "xmlnsSodipodi", "xmlnsInkscape"]
      }
    }
  }
]

module.exports = {
  siteMetadata: siteMetadata,
  plugins: plugins
}


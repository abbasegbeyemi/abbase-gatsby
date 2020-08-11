const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Function to split the path string and use the actual name of the mdx file
const removeSlash = path => (path === "/" ? path : path.replace(/\/$/, ""))
// Detete the automatically created pages, and recreate the page with the preferred path
exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  const oldPage = Object.assign({}, page)
  page.path = removeSlash(page.path)
  if (page.path !== oldPage.path) {
    deletePage(oldPage)
    createPage(page)
  }
}

// Add the slug field to pages that are not in projects
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: removeSlash(slug)
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return graphql(`
        {
        project: allMdx( filter: {fileAbsolutePath: {regex: "/projects/"}} ) {
        edges {
          node {
            frontmatter {
              slug
              template
                }
            fileAbsolutePath
            id
            fields {
                slug
                }
          }
        }
      }
      blog: allMdx( filter: {fileAbsolutePath: {regex: "/blog/"}} ) {
        edges {
          node {
            frontmatter {
              template
                }
            id
            fields {
                slug
                }
          }
        }
      }
      limitPost: site {
        siteMetadata {
            blogPostsPerPage
        }
      }
    }
        `).then(result => {
    const projects = result.data.project.edges
    projects.forEach(({ node }) => {
      let template = node.frontmatter.template === null ?
        "project" :
        node.frontmatter.template
      const folderName = path.dirname(node.fileAbsolutePath)
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/${template}-template.js`),
        context: {
          imagesFolder: `/${folderName}/`,
          id: node.id
        }
      })
    })

    const blogPosts = result.data.blog.edges
    const blogPostsPerPage =
      result.data.limitPost.siteMetadata.blogPostsPerPage

    const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)

    Array.from({ length: numBlogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blogpostslisted-template.js"),
        context: {
          limit: blogPostsPerPage,
          skip: i * blogPostsPerPage,
          numPages: numBlogPages,
          currentPage: i + 1
        }
      })
    })

    blogPosts.forEach(({ node }) => {
      let template = node.frontmatter.template === null ?
        "blogpost" :
        node.frontmatter.template
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/${template}-template.js`),
        context: {
          id: node.id
        }
      })
    })
  })
}
const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require(`path`)

// Function to split the path string and use the actual name of the mdx file
const removeSlash = path => (path === '/' ? path : path.replace(/\/$/, ""))
// Detete the automatically created pages, and recreate the page with the preferred path
exports.onCreatePage = ({page, actions: {createPage, deletePage},}) => {
    const frontmatter = page.context.frontmatter;
    if (frontmatter && frontmatter.type === "project"){
        deletePage(page);
        page.path = frontmatter.slug
        createPage({
            ...page,
            path: `/projects/${page.path}`
        });
    }

    else {
        const oldPage = Object.assign({}, page)
        page.path = removeSlash(page.path)
        if (page.path !== oldPage.path) {
            deletePage(oldPage)
            createPage(page)
        }
    }
}
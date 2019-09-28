const { resolve } = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = resolve(`src/templates/BlogPost.tsx`);

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(
    ({ node: { id, fileAbsolutePath } }) => {
      createPage({
        path: fileAbsolutePath.split('pages/')[1].split('.md')[0],
        component: blogPostTemplate,
        context: {
          id
        }
      });
    }
  );
};

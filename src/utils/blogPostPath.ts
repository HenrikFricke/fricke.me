export function blogPostPath(fileAbsolutePath: string) {
  return fileAbsolutePath.split('pages/')[1].split('.md')[0];
}

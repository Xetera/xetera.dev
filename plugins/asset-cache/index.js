// Before the build runs,
// restore a directory we cached in a previous build.
// Does not do anything if:
//  - the directory already exists locally
//  - the directory has never been cached
export async function onPreBuild({ utils }) {
  await utils.cache.restore('./.astro/cache')
  await utils.cache.restore('./dist/_astro')
}
// After the build is done,
// cache directory for future builds.
// Does not do anything if:
//  - the directory does not exist
export async function onPostBuild({ utils }) {
  await utils.cache.save('./.astro/cache')
  await utils.cache.save('./dist/_astro')
}
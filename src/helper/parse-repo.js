const NEW_ISSUE_REPO_ROOT = `/wei/new-issue`

const generateJSONConfigPaths = (owner, repo, type, hash) => {
  const identifiers = ['master']
  if (hash && hash !== 'master') identifiers.push(hash)

  const jsonConfigs = []
  identifiers.forEach((identifier) => {
    jsonConfigs.push(`/${owner}/${repo}/${identifier}/.new-issue`)
    jsonConfigs.push(`/${owner}/${repo}/${identifier}/.new-issue/${type || 'index'}.json`)
    jsonConfigs.push(`${NEW_ISSUE_REPO_ROOT}/${identifier}/repos/${owner}/index.json`)
    jsonConfigs.push(`${NEW_ISSUE_REPO_ROOT}/${identifier}/repos/${owner}/${repo}/${type || 'index'}.json`)
  })
  return jsonConfigs
}

const parseRepo = (path, hash = '') => {
  if (typeof path !== 'string') return null
  const matches = path.match(/^\/([^/]+)\/([^/]+)(?:\/([^/]+))?/)
  const matchedHash = (typeof hash === 'string' && hash.replace(/^#/, '')) || undefined
  if (matches) {
    return {
      owner: matches[1],
      repo: matches[2],
      type: matches[3],
      hash: matchedHash,
      configPaths: generateJSONConfigPaths(matches[1], matches[2], matches[3], matchedHash),
    }
  }
  return null
}

export {
  parseRepo,
}

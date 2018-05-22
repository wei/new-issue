import Authenticator from 'netlify-auth-providers'

const API_ROOT = 'https://api.new-issue.org'
let accessToken = ''

const getGithubUrl = (owner = '', repo) => {
  return `https://github.com/${owner}${repo ? `/${repo}` : ''}`
}

const getGithubIssuesUrl = (owner, repo) => {
  return (owner && repo) ? `${getGithubUrl(owner, repo)}/issues` : null
}

const fetchLocalAccessToken = () => {
  try {
    accessToken = accessToken || window.localStorage.getItem('GITHUB_ACCESS_TOKEN') || ''
  } catch (e) {
    // Ignore Error
  }
  return accessToken
}

const setLocalAccessToken = (token = '') => {
  try {
    accessToken = token || ''
    window.localStorage.setItem('GITHUB_ACCESS_TOKEN', accessToken)
  } catch (e) {
    // Ignore Error
  }
  return accessToken
}

const triggerLogin = () => {
  return new Promise((resolve, reject) => {
    new Authenticator({ site_id: window.location.host.match(/localhost/i) && 'new-issue.org' })
      .authenticate({provider: 'github', scope: 'public_repo'},
        (err, data) => {
          if (err) return reject(err)
          setLocalAccessToken(data.token)
          resolve(data.token)
        }
      )
  })
}

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    if (!accessToken) return reject(new Error('No Access Token'))

    window.fetch(`${API_ROOT}/user`, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `bearer ${accessToken}`,
      },
    })
      .then(res => {
        var scopes = res.headers.get('x-oauth-scopes')
        if (scopes && scopes.includes('public_repo')) {
          return res.json()
        }
        setLocalAccessToken('')
        throw new Error('Permission public_repo not found')
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const buildIssueTitle = (titleOutputs = []) => {
  const titleStrings = []
  titleOutputs.forEach(({ value }) => {
    if (value) {
      titleStrings.push(value)
    }
  })
  return titleStrings.join('')
}

const buildIssueBody = (bodyOutputs = [], config) => {
  const bodyStrings = []
  const { output = {} } = config || {}
  const beforeMD = output['before.md'] || ''
  const afterMD = output['after.md'] || '\n\n<!-- Created using wei/new-issue -->'

  if (beforeMD) bodyStrings.push(beforeMD)
  bodyOutputs.forEach(({ label, value }) => {
    if (value) {
      bodyStrings.push(`${label || ''}${value}`)
    } else if (label && !value && !output.hideEmpty) {
      bodyStrings.push(`${label}`)
    }
  })
  if (afterMD) bodyStrings.push(afterMD)
  return bodyStrings.join('\n\n')
}

const createIssue = (owner, repo,
  titleOutputs = [], bodyOutputs = [], outputConfig = {}) => {
  return new Promise((resolve, reject) => {
    if (!owner || !repo) return reject(new Error('Unspecified owner or repo'))
    const title = buildIssueTitle(titleOutputs)
    const body = buildIssueBody(bodyOutputs, outputConfig)

    window.fetch(`${API_ROOT}/${owner}/${repo}/issues`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `bearer ${accessToken}`,
      },
    }).then(res => res.json())
      .then(res => {
        if (res && res.html_url) {
          resolve(res.html_url)
        } else {
          throw new Error((res && res.message) || 'Could not create issue')
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

fetchLocalAccessToken()

export {
  getGithubUrl,
  getGithubIssuesUrl,
  fetchLocalAccessToken,
  setLocalAccessToken,
  triggerLogin,
  getUserInfo,
  buildIssueTitle,
  buildIssueBody,
  createIssue,
}

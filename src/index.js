import habitat from 'preact-habitat'
import 'whatwg-fetch'
import { validateSchema, parseRepo } from './helper'
import Index from './components/index'

require('preact-cli/lib/lib/webpack/polyfills')

const GITHUB_RAW_ROOT = 'https://gitcdn.link/repo' // 'https://raw.githubusercontent.com'

const changeFavicon = link => {
  let f = document.querySelector('link[rel="icon"]')
  if (!f) {
    f = document.createElement('link')
    f.rel = 'icon'
    document.head.appendChild(f)
  }
  f.href = link
}

const load = (c) => {
  const { pageTitle, favicon } = (c && c.config && c.config.inputs) || {}
  window.title = pageTitle || `New Issue | ${c.owner}/${c.repo}`
  if (favicon) changeFavicon(favicon)

  habitat(Index).render({
    selector: '.new-issue-host',
    clean: true,
    defaultProps: c,
  })
}

const parsed = parseRepo(window.location.pathname, window.location.hash)

if (parsed) {
  const newIssueConfig = {
    owner: parsed.owner,
    repo: parsed.repo,
  }

  ;(function loadJSON () {
    const configPath = parsed.configPaths.pop()
    if (!configPath) {
      console.warn('Failed to fetch any config')
      newIssueConfig.issueDirect = true
      load(newIssueConfig)
      return
    }
    window.fetch(`${GITHUB_RAW_ROOT}${configPath}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`JSON file not found`)
        }
        return response.json()
      }).then(json => {
        if (!validateSchema(json)) {
          throw new Error(`JSON Schema validation failed`)
        }
        newIssueConfig.config = json
        load(newIssueConfig)
      }).catch(ex => {
        console.warn('[loadJSON]', ex.message, configPath)

        loadJSON()
      })
  })()
}

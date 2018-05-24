<img align="right" width="150" height="150" src="https://user-images.githubusercontent.com/5880908/40338322-715df6b0-5d42-11e8-8d32-d1c86e954785.png" />

# New Issue

[![TravisCI](https://img.shields.io/travis/wei/new-issue/master.svg?label=travis)](https://travis-ci.com/wei/new-issue)
[![CircleCI](https://img.shields.io/circleci/project/github/wei/new-issue/master.svg?label=circle)](https://circleci.com/gh/wei/new-issue)
[![Depfu](https://img.shields.io/depfu/wei/new-issue.svg)](https://depfu.com/github/wei/new-issue)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwei%2Fnew-issue.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fwei%2Fnew-issue)
[![Gitter](https://badges.gitter.im/wei/new-issue.svg)](https://gitter.im/wei/new-issue)
[![MIT License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://wei.mit-license.org)
<br/>
![Site Status](https://img.shields.io/uptimerobot/status/m780467987-304018deffeef2ec640802ad.svg?label=new-issue.org)
![Site Uptime](https://img.shields.io/uptimerobot/ratio/m780467987-304018deffeef2ec640802ad.svg)

A fully customizable Github issues interface. Setup for your repo today!


## Introduction

Frustrated with Github Issues that don't include enough information? Tired of limitations of Github Issue templates? Worry no more, _new-issue_ is here to rescue!

_Demo (Feel free to try it out):_
 - **Without new-issue:** https://github.com/wei/eslint/issues/new?template=BUG_REPORT.md
 - **With new-issue:** https://new-issue.org/wei/eslint<br/>[<img width="50%" title="example new-issue" src="https://user-images.githubusercontent.com/5880908/40338438-008836ac-5d43-11e8-945c-24f477921a3a.png" />](https://new-issue.org/wei/eslint)


## Get Started

Go to https://github.com/wei/new-issue/new/master/repos and create a file with name `:owner/:repo/index.json` following [this schema](schema/README.md).

Once the pull request is merged, you can start linking to `https://new-issue.org/:owner/:repo` in your `README.md` & `ISSUE_TEMPLATE.md` files.


## Schema

[View schema](schema/README.md)


## Advanced Usage

new-issue.org checks configuration in the following order (prepend `https://raw.githubusercontent.com/`):
 1. `wei/new-issue/{master || :hash}/repos/:owner/:repo/{:type || index}.json`
 2. `wei/new-issue/{master || :hash}/repos/:owner/index.json`
 3. `:owner/:repo/{master || :hash}/.new-issue/{:type || index}.json`
 4. `:owner/:repo/{master || :hash}/.new-issue`

_`:hash` can be commit hash or version number._


## TODOs
 - [ ] Create bot to merge PRs automatically
 - [ ] Better unit tests
 - [ ] Add themes


## Authors

 - [Wei He](https://whe.me) _github@weispot.com_


## License

[MIT](https://wei.mit-license.org)


## Disclaimer

Please do not use the service if your repo is mission critical. Functionalities are subject to change.

This project was bootstrapped with [Next.js](https://github.com/zeit/next.js/).

Test Style Guide [Here](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Netlify](#netlify)
- [Wp-Engine](#/Wp-Engine)
- [Testing](#/Testing)
- [TypeScript](#/Typescript)
<br>
<br>

## Netlify
<hr>
To deploy the site. 

### Step 1
```sh
$ npm run deploy
```
This builds and then exports the site. 
<br>
<br>
### Step 2 
Add and commit changes to git, netlify will automatically rebuild the site.
```sh
$ git add .
$ git commit
$ git push
```
<br>
<br>

## GitHub
Create Branch:
```sh
$ git checkout -b test-feature
```

Save Changes:
```sh
$ git push origin test-feature
```

Merge feature via CL
```sh
git fetch origin
git checkout -b storybook-feature origin/storybook-feature
git merge master
:qa! (vim)
Git push origin master
Git commit
— 
Git pull origin master
Git merge storybook-feature
```

Overwrite local with master
```bash
git fetch --all
git reset --hard origin/master
```

Delete branch on local after finishing
```bash
git remote prune origin
git branch -d storybook-feature

```

Checkout master:
```sh
$ git checkout master
$ git merge test-feature
$ git add .
$ git commit -m
$ git push
$ git branch -d test-feature
$ git push origin --delete test-feature
```


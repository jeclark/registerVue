# Twelve Foot Guru Vue Starter Kit

This is our empty starter app for building [Vue](https://vuejs.org/v2/guide/) apps. It is based on [Nuxt](https://nuxtjs.org/).

Which means comes with built in in Server Side Rendering, Routing, and all the Vue/Nuxt goodness. In addition, it is pre-configured with:
 - [Babel](https://babeljs.io/)
 - [Browserslist](https://github.com/ai/browserslist)
 - [PostCSS](http://postcss.org/)
 - automatic style/js linting via
   - [eslint](https://eslint.org/)
   - [stylelint](https://stylelint.io/)
 - [Prettier](https://prettier.io/) for code cleanliness
 - [Jest](https://facebook.github.io/jest/) for testing
 - [Storybook](https://storybook.js.org/) for component documentation
 - [Groundskeeper Willie](https://github.com/betaorbust/babel-plugin-groundskeeper-willie) to remove development code and console logs from production builds.
 - and maybe a couple of other goodies, too.

In other words, it is very opinionated.

## Getting Started

 All of the instructions here specify [yarn](https://yarnpkg.com/en/), but if you prefer [npm](https://www.npmjs.com/) everything should still work.

 1. Clone this repository.
 1. Set up your local git:
     1. Either delete the .git directory to start from scratch, or
     1. Rename the origin remote: `git remote rename origin starterkit` so that you can still receive updates to the starter kit.
 1. Install starter kit dependencies with `yarn install`
 1. Run `yarn dev` to start the dev web server, which runs on http://localhost:3000 by default.
 1. Run `yarn storybook` to start the [Storybook](https://storybook.js.org/) instance, which runs at http://localhost:9001
 1. Run `yarn test` to run the included [Jest](https://facebook.github.io/jest/) tests.
 1. Update `package.json`'s name, description, etc. fields to match your project.


To create a production build, do: `yarn build`.

## Directory Structure

Since this is based on Nuxt, we follow their [directory structure](https://nuxtjs.org/guide/directory-structure) with a couple of minor additions:

 - `coverage` is a directory created and used by Jest for code coverage stats.
 - `util` contains scripts used by the toolkit to do stuff. For example, prettier_css cleans up css files according to our code standard.
 - `.gitattributes`, `.gitignore` get you started with your version control.
 - `.eslintrc.js`, `.babelrc`, `.stylelintrc` -- configuration files for [eslint](https://eslint.org/), [Babel](https://babeljs.io/) and [stylelint](https://stylelint.io/), respectively. Change these files if you disagree with our style choices.
 - `package.json` -- [Browserslist](https://github.com/ai/browserslist) config is kept here. Change it if you need different browser support. Default is `"> 1%", "last 2 versions"`. You should also update the specifics for your project.

## Usage

### Writing Modules

For the most part, you should write tests first, modules second, stories last. See the respective [Jest](https://facebook.github.io/jest/), [Vue](https://vuejs.org/v2/guide/)/[Nuxt](https://nuxtjs.org/) and [Storybook](https://storybook.js.org/) docs for specifics.

We expect test files and story files to be named the same as their corresponding `.vue` file, and located in the same directory. So `pages/index.vue` would have a matching `pages/index.spec.js` or `pages/index.test.js` and a `pages/index.story.js` file.

### Code Cleanup / Linting

We use [lint-staged](https://github.com/okonet/lint-staged) to automatically lint with [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/),  and run [prettier](https://prettier.io/). This should occur to any files you have `git add`ed when you run `git commit`. The commit should fail if the linting fails.

If this isn't happening automatically, then likely lint-staged, or its dependency [Husky](https://github.com/typicode/husky) did not install the proper hooks. I haven't found an easy fix for this, other than re-installing husky/lint-staged. Alternately, you can run `yarn precommit` to manually do the cleanup stage on files added via `git add`.





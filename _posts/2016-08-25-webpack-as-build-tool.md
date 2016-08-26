---
layout: post
---

I've been recently exploring the node.js ecosystem and I found [webpack](https://webpack.github.io/) to be a very powerful tool to compile your site assets. Yes, it's what Sprockets does, but a lot more.

Webpack _simply_ takes input files through processors and rules, and bundles them in output files. A couple of very direct applications:

- read JavaScript source files through ES6 and JSX parsers to generate a final ES5 file.
- read Sass source files to generate a CSS file.

Webpack docs are huge, and it's extremely configurable, hence sometimes it's a bit hard to find the right way to achieve your goals. Every blogger out there will tell you their particular recipe, which may not be what you're looking for.
To follow the trend, I'll tell you my recipes as well. Take them with a grain of salt.

## Recipe 1: this blog's stylesheet

This blog uses a simple Sass stylesheet. Webpack is used to convert the Sass to CSS.

I'll show you how to:

- install webpack from scratch
- configure webpack to compile CSS from Sass

Assuming a `npm` command ready to use from your terminal (eg: `brew install node`), do:

`npm init`

You can mostly hit return on every question, or supply your own answers at will. This creates a `package.json` for the project. On node, each project has such file in its root directory. Coming from a Ruby background you can see it as a _Gemfile + Rakefile_ combo.

Now it's time to install the required packages. Apart from `webpack` we install modules to parse CSS, Sass, and to extract the result into a separate file:

```
npm install --save webpack
npm install --save extract-text-webpack-plugin
npm install --save css-loader
npm install --save sass-loader
```

A `node_modules` folder will be automatically created and it's where these packages will live. It is customary in the node world to have the dependencies inside the project folder.

[webpack.config.js](/public/webpack.config.js) will tell webpack how to parse the input files and where to create the bundle output file. Currently it's simply stating to read from `public/main.sass` chaining the css and sass parsers and extract the resulting CSS-JS module as plain CSS into `public/main.css`.

Now let's check the output file is generated correctly by launching:
`webpack`

Webpack has a cool 'watch mode' so we don't need to kick the compilation process manually. I've made it part of a node script you can leave running in another terminal:
`npm run dev`

Once we're happy with the changes, we might want to generate a production build, which is minified. Remember to stop previous watch daemon first:
`npm run build`

## Recipe 2: a full app

[Chinchón](https://github.com/dncrht/chinchon) is a JS app that uses webpack to generate the production CSS and JS files.

Check out `webpack.config.js` and `webpack.production.config.js`.

- `app/*js*` are ES6/JSX files compiled to plain JS.
- `app/styles/application.sass` and Bootstrap 4 Sass are compiled to CSS.

The production version adds the uglifyer plugin for JS.

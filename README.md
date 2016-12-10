# Slacker - React+Redux & Socket.IO Example Project

## Overview
This application is built as an example of a chat application, built in the spirit of Slack. The goal of this readme is give some insight into my thought process
for my submission, and detail which libraries were used.

I am completely comfortable rolling my own tooling and libraries needed for a redux app, but in the interest of time for this submission I used the React Redux Starter Kit as I have in the past since the majority of the libraries I like to use are included
 (and also because I became a fan of the [Fractal Project Structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) when I got started learning react/redux).

## Install


```bash
$ yarn install (personal preference, npm install works as well)    # Install project dependencies
$ npm start       # Compile and launch
```

### Ecosystem
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org)
* [Immutable](https://facebook.github.io/immutable-js/)
* [Lodash](https://lodash.com/)
* [Material-UI](http://www.material-ui.com/#/)

### User Auth
I do want to point out this the user auth is about as basic (and unsecure) as they come, and not my preferred method for authenticating users. I would prefer to use JWT
like I did on [my last react project.](https://github.com/danielriley06/JobHub-React)

### Todo
* Refactor reducer composition
* Implement Normalizr library to normalize state
* Changes needed to prepare app for deployment

### Special Thanks
* [Redux Without Profanity](https://tonyhb.gitbooks.io/redux-without-profanity/content/index.html)
* [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

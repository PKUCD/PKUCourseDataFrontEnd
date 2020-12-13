# pkucd

> A Vue.js project

## Profile & ProfileModify

主要的组件是`src/components`里的`Profile.vue`和`ProfileModify.vue`，对应的路由在`src/router`的`profile.js`。合并的时候应该只要下载这三个文件，前两个放`components`里，把`profile.js`的内容和本地的`router`合并一下。

如果合并的时候出了问题，务必检查一下axios请求的属性名是否一致（我是按照api文档写的，但是不排除有错漏。）

最后，希望您没有启用ESlint。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

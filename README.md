# pkucd

> A Vue.js project

## Profile & ProfileModify

主要的组件在`src/components`里，对应的路由在`src/router`的`index.js`。合并的时候应该只要下载这几个文件，把`index.js`的内容和本地的`router`合并一下。

如果合并的时候出了问题，务必检查一下axios请求的属性名是否一致（我是按照api文档写的，但是不排除有错漏。）

没有交互的情况下把axios注释掉，原本注释的那些测试用的可以放出来。

最后，希望您没有启用ESlint。

更新：把`Profile.vue`中的`showList`和`ModifyPass`分离了出来。

更新：把`ProfileModify.vue`改成了`Profile`里的对话框形式，调用子组件`ModifyProfile.vue`。

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

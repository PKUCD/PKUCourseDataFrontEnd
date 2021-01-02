# pkucd

> A Vue.js project

## 组件
用户个人主页：Profile.vue，包括子组件：ShowList.vue, ModifyProfile.vue, ModifyPass.vue。
登录注册：Login.vue和Register.vue。这原本不是我负责的部分，说起来有点尴尬，由于负责的同学push得太晚，所以我自己写了并且调试完成了。
顶部菜单栏：Home.vue。最初的框架是吕孟韬同学写的（详见分支resultpage），不过我改了很多，包括样式、按钮逻辑、添加登录状态和各个请求以及跳转等。几乎算是全新的一个组件。

其他的browse.vue、create.vue、change.vue（李伟韬同学的分支，名字超长那个）、Result.vue、Taglist.vue（吕孟韬同学的分支resultpage）是直接从对应分支复制的，原本把这些组件ignore了，但是分支切换后数据丢失，导致路由跳转出错，所以又复制了回来，这五个组件不是我写的。

另外还有nginx配置，这个没什么任务量（虽然搞了很久），所以没有push上来。

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

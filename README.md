# DEMO

##### 项目介绍
渐进式网页编程

##### PWA语法
1. ES6标准语法
2. Promise标准，这是最为重要的知识点
3. fetch，全新的获取资源的API，它包括Request、Response、Header和Stream
######   （我们使用fetch而非ajax的重要原因是，fetch天然的支持Request和Response，并且是使用的Promise。这和service Worker是一套的。）
4. WebWorker，JavaScript解决单线程的方案
5. Cache API（缓存API

##### 结果
1. PWA在线上部署的时候，请确保是在HTTPS下面，而非HTTP。当然，为了便于开发，浏览器支持localhost上面部署
2. PWA完成缓存后，很多时候你会发现代码无法变动，或者没有按照预期的那样自动更新worker，这时候清除缓存试试
3. PWA并非支持所有浏览器，事实上，很少浏览器默认支持PWA。兼容比较好的是chrome, firefox, 目前safria也已经实现了pwa。
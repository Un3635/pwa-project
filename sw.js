
const cacheStrogeKey = 'minimal-pwa-1';
const cacheList = [
  "/",
  "/index.html",
  "/main.css",
  "/pwa.png"
]
const ENV = 'project';

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
 // waitUntil接收一个promise的对象
  e.waitUntil(
    caches.open(cacheStrogeKey) // caches 是 cacheStrage 对象 
    .then(cache => cache.addAll(cacheList)) // cache 是caches的一个实例 抓取的资源写入缓存中
    .then(() => self.skipWaiting()) // self.skipWaiting() 方法跳过 waiting 状态，然后会直接进入 activate 阶段
  )
})
// 浏览器使用缓存，需要拦截fetch事件
self.addEventListener('fetch', function (e) {
  if (ENV === 'project') {
    return false;
  }
  e.respondWith(
    caches.match(e.request)
    .then(function (response) {
      // 检测是否已经缓存过
      // console.log(response);
      if (response) {
        return response;
      }
      var fetchRequest = e.request.clone();
      return fetch(fetchRequest).then(
        function (response) {
          // 检测请求是否有效
          console.log(response);
          if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
          }
          //复制一份response，原因是request或者response对象属于stream，只能使用一次，之后一份存入缓存，另一份发送给页面
          var responseToCache = response.clone();

          caches.open(cacheStrogeKey)
            .then(function (cache) {
                cache.put(e.request, responseToCache);
            });

          return response;
        }
      );
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    Promise.all([
      self.clients.claim(),
      // 清理旧版本
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== cacheStrogeKey) {
                return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  )
  // e.waitUntil(
  //   // 获取所有cache 名称
  //   caches.keys().then(cacheNames => {
  //     return Promise.all(
  //       // 获取所有不同于当前版本名称的cache 内容
  //       cacheNames.filter(cn => {
  //         return cn !== cacheStrogeKey
  //       }).map(cn => {
  //         console.log('delete');
  //         return caches.delete(cn)
  //       })
  //     )
  //   }).then(() => {
  //     // 更新静态资源，缓存的资源会随着版本的更新而过期，所以会根据缓存的字符串名称清除缓存
  //     // 通过调用 self.clients.claim() 取得页面的控制权
  //     console.log(3);
  //     return self.clients.claim()
  //   })
  // )
})

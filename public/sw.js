// ====== 多域名代理配置 ======
const proxyDomains = [
  'cos.amiyabot.com',
  'example.anka1.top'
];

// ====== 安装 & 激活时立即生效 ======
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 跳过等待，立即激活
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // 立即接管所有页面
  console.log('[SW] Service Worker activated, proxy enabled.');
});

// ====== 请求拦截 ======
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (proxyDomains.includes(url.hostname)) {
    // 改写为同源代理路径
    const proxyUrl = `/${url.hostname}${url.pathname}${url.search}`;

    const newRequest = new Request(proxyUrl, {
      method: event.request.method,
      headers: event.request.headers,
      body: event.request.body,
      mode: 'same-origin',
      credentials: 'include'
    });

    event.respondWith(fetch(newRequest));
  }
});

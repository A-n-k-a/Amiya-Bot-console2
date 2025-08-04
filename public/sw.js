// ====== 多域名代理配置 ======
const proxyDomains = [
  'cos.amiyabot.com',
  'example.anka1.top'
];

// ====== 请求拦截 ======
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 检查是否匹配代理域名
  if (proxyDomains.includes(url.hostname)) {
    // 代理路径：/<域名>/原始路径
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

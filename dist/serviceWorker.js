const staticAssets=["./img/favicon.ico","./css/index.css","./js/index.bundle.js","./js/single.bundle.js"];function cacheFirst(t){return caches.match(t)||fetch(t)}async function networkFirst(t){const c=await caches.open("dynamic-cache");try{const s=await fetch(t);return await c.put(t,s.clone()),s}catch(s){return await c.match(t)}}self.addEventListener("install",(async()=>{const t=await caches.open("static-cache");await t.addAll(staticAssets)})),self.addEventListener("fetch",(t=>{const c=t.request;new URL(c.url).origin===location.url?t.respondWith(cacheFirst(c)):t.respondWith(networkFirst(c))}));
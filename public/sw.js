if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let a={};const r=e=>n(e,i),u={module:{uri:i},exports:a,require:r};s[i]=Promise.all(t.map((e=>u[e]||r(e)))).then((e=>(c(...e),a)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2912bba4469f698d20cd22909486eb89"},{url:"/_next/static/chunks/326-03cd71ec4f745b4d.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/472-03597d6e53e14563.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/634-4b248822c2bc7faa.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/870fdd6f-10e61a2337762265.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/948-181742f77d06ee63.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/991-961c36b2713ba4fb.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/error-37ea842d5b5ec77a.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/inspections/%5Bid%5D/page-36c84014f462c941.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/inspections/new/%5BvehicleId%5D/page-549b03d5ae472f21.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/inspections/new/page-e4cebb78375ce82c.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/inspections/page-aae312c337899d0a.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/inventory/page-ea454a5291299322.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/layout-bd0a616c104fb240.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/loading-821d97324ecf6b3f.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/not-found-68d94f1ead54ac96.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/page-fc604ca1401981a0.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/settings/checkin/page-4ccc577c204f0bc3.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/settings/page-7639059cf397a40c.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/%5Bid%5D/checkin/page-a664bedc9f9f3f9b.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/%5Bid%5D/loading-543653936cbcfd6d.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/%5Bid%5D/not-found-97d406c24b4ee0de.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/%5Bid%5D/page-3fd1c7090d4f35d3.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/%5Bid%5D/parts/page-3d3454c1b7618c29.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/new/page-357caa7905a6589c.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/app/vehicles/page-662d029862184d4f.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/fd9d1056-7665fa999e59534f.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/framework-c5181c9431ddc45b.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/main-app-142255f322e538d0.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/main-ee93bcf1ee2ab8c6.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4d70b3705d0e45fa.js",revision:"szr1nZuYAWX2vztfckx9l"},{url:"/_next/static/css/e72cf7eeb37d4b1b.css",revision:"e72cf7eeb37d4b1b"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/szr1nZuYAWX2vztfckx9l/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/szr1nZuYAWX2vztfckx9l/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/manifest.json",revision:"debdf7d0d16104f9067395e23cda7c9c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
if(!self.define){let e,i={};const c=(c,n)=>(c=new URL(c+".js",n).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const o=e=>c(e,s),b={module:{uri:s},exports:d,require:o};i[s]=Promise.all(n.map((e=>b[e]||o(e)))).then((e=>(r(...e),d)))}}define(["./workbox-460519b3"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"a.jpg",revision:"3a67109bda1e49d697b01adb83888515"},{url:"asset-manifest.json",revision:"94ec97dbc408f9b01c85b7fb47b0d7d0"},{url:"b.jpg",revision:"f6a43d40a3e91c1d4b7717b4c1e15978"},{url:"c.jpg",revision:"08c54cf39ebfb92bcb60db3673a3896c"},{url:"icons/android-chrome-192x192.png",revision:"0eb89e9c5bff785bfd50abf71c338d47"},{url:"icons/android-chrome-512x512.png",revision:"5db98ad3142366a50d3dbd2d8dfad381"},{url:"icons/apple-touch-icon.png",revision:"c6781a7762e0ac916e7b3e9985bbd236"},{url:"icons/favicon-16x16.png",revision:"0ef5bed4bdc5222663e315728feb6050"},{url:"icons/favicon-32x32.png",revision:"bb430d5163dae11c0c13136e425dfae5"},{url:"icons/maskable.png",revision:"5db98ad3142366a50d3dbd2d8dfad381"},{url:"image.png",revision:"43abc59dc128e14ece3d88c16d332941"},{url:"index.html",revision:"43f16989d95ce6323898f97d5e14e31e"},{url:"manifest.json",revision:"fc24d9cb4dcb70b94a575e59e6353d32"},{url:"service-worker.js",revision:"5cf90714887fee2a06f87208b054e1c9"},{url:"static/css/main.a8529c40.css",revision:"d79247277dc45bca96ac09fe01b9c372"},{url:"static/js/787.c4e7f8f9.chunk.js",revision:"903dd0caeb02458beaa7b0f957b518a1"},{url:"static/js/main.4095ee66.js",revision:"8ea22c4fb248a4cdc32e42595a9e1334"},{url:"workbox-460519b3.js",revision:"6338cbbc5807c997ebf1ffd06db4a815"}],{})}));
//# sourceMappingURL=service-worker.js.map
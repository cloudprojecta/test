(()=>{var i=chrome;var d="https://api.nopecha.com",n="https://www.nopecha.com",b="https://developers.nopecha.com",R={doc:{url:b,automation:{url:`${b}/guides/extension_advanced/#automation-build`}},api:{url:d,recognition:{url:`${d}/recognition`},status:{url:`${d}/status`}},www:{url:n,annoucement:{url:`${n}/json/announcement.json`},demo:{url:`${n}/demo`,hcaptcha:{url:`${n}/demo/hcaptcha`},recaptcha:{url:`${n}/demo/recaptcha`},funcaptcha:{url:`${n}/demo/funcaptcha`},awscaptcha:{url:`${n}/demo/awscaptcha`},turnstile:{url:`${n}/demo/turnstile`},textcaptcha:{url:`${n}/demo/textcaptcha`},perimeterx:{url:`${n}/demo/perimeterx`}},manage:{url:`${n}/manage`},pricing:{url:`${n}/pricing`},setup:{url:`${n}/setup`}},discord:{url:`${n}/discord`},github:{url:`${n}/github`,release:{url:`${n}/github/release`}}};function h(e){let t=("4cb671022b0fb1bf20aebbd16ca9bf79484054c1f4883c5fa78749031b6f10f3"+e).split("").map(o=>o.charCodeAt(0));return _(t)}var v=new Uint32Array(256);for(let e=256;e--;){let t=e;for(let o=8;o--;)t=t&1?3988292384^t>>>1:t>>>1;v[e]=t}function _(e){let t=-1;for(let o of e)t=t>>>8^v[t&255^o];return(t^-1)>>>0}async function s(e,t){let o=""+[+new Date,performance.now(),Math.random()],[a,g]=await new Promise(N=>{i.runtime.sendMessage([o,e,...t],N)});if(a===h(o))return g}function y(){let e;return t=>e||(e=t().finally(()=>e=void 0),e)}var V=y(),r;function w(){return V(async()=>(r||(r=await s("settings::get",[])),r))}function x(e){r&&(r={...r,...e},S(r))}function c(){return r}function u(e){return new Promise(t=>setTimeout(t,e))}var C=[];function k(e,t){e.timedout=!1,C.push(e);let o,a=setInterval(async()=>{await M(e,c())||(clearTimeout(o),clearInterval(a))},400);t&&(o=setTimeout(()=>clearInterval(a),t),e.timedout=!0)}async function M(e,t){if(e.timedout)return!1;let o=e.condition(t);if(o===e.running())return!1;if(!o&&e.running())return e.quit(),!1;if(o&&!e.running()){for(;!e.ready();)await u(200);return e.start(),!1}}function S(e){C.forEach(t=>M(t,e))}function E(){i.runtime.connect({name:"stream"}).onMessage.addListener(t=>{t.event==="settingsUpdate"&&x(t.settings)})}function l(e){if(document.readyState!=="loading")setTimeout(e,0);else{let t;t=()=>{removeEventListener("DOMContentLoaded",t),e()},addEventListener("DOMContentLoaded",t)}}function $(e){postMessage({source:"nopecha",...e})}function B(e){$(e)}var p,f=!1;function L(){return!!document.querySelector("#challenge-stage")}function P(){f=!0,p=new MutationObserver(e=>{e[0].addedNodes.length>0&&H()}),p.observe(document.querySelector("#challenge-stage"),{childList:!0}),document.querySelector("#challenge-stage .ctp-checkbox-container")&&H()}function T(){p.disconnect(),f=!1}function q(){return f}var m=!1;async function H(){if(m)return;m=!0;let e=c();e.turnstile_solve_delay&&await u(e.turnstile_solve_delay_time),B({action:"click",selector:"input[type=checkbox], #cf-stage area"}),m=!1}async function O(){E(),await w(),await s("tab::registerDetectedCaptcha",["turnstile"]);let e=location.hostname;k({name:"turnstile/auto-solve",condition:t=>t.enabled&&t.turnstile_auto_solve&&!t.disabled_hosts.includes(e),ready:L,start:P,quit:T,running:q})}l(O);})();

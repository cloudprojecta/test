(()=>{var s=chrome;var h="https://api.nopecha.com",n="https://www.nopecha.com",v="https://developers.nopecha.com",V={doc:{url:v,automation:{url:`${v}/guides/extension_advanced/#automation-build`}},api:{url:h,recognition:{url:`${h}/recognition`},status:{url:`${h}/status`}},www:{url:n,annoucement:{url:`${n}/json/announcement.json`},demo:{url:`${n}/demo`,hcaptcha:{url:`${n}/demo/hcaptcha`},recaptcha:{url:`${n}/demo/recaptcha`},funcaptcha:{url:`${n}/demo/funcaptcha`},awscaptcha:{url:`${n}/demo/awscaptcha`},turnstile:{url:`${n}/demo/turnstile`},textcaptcha:{url:`${n}/demo/textcaptcha`},perimeterx:{url:`${n}/demo/perimeterx`}},manage:{url:`${n}/manage`},pricing:{url:`${n}/pricing`},setup:{url:`${n}/setup`}},discord:{url:`${n}/discord`},github:{url:`${n}/github`,release:{url:`${n}/github/release`}}};function S(e){let t=("4cb671022b0fb1bf20aebbd16ca9bf79484054c1f4883c5fa78749031b6f10f3"+e).split("").map(o=>o.charCodeAt(0));return x(t)}var M=new Uint32Array(256);for(let e=256;e--;){let t=e;for(let o=8;o--;)t=t&1?3988292384^t>>>1:t>>>1;M[e]=t}function x(e){let t=-1;for(let o of e)t=t>>>8^M[t&255^o];return(t^-1)>>>0}async function a(e,t){let o=""+[+new Date,performance.now(),Math.random()],[u,c]=await new Promise(f=>{s.runtime.sendMessage([o,e,...t],f)});if(u===S(o))return c}function B(){let e;return t=>e||(e=t().finally(()=>e=void 0),e)}var Q=B(),i;function C(){return Q(async()=>(i||(i=await a("settings::get",[])),i))}function q(e){i&&(i={...i,...e},A(i))}function m(){return i}function r(e){return new Promise(t=>setTimeout(t,e))}var H=[];function b(e,t){e.timedout=!1,H.push(e);let o,u=setInterval(async()=>{await $(e,m())||(clearTimeout(o),clearInterval(u))},400);t&&(o=setTimeout(()=>clearInterval(u),t),e.timedout=!0)}async function $(e,t){if(e.timedout)return!1;let o=e.condition(t);if(o===e.running())return!1;if(!o&&e.running())return e.quit(),!1;if(o&&!e.running()){for(;!e.ready();)await r(200);return e.start(),!1}}function A(e){H.forEach(t=>$(t,e))}function k(){s.runtime.connect({name:"stream"}).onMessage.addListener(t=>{t.event==="settingsUpdate"&&q(t.settings)})}function w(e){if(document.readyState!=="loading")setTimeout(e,0);else{let t;t=()=>{removeEventListener("DOMContentLoaded",t),e()},addEventListener("DOMContentLoaded",t)}}var j,_=!1;function L(){return!!(document.querySelector("#captcha-container")&&document.querySelector("#amzn-captcha-verify-button"))}function R(){_=!0,F()}function T(){j.disconnect(),_=!1}function E(){return _}async function F(){await r(400),document.querySelector("#amzn-captcha-verify-button")?.click()}function P(){return!!(document.querySelector("#captcha-container")||document.querySelector("#amzn-captcha-verify-button"))}async function N(e,t){let o={v:s.runtime.getManifest().version,key:K(e)};return o.url=await a("tab::getURL",[]),o}function K(e){return!e.keys||!e.keys.length?e.key:e.keys[Math.floor(Math.random()*e.keys.length)]}var d,y=!1;function z(){if(O(document))return!0;for(let e of document.querySelectorAll("awswaf-captcha")){let t=e.shadowRoot;if(O(t))return!0}return!1}function I(){y=!0;let e=t=>{t.filter(o=>o.type==="childList"&&o.addedNodes.length).map(o=>[...o.addedNodes]).flat().filter(o=>o.nodeName==="AWSWAF-CAPTCHA").map(o=>o.shadowRoot).forEach(o=>{d.observe(o,{subtree:!0,childList:!0}),l(o)}),[3,4,5].includes(t.length)?l(t[0].target.parentElement):t.length===1&&t[0].addedNodes.length&&t[0].addedNodes[0].id==="root"&&l(t[0].addedNodes[0])};d=new MutationObserver(e),d.observe(document,{subtree:!0,childList:!0}),l(document),document.querySelectorAll("awswaf-captcha").forEach(t=>{let o=t.shadowRoot;d.observe(o,{subtree:!0,childList:!0}),l(o)})}function U(){d.disconnect(),y=!1}function W(){return y}function l(e){let t=e.querySelector("#amzn-btn-audio-internal [title*=udio], #amzn-btn-audio [title*=udio]");t?.click(),e.querySelector("audio")&&G(e),(e.querySelector("audio")||t)&&a("tab::registerDetectedCaptcha",["awscaptcha"])}function O(e){let t=e.querySelector("#amzn-btn-audio-internal [title*=udio], #amzn-btn-audio [title*=udio]");return!!(e.querySelector("audio")||t)}var D;async function G(e){let t=e.querySelector("audio").src.replace("data:audio/aac;base64,","");if(t===D||(D=t,!t))return;let o=m(),u=new Date().valueOf(),c=await a("api::recognition",[{type:"awscaptcha",audio_data:[t],...await N(o)}]);if(!c||"error"in c)return;let f=new Date().valueOf();if(o.awscaptcha_solve_delay){let p=o.awscaptcha_solve_delay_time-f+u;p>0&&await r(p)}let g=c.data[0];g?(e.querySelector("input").value=g,await r(200),e.querySelector("#amzn-btn-verify-internal").click()):e.querySelector("#amzn-btn-refresh-internal").click()}async function J(){let e=!1;for(let o=0;o<3;o++)if(await r(1e3),P()){e=!0;break}if(!e)return;k(),await C(),await a("tab::registerDetectedCaptcha",["awscaptcha"]);let t=location.hostname;b({name:"awscaptcha/auto-open",condition:o=>o.enabled&&o.awscaptcha_auto_open&&!o.disabled_hosts.includes(t),ready:L,start:R,quit:T,running:E}),b({name:"awscaptcha/auto-solve",condition:o=>o.enabled&&o.awscaptcha_auto_solve&&!o.disabled_hosts.includes(t),ready:z,start:I,quit:U,running:W})}w(J);})();

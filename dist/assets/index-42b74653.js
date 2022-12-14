(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function l(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=l(i);fetch(i.href,a)}})();const o=[{handle:"@TrollBot66756542 💎",profilePic:"images/troll.jpg",likes:27,retweets:10,tweetText:`Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,replies:[],isLiked:!1,isRetweeted:!1,uuid:"4b161eee-c0f5-4545-9c4b-8562944223ee"},{handle:"@Elon ✅",profilePic:"images/musk.png",likes:6500,retweets:234,tweetText:"I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀",replies:[{handle:"@TomCruise ✅",profilePic:"images/tcruise.png",tweetText:"Yes! Sign me up! 😎🛩"},{handle:"@ChuckNorris ✅",profilePic:"images/chucknorris.jpeg",tweetText:"I went last year😴"}],isLiked:!1,isRetweeted:!1,uuid:"3c23454ee-c0f5-9g9g-9c4b-77835tgs2"},{handle:"@NoobCoder12",profilePic:"images/flower.png",likes:10,retweets:3,tweetText:"Are you a coder if you only know HTML?",replies:[{handle:"@StackOverflower ☣️",profilePic:"images/overflow.png",tweetText:"No. Onviosuly not. Go get a job in McDonald's."},{handle:"@YummyCoder64",profilePic:"images/love.png",tweetText:"You are wonderful just as you are! ❤️"}],isLiked:!1,isRetweeted:!1,uuid:"8hy671sff-c0f5-4545-9c4b-1237gyys45"}];let u;const x=new Uint8Array(16);function L(){if(!u&&(u=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!u))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(x)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function $(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}const O=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:O};function j(e,t,l){if(y.randomUUID&&!t&&!e)return y.randomUUID();e=e||{};const s=e.random||(e.rng||L)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){l=l||0;for(let i=0;i<16;++i)t[l+i]=s[i];return t}return $(s)}const w=document.getElementById("tweet-input"),v=document.getElementById("feed");document.addEventListener("click",e=>{e.target.dataset.like?I(e.target.dataset.like):e.target.dataset.retweet?R(e.target.dataset.retweet):e.target.dataset.reply?k(e.target.dataset.reply):e.target.dataset.response?S(e.target.dataset.response):e.target.dataset.save?U(e.target.dataset.save):e.target.id==="tweet-btn"&&w.value!==""&&P()});function I(e){const t=o.find(l=>e===l.uuid);t.isLiked?t.likes--:t.likes++,t.isLiked=!t.isLiked,c()}function R(e){const t=o.find(l=>e===l.uuid);t.isRetweeted?t.retweets--:t.retweets++,t.isRetweeted=!t.isRetweeted,c()}function k(e){document.getElementById(`replies-${e}`).classList.toggle("hidden"),document.getElementById(`tweet-response-${e}`).classList.toggle("hidden")}function S(e){const t=document.getElementById(`response-${e}`),l=o.find(i=>e===i.uuid),s={handle:"@YouTheUser",profilePic:"images/scrimbalogo.png",tweetText:t.value};l.replies.unshift(s),t.value="",c(),k(e)}function P(){let e=new Object;e={handle:"@YouTheUser",profilePic:"images/scrimbalogo.png",likes:0,retweets:0,tweetText:w.value,replies:[],isLiked:!1,isRetweeted:!1,uuid:j()},o.unshift(e),w.value="",c()}function U(e){const t=o.find(s=>e===s.uuid);if(localStorage.getItem("saved")){let s=JSON.parse(localStorage.getItem("saved"));s.unshift(t),localStorage.setItem("saved",JSON.stringify(s))}else localStorage.setItem("saved",JSON.stringify([t]))}function C(){return o.map(t=>({handle:t.handle,profilePic:t.profilePic,likes:t.likes,retweets:t.retweets,tweetText:t.tweetText,replies:t.replies,isLiked:t.isLiked,isRetweeted:t.isRetweeted,uuid:t.uuid}))}function c(){v.innerHTML="",C().forEach(t=>{let{profilePic:l,handle:s,likes:i,retweets:a,tweetText:d,replies:p,isLiked:T,isRetweeted:b,uuid:r}=t,f="",m="";T&&(f="liked"),b&&(m="retweeted");let h="";p.length>0&&p.forEach(g=>h+=`
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${g.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${g.handle}</p>
                                    <p class="tweet-text">${g.tweetText}</p>
                                </div>
                            </div>
                    </div>`),v.innerHTML+=`
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${l}" class="profile-pic">
                    <div>
                        <p class="handle">${s}</p>
                        <p class="tweet-text">${d}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-solid fa-comment-dots" data-reply=${r}></i>
                                ${p.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${f}" data-like=${r}></i>
                                ${i}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${m}" data-retweet=${r}></i>
                                ${a}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-plus" data-save=${r}></i>
                            </span>
                        </div> 
                        <div class='tweet-response hidden' id='tweet-response-${r}'>
                            <img src="images/scrimbalogo.png" class="profile-pic-response">
			                <input type='text' placeholder="Add your response" id='response-${r}'>
                            <button class='response-btn' data-response='${r}'>Send</button>
                        </div>  
                    </div>            
                </div>
            </div>
            <div class='hidden' id='replies-${r}'>
                ${h}
            </div>
            `})}c();

// /* ─── DATA ─── */
// const products = [
//   { id:"aurora-mug-set",  name:"Aurora Stone Mug Set",      cat:"Tableware", price:38,  rating:4.8, rank:1, date:20260401, badge:"Best seller",   tone:"#d7a47b", desc:"A set of four matte ceramic mugs with a warm sandstone finish." },
//   { id:"haven-lamp",      name:"Haven Table Lamp",          cat:"Lighting",  price:112, rating:4.9, rank:2, date:20260405, badge:"New arrival",   tone:"#e2c17e", desc:"Soft amber light and a sculpted linen shade for evening corners." },
//   { id:"linen-throw",     name:"Stone Wash Linen Throw",    cat:"Textiles",  price:74,  rating:4.7, rank:3, date:20260323, badge:"Limited batch", tone:"#a6b39b", desc:"Airy texture, soft drape, and a calm neutral tone for layered seating." },
//   { id:"glass-carafe",    name:"North Glass Carafe",        cat:"Kitchen",   price:46,  rating:4.6, rank:4, date:20260319, badge:"Host favorite", tone:"#9dc2ca", desc:"A clean-lined carafe for water, chilled tea, or bedside routines." },
//   { id:"olive-board",     name:"Olive Wood Serving Board",  cat:"Kitchen",   price:58,  rating:4.9, rank:5, date:20260403, badge:"Gift ready",    tone:"#b88e62", desc:"Naturally grained hardwood shaped for grazing tables and small rituals." },
//   { id:"cloud-bowl",      name:"Cloud Ceramic Bowl",        cat:"Tableware", price:52,  rating:4.8, rank:6, date:20260328, badge:"Editor's pick", tone:"#d9c0b6", desc:"A wide serving bowl with a hand-brushed glaze and soft organic edge." },
//   { id:"ember-candle",    name:"Ember Resin Candle",        cat:"Living",    price:29,  rating:4.5, rank:7, date:20260312, badge:"Weekend mood",  tone:"#c47a58", desc:"Smoked cedar, bergamot, and a low glow meant for slower evenings." },
//   { id:"ritual-kit",      name:"Morning Ritual Brew Kit",   cat:"Gifting",   price:138, rating:5.0, rank:8, date:20260407, badge:"Bundle save",   tone:"#d2b594", desc:"A dripper, filters, glass server, and linen towel packed as a gift set." },
// ];

// const fmt = new Intl.NumberFormat("en-US",{ style:"currency", currency:"USD", maximumFractionDigits:0 });
// const FREE_SHIP = 150;
// const STORE_KEY = "northstar-cart";

// const state = { cat:"All", q:"", sort:"featured", cart:loadCart() };

// const $ = id => document.getElementById(id);
// const el = {
//   catFilters:  $("categoryFilters"),
//   search:      $("searchInput"),
//   sort:        $("sortSelect"),
//   grid:        $("productGrid"),
//   count:       $("resultsCount"),
//   catLabel:    $("activeCategoryLabel"),
//   cartItems:   $("cartItems"),
//   cartTotal:   $("cartTotal"),
//   cartCount:   $("cartCount"),
//   cartSummary: $("cartSummary"),
//   shipMsg:     $("shippingMessage"),
//   shipBar:     $("shipBar"),
//   shipFill:    $("shipFill"),
//   cartToggle:  $("cartToggle"),
//   cartPanel:   $("cartPanel"),
//   cartClose:   $("cartClose"),
//   backdrop:    $("cartBackdrop"),
//   checkout:    $("checkoutButton"),
//   toast:       $("toast"),
//   nlForm:      $("newsletterForm"),
//   nlEmail:     $("newsletterEmail"),
//   nlStatus:    $("newsletterStatus"),
//   shipMetric:  $("shipMetric"),
//   colMetric:   $("collectionMetric"),
//   ratingMetric:$("ratingMetric"),
//   backToTop:   $("backToTop"),
// };

// /* ─── PARTICLES ─── */
// (function(){
//   const canvas = $("particles");
//   const ctx = canvas.getContext("2d");
//   let W,H,dots;
//   function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
//   function make(){
//     dots=Array.from({length:50},()=>({
//       x:Math.random()*W, y:Math.random()*H,
//       r:Math.random()*1.5+0.5,
//       vx:(Math.random()-.5)*0.25, vy:(Math.random()-.5)*0.25,
//       a:Math.random()
//     }));
//   }
//   function draw(){
//     ctx.clearRect(0,0,W,H);
//     dots.forEach(d=>{
//       d.x+=d.vx; d.y+=d.vy;
//       if(d.x<0)d.x=W; if(d.x>W)d.x=0;
//       if(d.y<0)d.y=H; if(d.y>H)d.y=0;
//       ctx.beginPath();
//       ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
//       ctx.fillStyle=`rgba(232,168,100,${d.a*0.5})`;
//       ctx.fill();
//     });
//     requestAnimationFrame(draw);
//   }
//   resize(); make(); draw();
//   addEventListener("resize",()=>{ resize(); make(); });
// })();

// /* ─── REVEAL ─── */
// const revealObs = new IntersectionObserver(entries=>{
//   entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("vis"); revealObs.unobserve(e.target); } });
// },{ threshold:0.1, rootMargin:"0px 0px -30px 0px" });
// document.querySelectorAll(".reveal").forEach(el=>revealObs.observe(el));

// /* ─── COUNT UP ─── */
// function countUp(el,to,dec=0,dur=1200){
//   const start=performance.now();
//   (function step(now){
//     const t=Math.min((now-start)/dur,1);
//     const v=1-Math.pow(1-t,3);
//     el.textContent=(v*to).toFixed(dec);
//     if(t<1) requestAnimationFrame(step);
//     else el.textContent=to.toFixed(dec);
//   })(start);
// }

// /* ─── INIT ─── */
// function init(){
//   renderFilters(); renderMetrics(); renderProducts(); renderCart();

//   el.search.addEventListener("input",e=>{ state.q=e.target.value.trim().toLowerCase(); renderProducts(); });
//   el.sort.addEventListener("change",e=>{ state.sort=e.target.value; renderProducts(); });
//   el.catFilters.addEventListener("click",e=>{
//     const b=e.target.closest("[data-cat]"); if(!b)return;
//     state.cat=b.dataset.cat; renderFilters(); renderProducts();
//   });
//   el.grid.addEventListener("click",e=>{
//     const add=e.target.closest("[data-add]"); const rst=e.target.closest("[data-reset]");
//     if(rst){ resetFilters(); return; }
//     if(add) addToCart(add.dataset.add);
//   });
//   el.cartItems.addEventListener("click",e=>{
//     const b=e.target.closest("[data-action]"); if(!b)return;
//     updateCart(b.dataset.pid,b.dataset.action);
//   });
//   el.cartToggle.addEventListener("click",()=>{
//     if(isMobile()){ setCart(!document.body.classList.contains("cart-open")); return; }
//     el.cartPanel.scrollIntoView({behavior:"smooth",block:"start"});
//   });
//   el.cartClose.addEventListener("click",()=>setCart(false));
//   el.backdrop.addEventListener("click",()=>setCart(false));
//   el.checkout.addEventListener("click",()=>{
//     if(!cartCount()){ toast("Add something to your cart first."); return; }
//     toast("Checkout ready for backend wiring ✓"); setCart(false);
//   });
//   el.nlForm.addEventListener("submit",e=>{
//     e.preventDefault();
//     if(!el.nlForm.reportValidity())return;
//     el.nlStatus.textContent="You're on the list — seasonal drops coming your way ✓";
//     el.nlForm.reset();
//   });
//   document.addEventListener("keydown",e=>{ if(e.key==="Escape") setCart(false); });
//   addEventListener("resize",()=>{ if(!isMobile()) setCart(false); });

//   /* Back to top */
//   addEventListener("scroll",()=>{
//     el.backToTop.classList.toggle("show",scrollY>600);
//   },{ passive:true });
//   el.backToTop.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

//   /* 3D card tilt */
//   document.addEventListener("mousemove",e=>{
//     document.querySelectorAll(".pcard").forEach(card=>{
//       const r=card.getBoundingClientRect();
//       const cx=r.left+r.width/2, cy=r.top+r.height/2;
//       const dx=(e.clientX-cx)/r.width*18;
//       const dy=(e.clientY-cy)/r.height*18;
//       const dist=Math.hypot(e.clientX-cx,e.clientY-cy);
//       if(dist<250){
//         card.style.transform=`perspective(700px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(-5px)`;
//       } else {
//         card.style.transform="";
//       }
//     });
//   });
//   document.addEventListener("mouseleave",()=>{
//     document.querySelectorAll(".pcard").forEach(c=>c.style.transform="");
//   });
// }

// /* ─── METRICS ─── */
// function renderMetrics(){
//   const cats=new Set(products.map(p=>p.cat));
//   const avg=products.reduce((s,p)=>s+p.rating,0)/products.length;
//   countUp(el.colMetric,cats.size,0);
//   countUp(el.ratingMetric,parseFloat(avg.toFixed(1)),1);
//   el.shipMetric.textContent="48 hrs";
// }

// /* ─── FILTERS ─── */
// function renderFilters(){
//   const cats=["All",...new Set(products.map(p=>p.cat))];
//   el.catFilters.innerHTML=cats.map(c=>`<button class="chip${state.cat===c?" active":""}" data-cat="${c}">${c}</button>`).join("");
// }

// /* ─── PRODUCTS ─── */
// function renderProducts(){
//   const list=getProducts();
//   el.count.textContent=`${list.length} ${list.length===1?"product":"products"}`;
//   el.catLabel.textContent=state.cat==="All"?"All categories":`Showing ${state.cat}`;

//   if(!list.length){
//     el.grid.innerHTML=`<div class="empty-state"><h3>Nothing matches that search.</h3><p>Try a different term or category.</p><button class="btn btn-ghost" data-reset style="margin-top:0">Reset filters</button></div>`;
//     return;
//   }

//   el.grid.innerHTML=list.map((p,i)=>`
//     <article class="pcard" style="animation-delay:${i*50}ms;--tone:${p.tone}60;--tone-mid:${p.tone}55;--tone-deep:${p.tone}30">
//       <div class="pcard-media">
//         <div class="pcard-media-inner"></div>
//         <div class="pcard-shape">
//           <div class="pcard-shape-inner"></div>
//         </div>
//         <div class="pcard-glow"></div>
//         <span class="pcard-badge">${p.badge}</span>
//       </div>
//       <div class="pcard-body">
//         <p class="pcard-cat">${p.cat}</p>
//         <div class="pcard-row">
//           <h3>${p.name}</h3>
//           <span class="pcard-price">${fmt.format(p.price)}</span>
//         </div>
//         <p class="pcard-desc">${p.desc}</p>
//         <div class="pcard-foot">
//           <span class="pcard-rating"><span>★</span> ${p.rating.toFixed(1)}</span>
//           <span class="pcard-rating">Free wrap</span>
//         </div>
//         <button class="add-btn" data-add="${p.id}">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
//           Add to cart
//         </button>
//       </div>
//     </article>`).join("");
// }

// function getProducts(){
//   return products
//     .filter(p=>(state.cat==="All"||p.cat===state.cat)&&`${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(state.q))
//     .sort((a,b)=>{
//       if(state.sort==="price-asc")  return a.price-b.price;
//       if(state.sort==="price-desc") return b.price-a.price;
//       if(state.sort==="rating-desc")return b.rating-a.rating;
//       if(state.sort==="newest")     return b.date-a.date;
//       return a.rank-b.rank;
//     });
// }

// /* ─── CART ─── */
// function renderCart(){
//   const items=state.cart.map(i=>{ const p=products.find(x=>x.id===i.id); return p?{...p,qty:i.qty}:null; }).filter(Boolean);
//   const total=items.reduce((s,i)=>s+i.price*i.qty,0);
//   const count=cartCount();

//   el.cartCount.textContent=count;
//   el.cartTotal.textContent=fmt.format(total);
//   el.cartToggle.setAttribute("aria-expanded",String(document.body.classList.contains("cart-open")));

//   const pct=Math.min((total/FREE_SHIP)*100,100);
//   el.shipBar.style.display=count?"block":"none";
//   el.shipFill.style.width=`${pct}%`;

//   if(!items.length){
//     el.cartSummary.textContent="Your cart is empty.";
//     el.cartItems.innerHTML=`<div class="empty-state" style="margin:0"><h3>Nothing here yet.</h3><p>Start with a warm lamp or a gift-ready set.</p></div>`;
//     el.shipMsg.textContent=`Free shipping starts at ${fmt.format(FREE_SHIP)}.`;
//     return;
//   }

//   el.cartSummary.textContent=`${count} item${count===1?"":"s"} selected.`;
//   el.cartItems.innerHTML=items.map(i=>`
//     <article class="citem">
//       <div>
//         <h4>${i.name}</h4>
//         <p class="citem-cat">${i.cat}</p>
//         <p class="citem-price">${fmt.format(i.price)} each</p>
//         <div class="qty-row">
//           <button class="qty-btn" data-action="dec" data-pid="${i.id}" aria-label="Decrease">−</button>
//           <span class="qty-val">${i.qty}</span>
//           <button class="qty-btn" data-action="inc" data-pid="${i.id}" aria-label="Increase">+</button>
//           <button class="rm-btn" data-action="rm" data-pid="${i.id}">Remove</button>
//         </div>
//       </div>
//       <span class="citem-total">${fmt.format(i.price*i.qty)}</span>
//     </article>`).join("");

//   el.shipMsg.textContent=total>=FREE_SHIP
//     ? "🎉 Free shipping unlocked!"
//     : `Add ${fmt.format(FREE_SHIP-total)} more for free shipping.`;
// }

// function addToCart(id){
//   const item=state.cart.find(i=>i.id===id);
//   if(item) item.qty++; else state.cart.push({id,qty:1});
//   saveCart(); renderCart();
//   el.cartCount.classList.remove("pop");
//   void el.cartCount.offsetWidth;
//   el.cartCount.classList.add("pop");
//   const p=products.find(x=>x.id===id);
//   toast(`${p?.name} added to cart`);
//   if(isMobile()) setCart(true);
// }

// function updateCart(id,action){
//   const item=state.cart.find(i=>i.id===id);
//   if(!item)return;
//   if(action==="inc") item.qty++;
//   if(action==="dec") item.qty--;
//   if(action==="rm"||item.qty<=0) state.cart=state.cart.filter(i=>i.id!==id);
//   saveCart(); renderCart();
// }

// function resetFilters(){
//   state.cat="All"; state.q=""; state.sort="featured";
//   el.search.value=""; el.sort.value="featured";
//   renderFilters(); renderProducts();
// }

// function setCart(open){
//   if(!isMobile()){
//     document.body.classList.remove("cart-open");
//     el.backdrop.hidden=true;
//     el.cartToggle.setAttribute("aria-expanded","false");
//     return;
//   }
//   document.body.classList.toggle("cart-open",open);
//   el.backdrop.hidden=!open;
//   el.cartToggle.setAttribute("aria-expanded",String(open));
// }

// function cartCount(){ return state.cart.reduce((s,i)=>s+i.qty,0); }
// function isMobile(){ return innerWidth<=680; }

// let toastTimer;
// function toast(msg){
//   el.toast.textContent=msg;
//   el.toast.classList.add("show");
//   clearTimeout(toastTimer);
//   toastTimer=setTimeout(()=>el.toast.classList.remove("show"),2600);
// }

// function loadCart(){
//   try{
//     const raw=localStorage.getItem(STORE_KEY);
//     if(!raw)return[];
//     const p=JSON.parse(raw);
//     return Array.isArray(p)?p.filter(i=>i?.id&&i?.qty).map(i=>({id:i.id,qty:Math.max(1,Math.floor(i.qty))})):[];
//   }catch{return[];}
// }
// function saveCart(){ localStorage.setItem(STORE_KEY,JSON.stringify(state.cart)); }

// init();
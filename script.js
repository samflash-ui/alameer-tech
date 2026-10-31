const seedProducts = [
 {id:101,name:"هاتف ذكي Pro",category:"phones",price:3899,oldPrice:4299,tag:"الأكثر مبيعًا",rating:"★ 4.9",image:"https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=80",description:"هاتف ذكي متطور بأداء سريع، شاشة رائعة وكاميرا احترافية."},
 {id:102,name:"سماعات عزل الضوضاء",category:"audio",price:799,oldPrice:999,tag:"عرض خاص",rating:"★ 4.8",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",description:"صوت غني وعزل فعّال للضوضاء لتجربة استماع غامرة."},
 {id:103,name:"حاسوب محمول Ultra",category:"computers",price:5299,oldPrice:5799,tag:"جديد",rating:"★ 4.9",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",description:"قوة أداء وأناقة تصميم للعمل والإبداع والترفيه."},
 {id:104,name:"ساعة ذكية Active",category:"accessories",price:649,oldPrice:749,tag:"اختيارنا",rating:"★ 4.7",image:"https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=80",description:"تابع نشاطك اليومي وإشعاراتك من معصمك بكل أناقة."},
 {id:105,name:"كاميرا رقمية صغيرة",category:"accessories",price:1199,oldPrice:1399,tag:"مميز",rating:"★ 4.8",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",description:"التقط لحظاتك بجودة عالية وتحكم إبداعي سهل."},
 {id:106,name:"مكبر صوت لاسلكي",category:"audio",price:399,oldPrice:499,tag:"قيمة رائعة",rating:"★ 4.6",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",description:"صوت واضح وقوي في تصميم أنيق مناسب لكل مكان."},
 {id:107,name:"لوحة مفاتيح ميكانيكية",category:"computers",price:459,oldPrice:529,tag:"للمحترفين",rating:"★ 4.8",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",description:"استجابة دقيقة وتجربة كتابة مريحة بتصميم مميز."},
 {id:108,name:"شاحن سريع متعدد",category:"accessories",price:149,oldPrice:199,tag:"عملي",rating:"★ 4.7",image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80",description:"شحن سريع وموثوق لأجهزتك اليومية."}
];
seedProducts[0].image="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=80";
seedProducts[0].image="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=80";
seedProducts[7].image="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80";
let products = JSON.parse(localStorage.getItem("alameer-products") || "null") || seedProducts;
let cart = JSON.parse(localStorage.getItem("alameer-cart") || "[]");
let activeCategory="all";
let currentUser=JSON.parse(localStorage.getItem("alameer-user")||"null");
const $=id=>document.getElementById(id);
const grid=$("productGrid"),search=$("searchInput"),toast=$("toast");
function money(n){return Number(n).toLocaleString("en-US")+" ر.س"}
function saveProducts(){localStorage.setItem("alameer-products",JSON.stringify(products))}
function renderProducts(){
 const term=search.value.trim().toLowerCase();
 const list=products.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&p.name.toLowerCase().includes(term));
 grid.innerHTML=list.map(p=>`<article class="product-card">
 <div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}" data-detail="${p.id}"><span class="tag">${p.tag||"منتج مميز"}</span><button class="favorite" data-fav="${p.id}" aria-label="إضافة للمفضلة">♡</button><button class="add-btn" data-add="${p.id}">＋ أضف إلى السلة</button></div>
 <div class="product-info"><h3 data-detail="${p.id}">${p.name}</h3><div class="product-meta"><span class="price">${money(p.price)}</span><span class="rating">${p.rating||"★ 4.8"}</span></div></div></article>`).join("");
 $("emptyState").hidden=list.length>0;
}
function renderCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);$("cartCount").textContent=count;
 $("cartEmpty").style.display=count?"none":"block";
 $("cartItems").innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);if(!p)return "";return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity"><button data-qty="${p.id}" data-delta="-1">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><button class="remove" data-remove="${p.id}">×</button></div>`}).join("");
 $("cartTotal").textContent=money(cart.reduce((s,i)=>s+(products.find(p=>p.id===i.id)?.price||0)*i.qty,0));
 localStorage.setItem("alameer-cart",JSON.stringify(cart));
}
function toastMsg(t){toast.textContent=t;toast.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>toast.classList.remove("show"),2300)}
function addCart(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});renderCart();toastMsg("أضيف المنتج إلى سلتك")}
function openCart(){$("cartDrawer").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");$("shade").classList.add("show")}
function closeCart(){$("cartDrawer").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");$("shade").classList.remove("show")}
function showModal(content){$("modalContent").innerHTML=content;$("modalBackdrop").classList.add("show")}
function closeModal(){$("modalBackdrop").classList.remove("show")}
function productDetails(id){let p=products.find(x=>x.id===id);if(!p)return;showModal(`<span class="kicker">تفاصيل المنتج</span><img class="detail-image" src="${p.image}" alt="${p.name}"><h2>${p.name}</h2><div class="price">${money(p.price)} <span class="rating">${p.rating||"★ 4.8"}</span></div><p>${p.description||"منتج تقني مختار بعناية من الأمير تيك."}</p><button class="btn gold" data-modal-add="${p.id}">أضف إلى السلة ←</button>`)}
function loginModal(){showModal(`<span class="kicker">مرحبًا بك</span><h2>تسجيل الدخول</h2><p>أدخل بياناتك للوصول إلى تجربة تسوق مخصصة.</p><form id="loginForm"><label>البريد الإلكتروني</label><input type="email" name="email" placeholder="name@example.com" required><label>كلمة المرور</label><input type="password" name="password" placeholder="••••••••" minlength="4" required><button class="btn gold full">دخول</button><p>نسخة تجريبية: يتم حفظ اسم المستخدم محليًا فقط، ولا يوجد تحقق خادمي.</p></form>`)}
function checkoutModal(){if(!cart.length){toastMsg("سلة التسوق فارغة");return}showModal(`<span class="kicker">خطوة أخيرة</span><h2>إتمام الطلب</h2><p>أدخل بيانات التواصل والتوصيل. هذه نسخة واجهة تجريبية ولا ترسل الطلب إلى خادم.</p><form id="checkoutForm"><label>الاسم الكامل</label><input name="name" required value="${currentUser?.name||""}" placeholder="الاسم كما تريد استلام الطلب"><label>البريد الإلكتروني</label><input name="email" type="email" required value="${currentUser?.email||""}" placeholder="name@example.com"><label>العنوان</label><textarea name="address" rows="2" required placeholder="المدينة، الحي، الشارع"></textarea><label>طريقة الدفع التجريبية</label><select name="payment"><option>الدفع عند الاستلام (تجريبي)</option><option>بطاقة (غير مفعّل)</option></select><div class="total"><span>إجمالي السلة</span><b>${$("cartTotal").textContent}</b></div><button class="btn gold full">تأكيد الطلب التجريبي</button></form>`)}
function adminModal(){showModal(`<span class="kicker">إدارة المتجر</span><h2>لوحة إدارة المنتجات</h2><p>أضف منتجًا أو احذف منتجًا من قائمة المتجر. التغييرات تحفظ في هذا المتصفح فقط.</p><form id="adminForm"><label>اسم المنتج</label><input name="name" required placeholder="مثال: هاتف ذكي جديد"><label>التصنيف</label><select name="category"><option value="phones">هواتف</option><option value="audio">صوتيات</option><option value="computers">حواسيب</option><option value="accessories">إكسسوارات</option></select><label>السعر (ر.س)</label><input name="price" type="number" min="1" required><label>رابط الصورة</label><input name="image" type="url" placeholder="https://..."><label>وصف المنتج</label><textarea name="description" rows="2"></textarea><button class="btn gold full">إضافة المنتج</button></form><div class="admin-list">${products.map(p=>`<div class="admin-item"><span>${p.name} — ${money(p.price)}</span><button data-delete-product="${p.id}">حذف</button></div>`).join("")}</div>`)}
grid.addEventListener("click",e=>{let add=e.target.closest("[data-add]"),detail=e.target.closest("[data-detail]"),fav=e.target.closest("[data-fav]");if(add)addCart(Number(add.dataset.add));if(detail)productDetails(Number(detail.dataset.detail));if(fav){fav.textContent=fav.textContent==="♡"?"♥":"♡";fav.style.color="#bd5c63";toastMsg("تم تحديث المفضلة (مؤقتًا)")}})
$("filters").addEventListener("click",e=>{let b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.querySelector(".quick-cats").addEventListener("click",e=>{let a=e.target.closest("[data-jump]");if(a){activeCategory=a.dataset.jump;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.category===activeCategory));renderProducts()}});
search.addEventListener("input",renderProducts);
$("cartBtn").onclick=openCart;$("closeCart").onclick=closeCart;$("shade").onclick=closeCart;
$("menuBtn").onclick=()=>$("nav").classList.toggle("show");
document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>$("nav").classList.remove("show"));
$("accountBtn").onclick=()=>currentUser?showModal(`<span class="kicker">حسابك</span><h2>أهلًا ${currentUser.name}</h2><p>${currentUser.email}</p><button class="btn ghost" id="logoutBtn">تسجيل الخروج</button><button class="btn gold" id="openAdmin">إدارة المنتجات</button>`):loginModal();
$("closeModal").onclick=closeModal;$("modalBackdrop").addEventListener("click",e=>{if(e.target===$("modalBackdrop"))closeModal()});
$("modalContent").addEventListener("click",e=>{let add=e.target.closest("[data-modal-add]");if(add){addCart(Number(add.dataset.modalAdd));closeModal()}if(e.target.id==="logoutBtn"){currentUser=null;localStorage.removeItem("alameer-user");closeModal();toastMsg("تم تسجيل الخروج")}if(e.target.id==="openAdmin")adminModal();let del=e.target.closest("[data-delete-product]");if(del){products=products.filter(p=>p.id!==Number(del.dataset.deleteProduct));saveProducts();renderProducts();adminModal();toastMsg("تم حذف المنتج")}});
$("modalContent").addEventListener("submit",e=>{e.preventDefault();if(e.target.id==="loginForm"){let fd=new FormData(e.target);currentUser={name:fd.get("email").split("@")[0],email:fd.get("email")};localStorage.setItem("alameer-user",JSON.stringify(currentUser));closeModal();toastMsg("تم تسجيل الدخول محليًا")}if(e.target.id==="checkoutForm"){let fd=new FormData(e.target);showModal(`<span class="kicker">تم تسجيل الطلب التجريبي</span><h2>شكرًا لك يا ${fd.get("name")}!</h2><p>تم عرض تأكيد محلي فقط. لم يتم إرسال الطلب أو تنفيذ أي عملية دفع.</p><button class="btn gold full" id="finishOrder">متابعة التسوق</button>`);cart=[];renderCart()}if(e.target.id==="adminForm"){let fd=new FormData(e.target);products.unshift({id:Date.now(),name:fd.get("name"),category:fd.get("category"),price:Number(fd.get("price")),tag:"أضيف حديثًا",rating:"★ 5.0",image:fd.get("image")||"https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=700&q=80",description:fd.get("description")});saveProducts();renderProducts();adminModal();toastMsg("تمت إضافة المنتج") }});
$("modalContent").addEventListener("click",e=>{if(e.target.id==="finishOrder")closeModal()});
$("checkoutBtn").onclick=checkoutModal;
$("newsletterForm").addEventListener("submit",e=>{e.preventDefault();toastMsg("شكرًا لاشتراكك! (تجريبي)");e.target.reset()});
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();

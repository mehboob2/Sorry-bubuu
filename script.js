const screens=[...document.querySelectorAll('.screen')];
const bar=document.querySelector('#progressBar');
const label=document.querySelector('#stepLabel');
let current=0;
const visited=new Set([0]);

function show(n){
  n=Number(n);
  if(!Number.isInteger(n) || n<0 || n>=screens.length) return;
  if(n>current && !visited.has(current)) return;
  const previous=current;
  screens[previous].classList.remove('active');
  current=n;
  screens[current].classList.add('active');
  visited.add(current);
  const pct=((current+1)/screens.length)*100;
  if(bar) bar.style.width=pct+'%';
  if(label) label.textContent=String(current+1).padStart(2,'0')+' / '+String(screens.length).padStart(2,'0');
  window.scrollTo({top:0,behavior:'smooth'});
  try{localStorage.setItem('sorry-progress',String(current));}catch(e){}
  if(current===screens.length-1) burstHearts();
}

/* One delegated click handler makes every “Aage chalo” button reliable on GitHub Pages/mobile,
   even after dynamic UI changes. */
document.addEventListener('click',(event)=>{
  const next=event.target.closest('[data-next]');
  if(!next) return;
  event.preventDefault();
  event.stopPropagation();
  if(!next.disabled) show(current+1);
});

const replies={
 listen:'Toh pakka, jaanu. Pehle tumhari baat samajhna, phir apni side bolna — ye difference main yaad rakhunga. 💙',
 patience:'Samajh gaya. Har cheez ka instant reaction zaroori nahi. Kabhi pause karna bhi pyaar hota hai. 🌙',
 actions:'Fair. Words toh koi bhi bol sakta hai. Isliye meri taraf se real apology ka proof meri consistency honi chahiye. ✦'
};
document.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelector('#choiceReply').textContent=replies[b.dataset.choice];setTimeout(()=>show(3),1100)}));

const field=document.querySelector('#heartField'),hint=document.querySelector('#heartHint'),heartMessage=document.querySelector('#heartMessage');
let collected=0;
const positions=[[15,22],[76,18],[44,70],[84,72],[52,36]];
const heartTexts=['Tumhari feelings important hain. 🤍','Ego se pehle understanding. 🌙','Silence ko punishment nahi banana. 💬','Consistency > temporary promises. ✦','Love ko safe feel karwana hai. 💙'];
positions.forEach(([x,y],i)=>{const b=document.createElement('button');b.className='collect-heart';b.innerHTML='♥';b.setAttribute('aria-label','Promise heart '+(i+1));b.style.left=x+'%';b.style.top=y+'%';b.style.animationDelay=(i*.2)+'s';b.addEventListener('click',()=>{if(b.classList.contains('taken'))return;b.classList.add('taken');collected++;hint.textContent=collected+' / 5 hearts collected';heartMessage.textContent=heartTexts[i];if(collected===5){toast('Saare promises collect ho gaye. 💗');heartMessage.textContent='Aur in sabka matlab ek hi hai: main tumhe lightly nahi lena chahta. ❤️';setTimeout(()=>show(5),1000)}});field.appendChild(b)});

const checkContinue=document.querySelector('#checkContinue');
checkContinue.addEventListener('click',()=>{const checks=[...document.querySelectorAll('.checklist input')];if(checks.every(x=>x.checked))show(6);else toast('Jaanu, saare promises tick karo… warna main phir se sorry bolunga. 😭🤍')});

const mood={space:'Theek hai. Main tumhe space dunga. Tumhe apne feelings ko process karne ke liye permission lene ki zarurat nahi. 🌙',talk:'Then I am here. Main tumhari baat jeetne ke liye nahi, samajhne ke liye sununga. 💬',hug:'Agar possible hota toh abhi ek long, safe hug deta. Koi explanation nahi — bas hug. 🫂',time:'Take your time, jaanu. Tumhe instantly normal hone ki zarurat nahi. ⏳'};
document.querySelectorAll('[data-mood]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-mood]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelector('#moodReply').textContent=mood[b.dataset.mood];setTimeout(()=>show(7),1300)}));

const range=document.querySelector('#sorryRange'),meterValue=document.querySelector('#meterValue'),meterReply=document.querySelector('#meterReply');
range.addEventListener('input',()=>{const v=Number(range.value);meterValue.textContent=v+'%';meterReply.textContent=v<35?'Accha… matlab sirf words kaafi nahi. 😭':v<70?'Samajh gaya — thoda words, zyada consistency. 💙':'Oof 😭 toh phir mujhe genuinely actions se prove karna padega. Deal. ❤️'});

const reactions={hug:'Theek hai… main pehle chup ho jaunga aur hug accept karunga. 🫂',talk:'Okay, explain karunga — but bina defensive hue. 💬',look:'🥺 Ye look dangerous hai. Iske saamne mera “but…” already khatam.',smile:'Aisi smile mil gayi toh promise hai, is baar lesson seriously yaad rakhunga. 😌'};
document.querySelectorAll('[data-reaction]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-reaction]').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelector('#reactionReply').textContent=reactions[b.dataset.reaction];setTimeout(()=>show(9),1200)}));

const envelope=document.querySelector('#envelope'),openEnvelope=document.querySelector('#openEnvelope'),after=document.querySelector('#afterLetter');
openEnvelope.addEventListener('click',()=>{envelope.classList.add('open');document.querySelector('#envelopeHint').textContent='Take your time, jaanu. Ye letter jaldi mein padhne wala nahi hai. ❤️';setTimeout(()=>after.classList.remove('hidden'),1000)});

const restart=document.querySelector('#restart');
restart.addEventListener('click',()=>{current=0;visited.clear();visited.add(0);document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));screens[0].classList.add('active');bar.style.width=(100/screens.length)+'%';label.textContent='01 / '+String(screens.length).padStart(2,'0');window.scrollTo({top:0,behavior:'smooth'});localStorage.removeItem('sorry-progress')});

const secret=document.querySelector('#tinySecret'),secretReply=document.querySelector('#secretReply');
secret.addEventListener('click',()=>{secretReply.textContent='🤫 Secret: agar tum yahan tak aa gayi ho, toh meri taraf se ek extra sorry — un sab little moments ke liye jahan mujhe tumhe aur better samajhna chahiye tha. ❤️';secret.classList.add('hidden')});

function burstHearts(){const root=document.querySelector('.final');for(let i=0;i<18;i++){const h=document.createElement('span');h.className='burst-heart';h.textContent=['♥','♡','✦'][i%3];h.style.left=(8+Math.random()*84)+'%';h.style.top=(8+Math.random()*84)+'%';h.style.animationDelay=(Math.random()*1.8)+'s';root.appendChild(h);setTimeout(()=>h.remove(),4200)}}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('toast-show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('toast-show'),1900)}
const saved=Number(localStorage.getItem('sorry-progress'));if(saved>0&&saved<screens.length-1)setTimeout(()=>toast('Last chapter saved hai. Tum chaaho toh beginning se phir padh sakti ho. 💙'),900);

/* Prevent accidental text-selection while rapidly tapping interactive controls. */
document.querySelectorAll('button').forEach(btn=>{btn.addEventListener('touchend',()=>{}, {passive:true});});

// ArteSV - prototipo académico, sin servidor ni datos personales reales.
const obras = [
 {id:1,titulo:'Raíces de color',autor:'María Campos',categoria:'Pintura',imagen:'img/obra-1.svg',descripcion:'Composición abstracta inspirada en la energía y diversidad de la cultura salvadoreña.'},
 {id:2,titulo:'Ciudad despierta',autor:'Diego Reyes',categoria:'Ilustración',imagen:'img/obra-2.svg',descripcion:'Formas geométricas que representan el ritmo de una ciudad en constante movimiento.'},
 {id:3,titulo:'Luz de la tarde',autor:'Sofía López',categoria:'Fotografía',imagen:'img/obra-3.svg',descripcion:'Interpretación visual de un paisaje cálido al final del día.'},
 {id:4,titulo:'Memorias del mar',autor:'María Campos',categoria:'Pintura',imagen:'img/obra-4.svg',descripcion:'Colores y capas que evocan la fuerza del océano y los recuerdos.'},
 {id:5,titulo:'Geometría viva',autor:'Diego Reyes',categoria:'Ilustración',imagen:'img/obra-5.svg',descripcion:'Exploración de perspectivas, círculos y contrastes vibrantes.'},
 {id:6,titulo:'Horizonte tranquilo',autor:'Sofía López',categoria:'Fotografía',imagen:'img/obra-6.svg',descripcion:'Paisaje conceptual de montañas bajo un cielo de tonos suaves.'}
];
const gallery=document.getElementById('gallery');
const status=document.getElementById('galleryStatus');
const dialog=document.getElementById('artDialog');
function renderGallery(category='todos'){
 const resultado=category==='todos'?obras:obras.filter(o=>o.categoria===category);
 gallery.innerHTML=resultado.map(o=>`<button type="button" class="work" data-id="${o.id}" aria-label="Ver detalle de ${o.titulo}"><span class="work-image"><img src="${o.imagen}" alt="Ilustración conceptual de ${o.titulo}" loading="lazy"></span><span class="work-info"><span><strong>${o.titulo}</strong><small>${o.autor} · ${o.categoria}</small></span><span class="arrow">↗</span></span></button>`).join('');
 status.textContent=`${resultado.length} obras visibles`;
}
renderGallery();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
 btn.classList.add('active');btn.setAttribute('aria-pressed','true');renderGallery(btn.dataset.filter);
}));
gallery.addEventListener('click',e=>{
 const card=e.target.closest('[data-id]');if(!card)return;
 const obra=obras.find(o=>o.id===Number(card.dataset.id));if(!obra)return;
 document.getElementById('dialogVisual').innerHTML=`<img src="${obra.imagen}" alt="${obra.titulo}">`;
 document.getElementById('dialogCategory').textContent=obra.categoria;
 document.getElementById('dialogTitle').textContent=obra.titulo;
 document.getElementById('dialogAuthor').textContent=`Artista: ${obra.autor}`;
 document.getElementById('dialogDescription').textContent=obra.descripcion;
 dialog.showModal();
});
document.getElementById('dialogClose').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const menuBtn=document.getElementById('menuBtn');const nav=document.getElementById('nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));
// Innovación solicitada: modo automático según la hora local del dispositivo.
const hora=new Date().getHours();document.body.classList.toggle('night',hora<6||hora>=18);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('contactForm').addEventListener('submit',e=>{
 e.preventDefault();const form=e.currentTarget;const msg=document.getElementById('formMessage');
 if(!form.checkValidity()){msg.textContent='Revisá nombre, correo y mensaje (mínimo 10 caracteres).';msg.style.color='#b43b34';form.reportValidity();return}
 msg.textContent='✓ Datos validados. Este prototipo no envía mensajes.';msg.style.color='#287457';form.reset();
});

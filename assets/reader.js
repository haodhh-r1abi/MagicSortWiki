(() => {
  const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
  // Tables retain every source row in the DOM; pagination limits the visible slice only.
  document.querySelectorAll('table.paged-table').forEach(table => {
    const rows = Array.from(table.tBodies[0]?.rows || []), size = 25;
    if (!rows.length) return;
    const tools = document.createElement('div'); tools.className = 'table-tools';
    const input = document.createElement('input'); input.type='search'; input.placeholder='Lọc toàn bộ bảng…'; input.setAttribute('aria-label','Lọc tất cả dòng trong bảng');
    const prev = document.createElement('button'); prev.textContent='Trước'; prev.type='button';
    const next = document.createElement('button'); next.textContent='Tiếp'; next.type='button';
    const first = document.createElement('button'); first.textContent='Đầu'; first.type='button';first.setAttribute('aria-label','Trang đầu');
    const last = document.createElement('button'); last.textContent='Cuối'; last.type='button';last.setAttribute('aria-label','Trang cuối');
    const count = document.createElement('span'); count.className='table-count'; count.setAttribute('aria-live','polite');
    tools.append(input,first,prev,next,last,count); table.parentElement.before(tools);
    const haystack=rows.map(r=>normalize(r.textContent)); let page=0, selected=rows;
    const draw=()=>{
      const max=Math.max(0,Math.ceil(selected.length/size)-1); page=Math.min(page,max);
      rows.forEach(r=>r.hidden=true); selected.slice(page*size,(page+1)*size).forEach(r=>r.hidden=false);
      first.disabled=prev.disabled=page===0; last.disabled=next.disabled=page>=max;
      count.textContent=selected.length?`${page*size+1}–${Math.min((page+1)*size,selected.length)} / ${selected.length} dòng · tổng ${rows.length}`:`0 kết quả · tổng ${rows.length} dòng`;
      table.dataset.totalRows=rows.length; table.dataset.filteredRows=selected.length;
    };
    input.addEventListener('input',()=>{const q=normalize(input.value);selected=rows.filter((r,i)=>haystack[i].includes(q));page=0;draw()});
    prev.addEventListener('click',()=>{page--;draw()});next.addEventListener('click',()=>{page++;draw()});draw();
    first.addEventListener('click',()=>{page=0;draw()});last.addEventListener('click',()=>{page=Math.max(0,Math.ceil(selected.length/size)-1);draw()});
  });
  const ucSection=document.getElementById('use-case');
  if(ucSection){
    const label=document.createElement('label');label.className='uc-filter';label.textContent='Tìm use case trong tính năng này';
    const input=document.createElement('input');input.type='search';input.placeholder='ID, tình huống, bước hoặc kết quả…';label.append(input);
    ucSection.querySelector('h2')?.after(label);const ucs=Array.from(ucSection.querySelectorAll('details.uc'));
    input.addEventListener('input',()=>{const q=normalize(input.value);ucs.forEach(u=>u.hidden=!normalize(u.textContent).includes(q))});
    const toggle=ucSection.querySelector('.toggle-all');if(toggle)toggle.textContent='Mở/đóng UC của trang này';
  }
  function openHash(){
    if(!location.hash)return; let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
    const target=document.getElementById(id);if(!target)return;
    for(let el=target;el;el=el.parentElement){if(el.tagName==='DETAILS')el.open=true;el.hidden=false}
    requestAnimationFrame(()=>{target.scrollIntoView({block:'start',behavior:'instant'});target.tabIndex=-1;target.focus({preventScroll:true})});
  }
  addEventListener('hashchange',openHash);setTimeout(openHash,0);
  document.querySelectorAll('.runtime-case[id]').forEach(c=>{
    const link=document.createElement('a');link.className='reader-permalink';link.href='#'+c.id;link.textContent='Liên kết trực tiếp';c.querySelector('summary')?.after(link);
  });
  const menu=document.getElementById('menuBtn'),sidebar=document.getElementById('sidebar');
  const syncMenu=()=>{if(menu&&sidebar){const open=sidebar.classList.contains('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Đóng danh mục':'Mở danh mục')}};
  if(sidebar){new MutationObserver(syncMenu).observe(sidebar,{attributes:true,attributeFilter:['class']});sidebar.addEventListener('click',e=>{if(e.target.closest('a'))sidebar.classList.remove('open')})}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sidebar?.classList.contains('open')){sidebar.classList.remove('open');menu?.focus()}});
  document.addEventListener('click',e=>{if(sidebar?.classList.contains('open')&&!sidebar.contains(e.target)&&!menu?.contains(e.target))sidebar.classList.remove('open')});
  // Capture before the inherited thumbnail handler; native dialog provides focus containment and Escape.
  let dialog,shots=[],index=0,opener;
  function showImage(){
    const link=shots[index],img=dialog.querySelector('img'),caption=dialog.querySelector('figcaption'),original=dialog.querySelector('.original-link');
    img.src=link.href;img.alt=link.dataset.caption||link.querySelector('img')?.alt||'Ảnh gốc';caption.textContent=img.alt;
    original.href=link.href;dialog.querySelector('.image-count').textContent=`${index+1} / ${shots.length}`;
    const focused=document.activeElement;
    dialog.querySelector('[data-prev]').disabled=index===0;dialog.querySelector('[data-next]').disabled=index===shots.length-1;
    // Disabling the focused arrow can blur focus to BODY; keep keyboard navigation in the modal.
    if(dialog.open&&dialog.contains(focused)&&focused.matches('button:disabled')){
      (dialog.querySelector('[data-next]:not(:disabled),[data-prev]:not(:disabled)')||dialog.querySelector('[data-close]')).focus({preventScroll:true});
    }
  }
  document.addEventListener('click',e=>{
    const link=e.target.closest('a.reader-shot,a.shot');if(!link||!link.querySelector('img'))return;
    e.preventDefault();e.stopImmediatePropagation();opener=link;
    const group=link.closest('.design-thumbs,.storyboard,.gallery,.uc-shots,.review-thumbs')||link.parentElement;
    shots=Array.from(group.querySelectorAll('a.reader-shot,a.shot'));if(!shots.includes(link))shots=[link];index=shots.indexOf(link);
    if(!dialog){
      dialog=document.createElement('dialog');dialog.className='reader-lightbox';dialog.setAttribute('aria-label','Ảnh gốc và chú thích');
      dialog.innerHTML='<div class="lightbox-tools"><button data-prev type="button" aria-label="Ảnh trước">←</button><span class="image-count"></span><button data-next type="button" aria-label="Ảnh tiếp">→</button><button data-close type="button">Đóng ✕</button></div><figure><img alt=""><figcaption></figcaption></figure><a class="original-link" target="_blank" rel="noopener">Mở file ảnh gốc</a>';
      document.body.append(dialog);dialog.querySelector('[data-prev]').onclick=()=>{if(index>0){index--;showImage()}};dialog.querySelector('[data-next]').onclick=()=>{if(index<shots.length-1){index++;showImage()}};dialog.querySelector('[data-close]').onclick=()=>dialog.close();
      dialog.addEventListener('close',()=>opener?.focus());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
      dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'&&index>0){index--;showImage()}if(event.key==='ArrowRight'&&index<shots.length-1){index++;showImage()}});
    }
    showImage();dialog.showModal();
  },true);
})();

(()=>{'use strict';
const cases=Array.isArray(window.KB_CASES)?window.KB_CASES:[];
const $=id=>document.getElementById(id);
const fields={search:$('search'),module:$('module'),status:$('status'),risk:$('risk')};
const results=$('results'),empty=$('empty'),more=$('more'),count=$('count');
const accent=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let limit=14, matched=[];
const safeText=(tag,text,cls)=>{const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=text||'';return el;};
function populate(select,values){[...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(x=>{const opt=document.createElement('option');opt.value=x;opt.textContent=x;select.appendChild(opt)})}
populate(fields.module,cases.map(x=>x.modulo));populate(fields.status,cases.map(x=>x.status));populate(fields.risk,cases.map(x=>x.risco));
$('stat-cases').textContent=cases.length;
$('stat-confirmed').textContent=cases.filter(x=>x.status==='Confirmado').length;
$('stat-risk').textContent=cases.filter(x=>['Alto','Crítico'].includes(x.risco)).length;
const indexed=cases.map(row=>({...row,_q:accent([row.id,row.data,row.modulo,row.titulo,row.sintoma,row.causa,row.procedimento,row.observacoes,row.palavras_chave].join(' '))})).sort((a,b)=>String(b.data.split('/').reverse().join('-')).localeCompare(String(a.data.split('/').reverse().join('-'))));
function tag(text,cls){return safeText('span',text,'tag '+(cls||''))}
function block(label,value,cls){const div=document.createElement('div');div.className='detail-block '+(cls||'');div.append(safeText('h4',label),safeText('p',value||'Não registrado'));return div}
function makeCard(c){
 const details=document.createElement('details');details.className='case';
 const summary=document.createElement('summary');
 const main=document.createElement('div');main.className='case-main';
 main.append(safeText('h3',c.titulo),safeText('p',c.sintoma,'case-summary'));
 const tags=document.createElement('div');tags.className='tags';
 const statuscls=c.status==='Confirmado'?'status-ok':'status-warning';
 const riskcls=['Alto','Crítico'].includes(c.risco)?'risk-high':c.risco==='Médio'?'risk-medium':'risk-low';
 tags.append(tag(c.modulo),tag(c.status,statuscls),tag('Risco: '+c.risco,riskcls));
 main.appendChild(tags);
 summary.append(safeText('span',c.id,'case-index'),main,safeText('span','⌄','case-chevron'));
 const content=document.createElement('div');content.className='case-detail';
 const top=document.createElement('div');top.className='detail-grid';
 top.append(block('Sintoma',c.sintoma),block('Causa registrada',c.causa));
 content.append(top,block('Procedimento registrado',c.procedimento,'procedure'));
 if(c.observacoes)content.append(block('Ressalvas e observações',c.observacoes));
 const actions=document.createElement('div');actions.className='case-actions';
 actions.append(safeText('span','Registro: '+c.data+' · '+c.id,'case-meta'));
 const copy=safeText('button','Copiar procedimento','copy-button');copy.type='button';
 copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(c.procedimento||'');copy.textContent='✓ Copiado';}catch(e){copy.textContent='Cópia indisponível';}});
 actions.appendChild(copy);content.appendChild(actions);
 details.append(summary,content);return details;
}
function update(){
 const q=accent(fields.search.value.trim());
 matched=indexed.filter(c=>(!q||c._q.includes(q))&&(!fields.module.value||c.modulo===fields.module.value)&&(!fields.status.value||c.status===fields.status.value)&&(!fields.risk.value||c.risco===fields.risk.value));
 count.textContent=matched.length+' '+(matched.length===1?'caso encontrado':'casos encontrados');
 results.replaceChildren(...matched.slice(0,limit).map(makeCard));
 more.hidden=matched.length<=limit;
 empty.hidden=matched.length!==0;
}
Object.values(fields).forEach(el=>el.addEventListener(el===fields.search?'input':'change',()=>{limit=14;update()}));
$('clear').addEventListener('click',()=>{fields.search.value='';fields.module.value='';fields.status.value='';fields.risk.value='';limit=14;update();fields.search.focus()});
more.addEventListener('click',()=>{limit+=14;update()});
update();
})();
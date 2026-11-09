(function () {
  'use strict';

  const NEXUS_COMMAND = 'irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex';

  function legacyCopy(value) {
    const field = document.createElement('textarea');
    field.value = value;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  }
  async function copyText(value) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
      return legacyCopy(value);
    } catch (_error) {
      try { return legacyCopy(value); } catch (_ignored) { return false; }
    }
  }

  const requestTemplates = {
      regime: `Para solicitar a alteração do regime de apuração da empresa, é necessário encaminhar um e-mail para theneds@maxdata.com.br, utilizando o modelo abaixo e preenchendo os dados solicitados.

*Assunto: SOLICITAÇÃO DE ALTERAÇÃO DE REGIME*

Eu, [ *NOME* ], Telefone/WhatsApp: *(00) 00000-0000* , [ *CARGO/FUNÇÃO*] da empresa [ *RAZÃO SOCIAL*] , CNPJ *00.000.000/0000-0* , solicito a alteração do regime de apuração da empresa de [ *regime atual* ] para [*regime pretendido*] , com vigência a partir de [dd/mm/aaaa].
Motivo da mudança: [descrever brevemente o motivo].
Informo que o contato responsável pela contabilidade é: *[NOME DA CONTABILIDADE/ESCRITÓRIO], [RESPONSÁVEL], Telefone/WhatsApp: (00) 00000-0000 e E-mail: email@email.com.br.*
Assumo a veracidade das informações prestadas e autorizo o tratamento/regularização junto à contabilidade.`,
      estoque: `Para solicitar que o saldo de estoque de todos os produtos seja zerado, é necessário encaminhar um e-mail para theneds@maxdata.com.br, utilizando o modelo abaixo e preenchendo os dados solicitados.

*Assunto: SOLICITAÇÃO: ZERAR SALDO DE ESTOQUE*

Eu, [ *NOME* ], Telefone/WhatsApp: *(00) 00000-0000* , [ *CARGO/FUNÇÃO*] da empresa [ *RAZÃO SOCIAL*] , CNPJ *00.000.000/0000-0* , solicito que seja *ZERADO* o saldo de estoque de todos os meus produtos.
Motivo da mudança: [descrever brevemente o motivo].
Informo que o contato responsável pela contabilidade é: *[NOME DA CONTABILIDADE/ESCRITÓRIO], [RESPONSÁVEL], Telefone/WhatsApp: (00) 00000-0000 e E-mail: email@email.com.br.*
Assumo a veracidade das informações prestadas e autorizo a manutenção.`,
      massa: `Para solicitar uma alteração em massa via banco de dados, é necessário encaminhar um e-mail para theneds@maxdata.com.br, utilizando o modelo abaixo e preenchendo os dados solicitados.

*Assunto: SOLICITAÇÃO: ALTERAÇÃO EM MASSA VIA BANCO DE DADOS*

Eu, *[NOME COMPLETO]*, Telefone/WhatsApp: *(00) 00000-0000*, *[CARGO/FUNÇÃO]* da empresa *[RAZÃO SOCIAL]*, CNPJ *00.000.000/0000-0*, solicito a realização de uma *ALTERAÇÃO EM MASSA VIA BANCO DE DADOS*, conforme os dados abaixo.

*Tipo de alteração:* [Descrever o procedimento solicitado. Ex.: cancelamento de Ordens de Serviço.]
*Quantidade de registros:* [Informar a quantidade total de registros envolvidos.]
*Justificativa:* [Descrever o motivo da solicitação e a necessidade da alteração em massa.]
*Resultado esperado:* [Descrever como os registros deverão ficar após o procedimento.]

Declaro estar ciente de que alterações realizadas diretamente no banco de dados podem impactar informações e processos do sistema.

*Assumo a responsabilidade pela solicitação, confirmo a veracidade das informações prestadas e autorizo a realização do procedimento, mediante análise e aprovação técnica.*

*IMPORTANTE:* A solicitação estará sujeita à análise de viabilidade técnica. O envio deste e-mail não garante a execução do procedimento.`
    };

  function initializeSite() {

    // Base interna: nenhum arquivo é enviado à rede nem adicionado ao GitHub Pages.
    // Seleção local na primeira interação; abertura em nova aba na segunda.
    const kbLaunch = document.querySelector('#kb-local-launch');
    const kbPicker = document.querySelector('#kb-local-file');
    const kbInfo = document.querySelector('#kb-local-info');
    const kbAction = kbLaunch?.querySelector('.knowledge-feature-action-label');
    let kbObjectUrl = null;
    if (kbLaunch && kbPicker) {
      kbLaunch.addEventListener('click', () => {
        if (!kbObjectUrl) {
          kbPicker.click();
          return;
        }
        const link = document.createElement('a');
        link.href = kbObjectUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        link.remove();
      });

      kbPicker.addEventListener('change', async () => {
        const selected = kbPicker.files && kbPicker.files[0];
        if (!selected) return;
        if (!/\\.html?$/i.test(selected.name) || selected.size > 25 * 1024 * 1024) {
          kbInfo.textContent = 'Selecione o arquivo HTML da base, com até 25 MB.';
          return;
        }
        try {
          const header = await selected.slice(0, 8192).text();
          if (!header.includes('Base de Conhecimento MaxData')) {
            kbInfo.textContent = 'Arquivo diferente da Base de Conhecimento MaxData. Selecione o HTML correto.';
            return;
          }
          if (kbObjectUrl) URL.revokeObjectURL(kbObjectUrl);
          kbObjectUrl = URL.createObjectURL(selected);
          kbLaunch.classList.add('is-ready');
          kbAction.textContent = 'Abrir base';
          kbLaunch.title = 'Abrir a base selecionada em uma nova aba';
          kbInfo.textContent = 'Base local pronta. Clique novamente no atalho para abrir em uma nova aba. Nenhum dado foi enviado.';
        } catch (_error) {
          kbInfo.textContent = 'Não foi possível ler o arquivo HTML selecionado.';
        }
      });
      window.addEventListener('pagehide', () => {
        if (kbObjectUrl) URL.revokeObjectURL(kbObjectUrl);
      });
    }

    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const details = document.querySelector('#request-details');
    // Em telas pequenas, os modelos iniciam recolhidos. No desktop ficam visíveis.
    if (details && window.matchMedia('(max-width: 700px)').matches && location.hash !== '#solicitacoes') details.open = false;
    document.querySelector('#tool-count').textContent =
      document.querySelectorAll('[data-tool-card]').length + ' ferramentas';
    document.querySelector('#knowledge-count').textContent =
      document.querySelectorAll('[data-knowledge-card]').length + ' bases';
    document.querySelector('#request-count').textContent =
      document.querySelectorAll('[data-preview-template]').length + ' modelos';

    function setActiveNavigation(hash) {
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === hash));
    }
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('href');
        if (target === '#solicitacoes' && details) details.open = true;
        setActiveNavigation(target);
      });
    });
    if (location.hash === '#solicitacoes' && details) details.open = true;
    if (navLinks.some(link => link.getAttribute('href') === location.hash)) setActiveNavigation(location.hash);

    const nexusCopy = document.querySelector('#copy-nexus');
    const nexusStatus = document.querySelector('#copy-status');
    const nexusText = document.querySelector('#nexus-command');
    let nexusTimer;
    nexusCopy.addEventListener('click', async () => {
      const success = await copyText(nexusText.textContent.trim() || NEXUS_COMMAND);
      window.clearTimeout(nexusTimer);
      if (success) {
        nexusCopy.classList.add('is-copied');
        nexusCopy.firstChild.textContent = 'Comando copiado ';
        nexusStatus.textContent = 'Comando copiado para a área de transferência.';
        nexusTimer = window.setTimeout(() => {
          nexusCopy.classList.remove('is-copied');
          nexusCopy.firstChild.textContent = 'Copiar comando ';
        }, 1900);
      } else {
        nexusStatus.classList.remove('sr-only');
        nexusStatus.classList.add('copy-error');
        nexusStatus.textContent = 'Não foi possível copiar o comando.';
      }
    });

    const dialog = document.querySelector('#request-dialog');
    const preview = document.querySelector('#request-preview');
    const dialogTitle = document.querySelector('#request-dialog-title');
    const dialogStatus = document.querySelector('#request-dialog-status');
    const dialogCopy = document.querySelector('#request-dialog-copy');
    const dialogClose = document.querySelector('#request-dialog-close');
    const requestNames = {
      regime: 'Alteração de regime',
      estoque: 'Zerar saldo de estoque',
      massa: 'Alteração em massa via banco de dados'
    };
    let selectedRequest = null;
    let previousFocus = null;

    function renderFormattedPreview(message) {
      preview.replaceChildren();
      const pieces = message.split('*');
      pieces.forEach((piece, index) => {
        if (!piece) return;
        if (index % 2 === 1 && index < pieces.length - 1) {
          const strong = document.createElement('strong');
          strong.textContent = piece;
          preview.appendChild(strong);
        } else {
          preview.appendChild(document.createTextNode(piece));
        }
      });
    }
    document.querySelectorAll('[data-preview-template]').forEach(button => {
      button.addEventListener('click', () => {
        const key = button.dataset.previewTemplate;
        if (!requestTemplates[key]) return;
        selectedRequest = key;
        previousFocus = document.activeElement;
        dialogTitle.textContent = requestNames[key] || 'Prévia da solicitação';
        renderFormattedPreview(requestTemplates[key]);
        dialogStatus.textContent = '';
        dialogCopy.textContent = '▣ Copiar mensagem';
        dialog.showModal();
      });
    });
    dialogClose.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { if (previousFocus) previousFocus.focus(); });
    dialogCopy.addEventListener('click', async () => {
      const message = requestTemplates[selectedRequest];
      if (!message) return;
      const success = await copyText(message);
      dialogStatus.textContent = success ? 'Mensagem copiada com formatação para WhatsApp.' : 'Não foi possível copiar.';
      if (success) dialogCopy.textContent = '✓ Copiado!';
    });

    // Easter egg: clique no nome do portal para soltar uma mosca.
    let fly = null;
    let frame = 0;
    let expire = 0;
    let toastTimer = 0;
    let x=0, y=0, vx=2.2, vy=1.6, lastFrame=0;
    const cursor = {x:-1000,y:-1000};
    const pointerMove = event => { cursor.x=event.clientX; cursor.y=event.clientY; };
    function removeFly() {
      cancelAnimationFrame(frame);
      clearTimeout(expire);
      document.removeEventListener('pointermove',pointerMove);
      if (fly) fly.remove();
      fly=null;
    }
    function flyTick(now) {
      if (!fly) return;
      const dt=Math.min((now-(lastFrame||now))/16.67,2);
      lastFrame=now;
      if (Math.random()<.035) { vx+=(Math.random()-.5)*2; vy+=(Math.random()-.5)*2; }
      const dist=Math.hypot(x+23-cursor.x,y+23-cursor.y);
      if (dist>6&&dist<100) { vx+=(x+23-cursor.x)/dist*.42; vy+=(y+23-cursor.y)/dist*.42; }
      function speed(v) { return Math.sign(v||1)*Math.max(1.5,Math.min(Math.abs(v),5)); }
      vx=speed(vx);vy=speed(vy);
      x+=vx*dt;y+=vy*dt;
      const maxX=Math.max(0,innerWidth-50),maxY=Math.max(0,innerHeight-50);
      if (x<0||x>maxX) { vx=-vx;x=Math.max(0,Math.min(maxX,x)); }
      if (y<0||y>maxY) { vy=-vy;y=Math.max(0,Math.min(maxY,y)); }
      fly.style.left=x+'px';fly.style.top=y+'px';
      fly.style.transform='rotate('+Math.sin(now/70)*12+'deg)';
      frame=requestAnimationFrame(flyTick);
    }
    document.querySelector('.brand-trigger').addEventListener('click', () => {
      if (fly) return;
      clearTimeout(toastTimer);
      document.querySelector('.fly-toast')?.remove();
      fly=document.createElement('button');
      fly.type='button';fly.className='fly-easteregg';
      fly.textContent='🪰';fly.setAttribute('aria-label','Capturar mosca');
      fly.title='Pegue a mosca!';
      x=Math.max(0,Math.min(innerWidth-50,innerWidth*.57));
      y=Math.max(0,Math.min(innerHeight-50,innerHeight*.4));
      vx=2.2;vy=1.6;lastFrame=0;
      document.body.appendChild(fly);
      document.addEventListener('pointermove',pointerMove,{passive:true});
      fly.addEventListener('click',event=>{
        event.stopPropagation();
        removeFly();
        const toast=document.createElement('div');
        toast.className='fly-toast';toast.setAttribute('role','status');
        toast.innerHTML='🪰 Vai trabalhar, moss! 😂<small>Easter egg encontrado!</small>';
        document.body.appendChild(toast);
        toastTimer=setTimeout(()=>toast.remove(),4500);
      });
      expire=setTimeout(removeFly,30000);
      frame=requestAnimationFrame(flyTick);
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initializeSite,{once:true});
    else initializeSite();
  }
})();

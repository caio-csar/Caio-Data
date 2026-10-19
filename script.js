(function () {
  'use strict';

  const NEXUS_COMMAND = 'irm https://caio-csar.github.io/NEXUS/NEXUS_CORE.ps1 | iex';

  function normalizeSearch(value) {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR')
      .trim();
  }

  function matchesSearch(searchableText, query) {
    return normalizeSearch(searchableText).includes(normalizeSearch(query));
  }

  function selectCommandText(commandElement) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(commandElement);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function legacyCopy(command) {
    const textarea = document.createElement('textarea');
    textarea.value = command;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  }

  function initializeSite() {
    const cards = Array.from(document.querySelectorAll('[data-project-card]'));
    const resourceCount = document.querySelector('#resource-count');
    if (resourceCount) resourceCount.textContent = `${cards.length} ${cards.length === 1 ? 'recurso' : 'recursos'}`;
    const search = document.querySelector('#project-search');
    const emptyState = document.querySelector('#empty-state');
    const projectSection = document.querySelector('#projetos');
    const knowledgeSection = document.querySelector('#conhecimento');
    const copyButton = document.querySelector('#copy-nexus');
    const commandElement = document.querySelector('#nexus-command');
    const copyStatus = document.querySelector('#copy-status');

    function filterCards(query) {
      let visible = 0;

      cards.forEach((card) => {
        const searchableText = card.dataset.search || card.textContent;
        const match = matchesSearch(searchableText, query);
        card.hidden = !match;
        if (match) visible += 1;
      });

      [projectSection, knowledgeSection].forEach((section) => {
        if (!section) return;
        const hasVisibleCard = Array.from(section.querySelectorAll('[data-project-card]'))
          .some((card) => !card.hidden);
        section.hidden = !hasVisibleCard;
      });

      if (emptyState) {
        emptyState.hidden = visible !== 0;
        emptyState.textContent = visible === 0
          ? 'Nenhum projeto encontrado para essa busca.'
          : `${visible} ${visible === 1 ? 'resultado encontrado' : 'resultados encontrados'}.`;
      }

      return visible;
    }

    async function copyNexusCommand() {
      const command = commandElement?.textContent.trim() || NEXUS_COMMAND;
      let copied = false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(command);
          copied = true;
        } else {
          copied = legacyCopy(command);
        }
      } catch (_error) {
        copied = legacyCopy(command);
      }

      if (copied) {
        copyStatus.classList.add('sr-only');
        copyStatus.classList.remove('copy-error');
        copyButton.firstChild.textContent = 'Comando copiado ';
        copyStatus.textContent = 'Comando copiado.';
        copyButton.classList.add('is-copied');

        window.setTimeout(() => {
          copyButton.firstChild.textContent = 'Copiar comando ';
          copyButton.classList.remove('is-copied');
        }, 1800);
      } else {
        selectCommandText(commandElement);
        copyStatus.classList.remove('sr-only');
        copyStatus.classList.add('copy-error');
        copyStatus.textContent = 'Selecione e copie o comando.';
      }

      return copied;
    }

    search?.addEventListener('input', (event) => filterCards(event.currentTarget.value));
    copyButton?.addEventListener('click', copyNexusCommand);

    document.addEventListener('keydown', (event) => {
      const target = event.target;
      const isEditable = target instanceof HTMLInputElement
        || target instanceof HTMLTextAreaElement
        || target?.isContentEditable;

      if (event.key === '/' && !isEditable) {
        event.preventDefault();
        search?.focus();
      }
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('is-active'));
        link.classList.add('is-active');
      });
    });



    // Orientações copiáveis para solicitações formais.
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

    const requestCopyStatus = document.querySelector('#request-copy-status');
    document.querySelectorAll('[data-copy-template]').forEach((button) => {
      button.addEventListener('click', async () => {
        const message = requestTemplates[button.dataset.copyTemplate];
        if (!message) return;
        let copied = false;
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(message);
            copied = true;
          } else {
            copied = legacyCopy(message);
          }
        } catch (_error) {
          copied = legacyCopy(message);
        }
        if (requestCopyStatus) requestCopyStatus.textContent = copied ? 'Modelo copiado! Cole na conversa com o cliente.' : 'Não foi possível copiar. Verifique as permissões do navegador.';
        if (copied) {
          button.classList.add('is-copied');
          setTimeout(() => button.classList.remove('is-copied'), 2000);
        }
      });
    });

    // Easter egg isolado: um clique no nome libera uma mosca por até 30 segundos.
    let activeFly = null;
    let flyFrame = 0;
    let flyExpiry = 0;
    let toastTimer = 0;
    function releaseFly(event) {
      if (event?.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
      event?.preventDefault();
      if (activeFly) return;
      window.clearTimeout(toastTimer);
      document.querySelector('.fly-toast')?.remove();
      const fly = document.createElement('button');
      fly.type = 'button';
      fly.className = 'fly-easteregg';
      fly.textContent = '🪰';
      fly.setAttribute('aria-label', 'Capturar mosca');
      fly.title = 'Pegue a mosca!';
      document.body.appendChild(fly);
      activeFly = fly;
      let x = Math.max(4, window.innerWidth * .55);
      let y = Math.max(4, window.innerHeight * .35);
      let vx = 2.1, vy = 1.45, last = 0;
      const born = performance.now();
      function clearFly() {
        cancelAnimationFrame(flyFrame);
        clearTimeout(flyExpiry);
        fly.remove();
        activeFly = null;
      }
      fly.addEventListener('click', (e) => {
        e.stopPropagation();
        clearFly();
        const toast = document.createElement('div');
        toast.className = 'fly-toast';
        toast.setAttribute('role', 'status');
        toast.innerHTML = '🪰 Vai trabalhar, moss! 😂<small>Easter egg encontrado!</small>';
        document.body.appendChild(toast);
        toastTimer = setTimeout(() => toast.remove(), 4500);
      });
      function move(now) {
        if (!activeFly) return;
        const dt = Math.min((now - (last || now)) / 16.67, 2);
        last = now;
        const maxX = Math.max(0, innerWidth - 50), maxY = Math.max(0, innerHeight - 50);
        if (Math.random() < .035) { vx += (Math.random() - .5) * 2.5; vy += (Math.random() - .5) * 2.5; }
        const clamp = (v) => Math.sign(v || 1) * Math.max(1.2, Math.min(Math.abs(v), 4));
        vx = clamp(vx); vy = clamp(vy);
        x += vx * dt; y += vy * dt;
        if (x <= 0 || x >= maxX) { vx = -vx; x = Math.max(0, Math.min(maxX, x)); }
        if (y <= 0 || y >= maxY) { vy = -vy; y = Math.max(0, Math.min(maxY, y)); }
        fly.style.left = x + 'px';
        fly.style.top = y + 'px';
        fly.style.transform = 'rotate(' + (Math.sin((now - born) / 80) * 13) + 'deg)';
        flyFrame = requestAnimationFrame(move);
      }
      const dodge = (e) => {
        if (!activeFly || e.pointerType === 'touch') return;
        const dx = x + 23 - e.clientX, dy = y + 23 - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d > 15 && d < 85) { vx += (dx / d) * .65; vy += (dy / d) * .65; }
      };
      document.addEventListener('pointermove', dodge, { passive: true });
      const originalClear = clearFly;
      function finish() { document.removeEventListener('pointermove', dodge); originalClear(); }
      // Replace expiry/click cleanup with listener-aware cleanup.
      fly.addEventListener('click', () => document.removeEventListener('pointermove', dodge), { once: true });
      flyExpiry = window.setTimeout(finish, 30000);
      flyFrame = requestAnimationFrame(move);
    }
    document.querySelectorAll('.brand-small, .brand-large').forEach((brand) => {
      brand.addEventListener('click', releaseFly);
      if (brand.matches('[role="button"]')) brand.addEventListener('keydown', releaseFly);
    });

    return { filterCards, copyNexusCommand };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { normalizeSearch, matchesSearch, NEXUS_COMMAND };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeSite, { once: true });
    } else {
      initializeSite();
    }
  }
})();

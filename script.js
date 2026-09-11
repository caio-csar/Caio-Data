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

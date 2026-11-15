function initFonts() {
  const root = document.documentElement;

  const markReady = () => {
    root.classList.remove('fonts-pending');
    root.classList.add('fonts-ready');
  };

  if (!document.fonts?.ready) {
    markReady();
    return;
  }

  document.fonts.ready.then(markReady).catch(markReady);
}

function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/') {
      isActive = path === '/';
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    const list = section?.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter');
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        items.forEach((item) => {
          const itemTopic = item.getAttribute('data-faq-topic');
          const show = topic === 'all' || itemTopic === topic;
          item.toggleAttribute('data-hidden', !show);
        });
      });
    });
  });
}

function initBrandGunPopover() {
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-brand-gun]');
  const popover = document.querySelector<HTMLElement>('[data-brand-popover]');
  const lockup = document.querySelector<HTMLElement>('.brand-lockup');
  if (!triggers.length || !popover) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const close = () => {
    popover.classList.remove('is-open');
    triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
  };

  const open = (trigger: HTMLButtonElement) => {
    popover.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  };

  const toggle = (trigger: HTMLButtonElement) => {
    const isOpen = popover.classList.contains('is-open');
    close();
    if (!isOpen) open(trigger);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle(trigger);
    });
  });

  if (canHover && lockup) {
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    lockup.addEventListener('mouseenter', () => {
      if (leaveTimer) clearTimeout(leaveTimer);
      const trigger = lockup.querySelector<HTMLButtonElement>('[data-brand-gun]');
      if (trigger) open(trigger);
    });
    lockup.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(close, 120);
    });
  }

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && (popover.contains(event.target) || [...triggers].some((t) => t.contains(event.target)))) return;
    close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;

  const update = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#7F3DEE' : '#f5f7fa';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function bootSite() {
  initFonts();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initSkipLink();
  initBrandGunPopover();
  initThemeMetaColor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}

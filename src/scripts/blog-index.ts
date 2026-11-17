/** Blog index topic filters + Starwind sort select. */
export function initBlogIndexFilters(emptyMessage?: string) {
  const grid = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty');
  const sortRoot = document.getElementById('blog-sort-select');
  if (!grid || grid.dataset.blogFiltersInit === 'true') return;
  grid.dataset.blogFiltersInit = 'true';

  const emptyText =
    emptyMessage ?? grid.getAttribute('data-empty-filter') ?? 'No articles match this filter.';

  const filters = document.querySelectorAll<HTMLElement>('[data-blog-filter]');
  const featuredEl = document.querySelector<HTMLElement>('[data-blog-featured]');

  const cards = () => [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

  const setActiveFilter = (tag: string) => {
    filters.forEach((btn) => {
      const value = btn.getAttribute('data-blog-filter') ?? 'all';
      const active = value === tag;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });
  };

  const activeTag = () =>
    document.querySelector<HTMLElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
      'data-blog-filter',
    ) ?? 'all';

  const getSortSelectRoot = () => sortRoot?.querySelector<HTMLElement>('[data-sw-select]');

  const getSort = () => {
    const root = getSortSelectRoot();
    const fromAttr = root?.getAttribute('data-value');
    if (fromAttr) return fromAttr;
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    return input?.value || 'newest';
  };

  const isBlogSortEvent = (event: Event) => {
    const root = getSortSelectRoot();
    if (!root || !sortRoot) return false;
    return event.target === root || root.contains(event.target as Node);
  };

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    return tsB - tsA;
  };

  const updateUrl = (tag: string) => {
    const next =
      tag === 'all'
        ? `${window.location.pathname}`
        : `${window.location.pathname}?topic=${encodeURIComponent(tag)}`;
    window.history.replaceState(null, '', next);
  };

  const apply = () => {
    const tag = activeTag();
    const sort = getSort();
    const items = cards();

    const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
    sorted.forEach((el) => grid.appendChild(el));

    let visibleCount = 0;
    items.forEach((el) => {
      const match = tag === 'all' || el.getAttribute('data-tag') === tag;
      el.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (featuredEl) {
      const featuredTag = featuredEl.getAttribute('data-tag');
      const showFeatured = tag === 'all' || featuredTag === tag;
      featuredEl.classList.toggle('hidden', !showFeatured);
    }

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.textContent = emptyText;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (btn instanceof HTMLAnchorElement) event.preventDefault();
      const tag = btn.getAttribute('data-blog-filter') ?? 'all';
      setActiveFilter(tag);
      updateUrl(tag);
      apply();
    });
  });

  const onSortChange = (event: Event) => {
    if (!isBlogSortEvent(event)) return;
    apply();
  };

  document.addEventListener('starwind:value-change', onSortChange);

  const topicFromUrl = new URLSearchParams(window.location.search).get('topic');
  if (topicFromUrl) {
    const match = [...filters].find((btn) => btn.getAttribute('data-blog-filter') === topicFromUrl);
    if (match) setActiveFilter(topicFromUrl);
  }

  requestAnimationFrame(apply);
  window.setTimeout(apply, 0);
  window.setTimeout(apply, 120);
}
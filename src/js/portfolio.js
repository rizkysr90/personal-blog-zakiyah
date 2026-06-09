function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getAnimationDelay(index) {
  const delays = ['', 'delay-200', 'delay-500'];
  return delays[index % delays.length];
}

function renderProjectCard(project, index) {
  const delay = getAnimationDelay(index);

  return `
    <article
      class="project-card flex flex-col h-full bg-white rounded-lg border-2 border-black shadow-[6px_6px_0_0_#000000] overflow-hidden transform duration-700 opacity-0 translate-y-20 ${delay}"
      data-view="!opacity-100 !translate-y-0"
      data-category="${escapeHtml(project.category)}">
      <div class="relative aspect-[4/3] overflow-hidden shrink-0">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}"
          class="w-full h-full object-cover hover:scale-110 duration-1000">
        <span class="absolute top-3 right-3 text-xs font-bold uppercase px-2 py-1 bg-[#FFFAB7] border-2 border-black rounded">
          ${escapeHtml(project.categoryLabel)}
        </span>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <span class="inline-block text-xs font-semibold text-[#00a6a2] uppercase mb-2">${escapeHtml(project.company)}</span>
        <h3 class="text-lg font-bold mb-1">${escapeHtml(project.title)}</h3>
        <p class="text-sm text-gray-600 mb-2">${escapeHtml(project.role)}</p>
        <p class="text-sm text-gray-700 flex-1">${escapeHtml(project.outcome)}</p>
        <a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer"
          class="mt-4 inline-block self-start text-sm py-2 px-4 bg-black text-white rounded hover:opacity-90 transition-opacity">
          View Case Study
        </a>
      </div>
    </article>
  `;
}

function renderFilterButtons(categories) {
  const filterContainer = document.getElementById('portfolio-filters');
  if (!filterContainer) return;

  filterContainer.innerHTML = categories.map(function (category, index) {
    const isActive = index === 0;
    const activeClasses = isActive ? 'active bg-black text-white' : 'bg-white text-black';

    return `
      <button data-filter="${escapeHtml(category.id)}"
        class="${activeClasses} text-sm font-bold uppercase px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0_0_#000000]">
        ${escapeHtml(category.label)}
      </button>
    `;
  }).join('');
}

function renderPortfolioGrid(projects) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(renderProjectCard).join('');
}

async function loadPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const filterContainer = document.getElementById('portfolio-filters');

  if (!grid && !filterContainer) return;

  try {
    const response = await fetch('src/data/works.json');
    if (!response.ok) {
      throw new Error('Failed to load portfolio data');
    }

    const data = await response.json();
    const mode = grid ? grid.getAttribute('data-portfolio-mode') || 'all' : 'all';
    let projects = data.projects || [];

    if (mode === 'featured') {
      projects = projects.filter(function (project) {
        return project.featured;
      });
    }

    renderFilterButtons(data.categories || []);
    renderPortfolioGrid(projects);

    document.dispatchEvent(new CustomEvent('portfolio:loaded'));
  } catch (error) {
    console.error(error);

    if (grid) {
      grid.innerHTML = '<p class="text-gray-600 col-span-full">Unable to load portfolio. Please try again later.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', loadPortfolio);

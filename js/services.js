/**
 * AquaPure - Services Listing Page Logic
 * Handles interactive category filtering, card rendering, and smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const servicesGrid = document.getElementById('servicesGrid');
  const filterButtons = document.querySelectorAll('.services-filter-btn');
  const totalCountEl = document.getElementById('totalServicesCount');

  // Render all cards or filtered cards
  const renderServices = (categorySlug = 'all') => {
    if (!servicesGrid || typeof SERVICES_DATA === 'undefined') return;

    const filtered = categorySlug === 'all' 
      ? SERVICES_DATA 
      : SERVICES_DATA.filter(s => s.categorySlug === categorySlug);

    // Update count if badge exists
    if (totalCountEl) {
      totalCountEl.textContent = `${filtered.length} Solution${filtered.length === 1 ? '' : 's'}`;
    }

    servicesGrid.innerHTML = filtered.map(service => `
      <article class="service-card" data-category="${service.categorySlug}">
        <div class="service-card-img-wrap">
          <img 
            src="${service.image}" 
            alt="${service.name}" 
            class="service-card-img" 
            loading="lazy"
            onerror="this.onerror=null;this.src='assets/images/hero_water_system.jpg';"
          >
          <span class="service-card-badge">${service.category}</span>
        </div>
        <div class="service-card-body">
          <div class="service-card-icon-title-row">
            <div class="service-card-mini-icon">
              ${service.icon || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`}
            </div>
            <h3 class="service-card-title">${service.name}</h3>
          </div>
          <p class="service-card-desc">${service.shortDescription}</p>
          
          <div class="service-card-benefit-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${service.benefitSnippet}</span>
          </div>

          <div class="service-card-footer">
            <a href="service-details.html?service=${service.slug}" class="service-card-link" aria-label="View details for ${service.name}">
              View Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  };

  // Filter button click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Animate grid change
      servicesGrid.style.opacity = '0';
      servicesGrid.style.transform = 'translateY(8px)';
      servicesGrid.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

      setTimeout(() => {
        renderServices(category);
        servicesGrid.style.opacity = '1';
        servicesGrid.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // Initial render
  renderServices('all');

  // Smooth scroll for explore button
  const exploreBtn = document.getElementById('exploreServicesBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('servicesListingSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

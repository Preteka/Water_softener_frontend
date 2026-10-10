/**
 * AquaPure - Blog Listing Page Logic
 * Coordinates real-time search, category filtering, featured article rendering,
 * main editorial grid rendering (no duplicates), and newsletter interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  const blogFeaturedWrap = document.getElementById('blogFeaturedWrap');
  const blogGrid = document.getElementById('blogGrid');
  const searchInput = document.getElementById('blogSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterChips = document.querySelectorAll('.category-chip');
  const resultsCount = document.getElementById('resultsCount');
  const emptyState = document.getElementById('blogEmptyState');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  let activeCategory = 'all';
  let activeSearchTerm = '';

  // --------------------------------------------------------------------------
  // 1. Render Featured Article (Editor's Pick)
  // --------------------------------------------------------------------------
  const renderFeaturedArticle = () => {
    if (!blogFeaturedWrap) return;
    const featured = BLOG_ARTICLES.find(a => a.featured) || BLOG_ARTICLES[0];
    if (!featured) return;

    blogFeaturedWrap.innerHTML = `
      <article class="featured-blog-card">
        <div class="featured-blog-media">
          <a href="blog-details.html?slug=${featured.slug}" class="featured-img-link" aria-label="Read ${featured.title}">
            <img src="${featured.coverImage}" alt="${featured.coverAlt || featured.title}" class="featured-img" loading="eager">
          </a>
          <span class="blog-cat-badge featured-badge">${featured.category}</span>
        </div>
        <div class="featured-blog-content">
          <div class="featured-eyebrow">
            <span class="featured-pill-tag">EDITOR'S PICK</span>
            <span class="meta-dot">&bull;</span>
            <span class="featured-category-name">${featured.category}</span>
          </div>

          <h3 class="featured-title">
            <a href="blog-details.html?slug=${featured.slug}">${featured.title}</a>
          </h3>

          <p class="featured-excerpt">
            ${featured.excerpt}
          </p>

          <div class="featured-meta-row">
            <div class="blog-author-mini">
              <img src="${featured.author.image}" alt="${featured.author.name}" class="author-avatar-xs">
              <div class="author-text-col">
                <span class="author-name-xs">${featured.author.name}</span>
                <span class="author-role-xs">${featured.author.role}</span>
              </div>
            </div>
            <div class="meta-time-wrap">
              <span class="blog-date-xs">${featured.publishedDate}</span>
              <span class="meta-dot">&bull;</span>
              <span class="blog-read-xs">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${featured.readingTime}
              </span>
            </div>
          </div>

          <div class="featured-footer-row">
            <a href="blog-details.html?slug=${featured.slug}" class="btn-read-featured">
              <span>Read Full Article</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#blogGridSection" class="link-explore-more">
              Explore All Articles &darr;
            </a>
          </div>
        </div>
      </article>
    `;
  };

  // --------------------------------------------------------------------------
  // 2. Render Article Cards Grid
  // --------------------------------------------------------------------------
  const renderArticlesGrid = () => {
    if (!blogGrid) return;

    const filtered = filterArticles(activeSearchTerm, activeCategory);
    const featured = BLOG_ARTICLES.find(a => a.featured) || BLOG_ARTICLES[0];

    // Under default "All Articles" and empty search, exclude featured article to avoid duplication
    let displayArticles = filtered;
    if (activeCategory === 'all' && !activeSearchTerm) {
      displayArticles = filtered.filter(a => a.id !== featured.id);
    }

    // Update count indicator (total unique matching articles)
    const totalCount = filtered.length;
    if (resultsCount) {
      resultsCount.textContent = `Showing ${totalCount} article${totalCount === 1 ? '' : 's'}`;
    }

    if (displayArticles.length === 0) {
      blogGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    blogGrid.innerHTML = displayArticles.map(article => `
      <article class="blog-card" data-category="${article.categorySlug}">
        <div class="blog-card-media">
          <a href="blog-details.html?slug=${article.slug}" aria-label="Read ${article.title}">
            <img src="${article.coverImage}" alt="${article.coverAlt || article.title}" class="blog-card-img" loading="lazy">
          </a>
          <span class="blog-cat-badge">${article.category}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-row">
            <span class="blog-date-xs">${article.publishedDate}</span>
            <span class="meta-dot">&bull;</span>
            <span class="blog-read-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${article.readingTime}
            </span>
          </div>

          <h3 class="blog-card-title">
            <a href="blog-details.html?slug=${article.slug}">${article.title}</a>
          </h3>

          <p class="blog-card-excerpt">
            ${article.excerpt}
          </p>

          <div class="blog-card-footer">
            <div class="blog-author-mini">
              <img src="${article.author.image}" alt="${article.author.name}" class="author-avatar-xs">
              <span class="author-name-xs">${article.author.name}</span>
            </div>
            <a href="blog-details.html?slug=${article.slug}" class="blog-read-more-link" aria-label="Read ${article.title}">
              <span>Read Article</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  };

  // --------------------------------------------------------------------------
  // 3. Search & Filter Handlers
  // --------------------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchTerm = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = activeSearchTerm.length > 0 ? 'flex' : 'none';
      }
      renderArticlesGrid();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      activeSearchTerm = '';
      clearSearchBtn.style.display = 'none';
      renderArticlesGrid();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category') || 'all';
      renderArticlesGrid();
    });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'all';
      activeSearchTerm = '';
      if (searchInput) {
        searchInput.value = '';
      }
      if (clearSearchBtn) {
        clearSearchBtn.style.display = 'none';
      }
      filterChips.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-category') === 'all');
      });
      renderArticlesGrid();
    });
  }

  // --------------------------------------------------------------------------
  // 4. Newsletter Subscription Handling
  // --------------------------------------------------------------------------
  if (newsletterForm) {
    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = document.getElementById('newsletterSubmitBtn');

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailInput) return;

      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailVal || !emailRegex.test(emailVal)) {
        emailInput.classList.add('input-error');
        emailInput.focus();
        return;
      }

      emailInput.classList.remove('input-error');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          Subscribing...
        `;
      }

      // Simulated feedback state
      setTimeout(() => {
        newsletterForm.style.display = 'none';
        if (newsletterSuccess) {
          newsletterSuccess.style.display = 'block';
        }
      }, 700);
    });
  }

  // Initial render
  renderFeaturedArticle();
  renderArticlesGrid();
});

/**
 * AquaPure - Blog Details Dynamic Renderer
 * Reads article slug from URL query, renders structured content, table of contents,
 * reading progress bar, share/copy actions, author profile, and related posts.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const articleWrapper = document.getElementById('articleWrapper');
  const notFoundWrapper = document.getElementById('articleNotFound');
  const readingProgressBar = document.getElementById('readingProgressBar');
  const copyToast = document.getElementById('copyToast');

  if (!slug) {
    showNotFound();
    return;
  }

  const article = getArticleBySlug(slug);

  if (!article) {
    showNotFound();
    return;
  }

  // Update Page Title and Meta Description
  document.title = `${article.title} | AquaPure Water Solutions`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', article.excerpt);
  }

  renderArticle(article);
  setupReadingProgress();
  setupShareAndCopy(article);
  setupTableOfContents(article);
  setupPagination(article);
  renderRelatedArticles(article.slug);

  function showNotFound() {
    if (articleWrapper) articleWrapper.style.display = 'none';
    if (notFoundWrapper) notFoundWrapper.style.display = 'block';
  }

  function renderArticle(art) {
    if (!articleWrapper) return;
    if (notFoundWrapper) notFoundWrapper.style.display = 'none';
    articleWrapper.style.display = 'block';

    // 1. Breadcrumbs
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = art.title;

    // 2. Header Meta
    const headerTag = document.getElementById('articleCategoryBadge');
    if (headerTag) headerTag.textContent = art.category;

    const titleEl = document.getElementById('articleMainTitle');
    if (titleEl) titleEl.textContent = art.title;

    const introEl = document.getElementById('articleIntroText');
    if (introEl) introEl.textContent = art.content.intro;

    const authorAvatar = document.getElementById('articleAuthorAvatar');
    if (authorAvatar) {
      authorAvatar.src = art.author.image;
      authorAvatar.alt = art.author.name;
    }

    const authorName = document.getElementById('articleAuthorName');
    if (authorName) authorName.textContent = art.author.name;

    const authorRole = document.getElementById('articleAuthorRole');
    if (authorRole) authorRole.textContent = art.author.role;

    const pubDate = document.getElementById('articlePublishDate');
    if (pubDate) pubDate.textContent = art.publishedDate;

    const readTime = document.getElementById('articleReadingTime');
    if (readTime) readTime.textContent = art.readingTime;

    // 3. Cover Image
    const coverImg = document.getElementById('articleCoverImage');
    if (coverImg) {
      coverImg.src = art.coverImage;
      coverImg.alt = art.coverAlt || art.title;
    }

    // 4. Main Content Body
    const contentBody = document.getElementById('articleContentBody');
    if (contentBody) {
      contentBody.innerHTML = art.content.sections.map(sec => {
        let extraMarkup = '';

        if (sec.tip) {
          extraMarkup += `
            <div class="article-tip-box">
              <div class="tip-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <div class="tip-text">
                <strong>Pro Specialist Tip:</strong> ${sec.tip}
              </div>
            </div>
          `;
        }

        if (sec.callout) {
          extraMarkup += `
            <div class="article-callout-card">
              <div class="callout-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>${sec.callout.title}</span>
              </div>
              <p>${sec.callout.text}</p>
            </div>
          `;
        }

        const paragraphsHtml = sec.paragraphs.map(p => {
          if (p.startsWith('•')) {
            return `<li class="article-bullet-item">${p.substring(1).trim()}</li>`;
          }
          return `<p class="article-body-p">${p}</p>`;
        }).join('');

        const wrappedParagraphs = paragraphsHtml.includes('article-bullet-item') 
          ? `<ul class="article-bullet-list">${paragraphsHtml}</ul>`
          : paragraphsHtml;

        return `
          <section class="article-section-block" id="${sec.id}">
            <h2 class="article-h2">${sec.heading}</h2>
            ${wrappedParagraphs}
            ${extraMarkup}
          </section>
        `;
      }).join('');

      // Add conclusion & inline CTA box if present
      if (art.content.conclusion) {
        contentBody.innerHTML += `
          <div class="article-conclusion-box">
            <h3 class="conclusion-title">Summary &amp; Key Takeaways</h3>
            <p>${art.content.conclusion}</p>
          </div>
        `;
      }

      if (art.content.ctaBox) {
        contentBody.innerHTML += `
          <div class="article-inline-cta">
            <div class="inline-cta-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            </div>
            <div class="inline-cta-content">
              <h4>${art.content.ctaBox.title}</h4>
              <p>${art.content.ctaBox.desc}</p>
            </div>
            <a href="#testBookingModal" class="btn btn-blue trigger-water-test inline-cta-btn">${art.content.ctaBox.btnText}</a>
          </div>
        `;
      }
    }

    // 5. Author Bio Card
    const authorCardImg = document.getElementById('authorBioImg');
    if (authorCardImg) {
      authorCardImg.src = art.author.image;
      authorCardImg.alt = art.author.name;
    }

    const authorCardName = document.getElementById('authorBioName');
    if (authorCardName) authorCardName.textContent = art.author.name;

    const authorCardRole = document.getElementById('authorBioRole');
    if (authorCardRole) authorCardRole.textContent = art.author.role;

    const authorCardBio = document.getElementById('authorBioDesc');
    if (authorCardBio) authorCardBio.textContent = art.author.bio;

    // 6. Article Tags
    const tagsContainer = document.getElementById('articleTagsRow');
    if (tagsContainer && art.tags) {
      tagsContainer.innerHTML = art.tags.map(t => `<span class="article-tag-pill">#${t}</span>`).join('');
    }

    // 7. Sidebar Quick Facts
    const sidebarCategory = document.getElementById('sidebarCategory');
    if (sidebarCategory) sidebarCategory.textContent = art.category;

    const sidebarReadTime = document.getElementById('sidebarReadTime');
    if (sidebarReadTime) sidebarReadTime.textContent = art.readingTime;

    const sidebarDate = document.getElementById('sidebarDate');
    if (sidebarDate) sidebarDate.textContent = art.publishedDate;
  }

  // --------------------------------------------------------------------------
  // Table of Contents & Active Heading Tracking
  // --------------------------------------------------------------------------
  function setupTableOfContents(art) {
    const tocList = document.getElementById('tocList');
    const tocCard = document.getElementById('tocCard');
    if (!tocList || !art.content.sections || art.content.sections.length === 0) {
      if (tocCard) tocCard.style.display = 'none';
      return;
    }

    if (tocCard) tocCard.style.display = 'block';

    tocList.innerHTML = art.content.sections.map((sec, idx) => `
      <li>
        <a href="#${sec.id}" class="toc-link ${idx === 0 ? 'active' : ''}" data-target="${sec.id}">
          <span class="toc-num">${idx + 1}</span>
          <span class="toc-text">${sec.heading.replace(/^[0-9]+\.\s*/, '')}</span>
        </a>
      </li>
    `).join('');

    // Smooth scroll for TOC links
    const tocLinks = tocList.querySelectorAll('.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });

    // IntersectionObserver to highlight active TOC link
    const headings = document.querySelectorAll('.article-section-block');
    if ('IntersectionObserver' in window && headings.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.id;
            tocLinks.forEach(l => {
              l.classList.toggle('active', l.getAttribute('data-target') === currentId);
            });
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px' });

      headings.forEach(h => observer.observe(h));
    }
  }

  // --------------------------------------------------------------------------
  // Reading Progress Bar
  // --------------------------------------------------------------------------
  function setupReadingProgress() {
    if (!readingProgressBar) return;
    const articleContainer = document.getElementById('articleContentBody');

    const updateProgress = () => {
      if (!articleContainer) return;
      const rect = articleContainer.getBoundingClientRect();
      const totalHeight = articleContainer.offsetHeight;
      const startOffset = window.pageYOffset + rect.top - 120;
      const scrollPos = window.pageYOffset;

      if (scrollPos < startOffset) {
        readingProgressBar.style.width = '0%';
      } else if (scrollPos > startOffset + totalHeight - window.innerHeight) {
        readingProgressBar.style.width = '100%';
      } else {
        const percent = ((scrollPos - startOffset) / (totalHeight - window.innerHeight + 200)) * 100;
        readingProgressBar.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // --------------------------------------------------------------------------
  // Share & Copy Link Actions
  // --------------------------------------------------------------------------
  function setupShareAndCopy(art) {
    const shareBtn = document.getElementById('shareArticleBtn');
    const copyBtn = document.getElementById('copyLinkBtn');

    const showToast = (msg) => {
      if (!copyToast) return;
      copyToast.textContent = msg;
      copyToast.classList.add('show');
      setTimeout(() => {
        copyToast.classList.remove('show');
      }, 2500);
    };

    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: art.title,
              text: art.excerpt,
              url: window.location.href
            });
          } catch (err) {
            // Cancelled or unsupported
          }
        } else {
          // Fallback to copy link
          try {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Article link copied to clipboard!');
          } catch (e) {
            showToast('Link: ' + window.location.href);
          }
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Article link copied to clipboard!');
        } catch (e) {
          showToast('Link: ' + window.location.href);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Article Prev/Next Pagination
  // --------------------------------------------------------------------------
  function setupPagination(art) {
    const prevBtn = document.getElementById('prevArticleBtn');
    const nextBtn = document.getElementById('nextArticleBtn');
    const currentIndex = BLOG_ARTICLES.findIndex(a => a.id === art.id);

    if (prevBtn) {
      if (currentIndex > 0) {
        const prevArticle = BLOG_ARTICLES[currentIndex - 1];
        prevBtn.href = `blog-details.html?slug=${prevArticle.slug}`;
        prevBtn.querySelector('.pagination-title').textContent = prevArticle.title;
        prevBtn.style.visibility = 'visible';
      } else {
        prevBtn.style.visibility = 'hidden';
      }
    }

    if (nextBtn) {
      if (currentIndex < BLOG_ARTICLES.length - 1) {
        const nextArticle = BLOG_ARTICLES[currentIndex + 1];
        nextBtn.href = `blog-details.html?slug=${nextArticle.slug}`;
        nextBtn.querySelector('.pagination-title').textContent = nextArticle.title;
        nextBtn.style.visibility = 'visible';
      } else {
        nextBtn.style.visibility = 'hidden';
      }
    }
  }

  // --------------------------------------------------------------------------
  // Render Related Articles Grid (Continue Exploring)
  // --------------------------------------------------------------------------
  function renderRelatedArticles(currentSlug) {
    const relatedGrid = document.getElementById('relatedGrid');
    if (!relatedGrid) return;

    const related = getRelatedArticles(currentSlug, 3);
    if (!related || related.length === 0) {
      const section = document.getElementById('relatedArticlesSection');
      if (section) section.style.display = 'none';
      return;
    }

    relatedGrid.innerHTML = related.map(item => `
      <article class="related-article" data-category="${item.categorySlug}">
        <div class="related-article__image">
          <a href="blog-details.html?slug=${item.slug}" class="related-article__img-link" aria-label="Read ${item.title}">
            <img src="${item.coverImage}" alt="${item.coverAlt || item.title}" class="related-article__img" loading="lazy">
          </a>
          <span class="related-article__badge">${item.category}</span>
        </div>
        <div class="related-article__content">
          <div class="related-article__meta">
            <span class="related-article__date">${item.publishedDate}</span>
            <span class="meta-dot">&bull;</span>
            <span class="related-article__read">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              ${item.readingTime}
            </span>
          </div>

          <h3 class="related-article__title">
            <a href="blog-details.html?slug=${item.slug}">${item.title}</a>
          </h3>

          <p class="related-article__excerpt">
            ${item.excerpt}
          </p>

          <div class="related-article__footer">
            <div class="related-article__author">
              <img src="${item.author.image}" alt="${item.author.name}" class="related-article__author-img">
              <span class="related-article__author-name">${item.author.name}</span>
            </div>
            <a href="blog-details.html?slug=${item.slug}" class="related-article__read-btn" aria-label="Read ${item.title}">
              <span>Read Article</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }
});


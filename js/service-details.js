/**
 * AquaPure - Service Details Dynamic Logic
 * Loads service data from services-data.js based on ?service=<slug> query parameter.
 * Manages FAQ accordion, related services rendering, and fallback 404 state.
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceSlug = urlParams.get('service');

  const dynamicContentContainer = document.getElementById('dynamicServiceContainer');
  const notFoundContainer = document.getElementById('serviceNotFoundContainer');

  if (!serviceSlug || typeof SERVICES_DATA === 'undefined') {
    showNotFound();
    return;
  }

  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    showNotFound();
    return;
  }

  // Update Page Title and Meta Description
  document.title = `${service.name} | AquaPure Water Solutions`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', service.shortDescription);
  }

  // Render Full Service Content
  renderServiceDetails(service);

  function showNotFound() {
    if (dynamicContentContainer) dynamicContentContainer.style.display = 'none';
    if (notFoundContainer) notFoundContainer.style.display = 'block';
  }

  function renderServiceDetails(s) {
    if (!dynamicContentContainer) return;
    dynamicContentContainer.style.display = 'block';
    if (notFoundContainer) notFoundContainer.style.display = 'none';

    // 1. Hero Section Content
    document.getElementById('serviceCategoryBadge').textContent = s.category;
    document.getElementById('serviceHeroTitle').textContent = s.name;
    document.getElementById('serviceHeroDesc').textContent = s.shortDescription;
    
    const heroImg = document.getElementById('serviceHeroImg');
    if (heroImg) {
      heroImg.src = s.image;
      heroImg.alt = s.name;
      heroImg.onerror = () => { heroImg.src = 'assets/images/hero_water_system.jpg'; };
    }

    // 2. Overview Section
    document.getElementById('overviewFullText').textContent = s.fullDescription;
    
    const idealList = document.getElementById('idealScenariosList');
    if (idealList && s.idealFor) {
      idealList.innerHTML = s.idealFor.map(item => `
        <li class="ideal-scenario-item">
          <span class="ideal-check-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <span>${item}</span>
        </li>
      `).join('');
    }

    // 3. Features & Benefits Grid
    const featuresGrid = document.getElementById('serviceFeaturesGrid');
    if (featuresGrid && s.features) {
      featuresGrid.innerHTML = s.features.map(feat => `
        <div class="feature-box-card">
          <div class="feature-box-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div class="feature-box-content">
            <h4>${feat.title}</h4>
            <p>${feat.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // 4. Process Timeline
    const processGrid = document.getElementById('serviceProcessGrid');
    if (processGrid && s.process) {
      processGrid.innerHTML = s.process.map(step => `
        <div class="process-step-item">
          <div class="process-step-badge">${step.stepNumber}</div>
          <h4 class="process-step-title">${step.title}</h4>
          <p class="process-step-desc">${step.desc}</p>
        </div>
      `).join('');
    }

    // 5. Pricing Consultation Description
    const pricingDescEl = document.getElementById('servicePricingDesc');
    if (pricingDescEl) {
      pricingDescEl.textContent = s.pricingDescription;
    }

    // 6. Service FAQs Accordion
    const faqList = document.getElementById('serviceFaqList');
    if (faqList && s.faqs) {
      faqList.innerHTML = s.faqs.map((faq, index) => `
        <div class="faq-accordion-item ${index === 0 ? 'open' : ''}">
          <button class="faq-accordion-header" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="faq-ans-${index}">
            <span>${faq.q}</span>
            <span class="faq-accordion-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          <div class="faq-accordion-body" id="faq-ans-${index}" style="${index === 0 ? 'max-height: 200px;' : ''}">
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('');

      initAccordion(faqList);
    }

    // 7. Related Services
    const relatedGrid = document.getElementById('relatedServicesGrid');
    if (relatedGrid) {
      const related = getRelatedServices(s.slug, 3);
      relatedGrid.innerHTML = related.map(rel => `
        <article class="service-card" data-category="${rel.categorySlug}">
          <div class="service-card-img-wrap">
            <img 
              src="${rel.image}" 
              alt="${rel.name}" 
              class="service-card-img" 
              loading="lazy"
              onerror="this.onerror=null;this.src='assets/images/hero_water_system.jpg';"
            >
            <span class="service-card-badge">${rel.category}</span>
          </div>
          <div class="service-card-body">
            <div class="service-card-icon-title-row">
              <div class="service-card-mini-icon">
                ${rel.icon || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`}
              </div>
              <h3 class="service-card-title">${rel.name}</h3>
            </div>
            <p class="service-card-desc">${rel.shortDescription}</p>
            
            <div class="service-card-benefit-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${rel.benefitSnippet}</span>
            </div>

            <div class="service-card-footer">
              <a href="service-details.html?service=${rel.slug}" class="service-card-link" aria-label="View details for ${rel.name}">
                View Details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </article>
      `).join('');
    }
  }

  function initAccordion(container) {
    const items = container.querySelectorAll('.faq-accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.faq-accordion-header');
      const body = item.querySelector('.faq-accordion-body');

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        items.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherHeader = otherItem.querySelector('.faq-accordion-header');
          const otherBody = otherItem.querySelector('.faq-accordion-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 40 + 'px';
        }
      });
    });
  }
});

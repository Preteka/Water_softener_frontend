/**
 * AquaPure - Contact Page Interactive Logic
 * Handles real-time form validation, submission states, branch data switching, and interactive map display.
 */

const BRANCH_LOCATIONS = [
  {
    id: 'main-hq',
    name: 'Main Diagnostic Headquarters',
    address: '450 Aqua Vista Blvd, Suite 200, Metro City',
    phone: '+1 (800) 555-AQUA',
    email: 'contact@aquapurewater.com',
    hours: 'Mon – Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 4:00 PM',
    mapQuery: '450+Aqua+Vista+Blvd+Metro+City'
  },
  {
    id: 'north-valley',
    name: 'North Valley Service Center',
    address: '1280 Clearflow Way, North Valley Hub',
    phone: '+1 (800) 555-2782',
    email: 'northvalley@aquapurewater.com',
    hours: 'Mon – Fri: 8:00 AM – 6:00 PM | Sat: By Appointment',
    mapQuery: '1280+Clearflow+Way+North+Valley'
  },
  {
    id: 'coastal-district',
    name: 'Coastal Water Care Station',
    address: '710 Bayshore Parkway, Coastal County',
    phone: '+1 (800) 555-2783',
    email: 'coastal@aquapurewater.com',
    hours: 'Mon – Fri: 8:30 AM – 5:30 PM | Sat: 9:00 AM – 2:00 PM',
    mapQuery: '710+Bayshore+Parkway+Coastal+County'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('mainContactForm');
  const formSuccess = document.getElementById('contactFormSuccess');
  const formError = document.getElementById('contactFormError');
  const branchTabs = document.querySelectorAll('.branch-tab-btn');
  const branchDetailsCard = document.getElementById('branchDetailsCard');
  const mapIframe = document.getElementById('contactMapIframe');

  // --------------------------------------------------------------------------
  // 1. Branch Switcher
  // --------------------------------------------------------------------------
  const selectBranch = (branchId) => {
    const branch = BRANCH_LOCATIONS.find(b => b.id === branchId) || BRANCH_LOCATIONS[0];
    if (!branch) return;

    branchTabs.forEach(tab => {
      const isSelected = tab.getAttribute('data-branch') === branch.id;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (branchDetailsCard) {
      branchDetailsCard.innerHTML = `
        <div class="branch-card-header">
          <div class="branch-icon-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <h4 class="branch-name">${branch.name}</h4>
            <span class="branch-status-pill"><span class="status-dot"></span> Open Today</span>
          </div>
        </div>

        <div class="branch-info-list">
          <div class="branch-info-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <div>
              <strong>Address:</strong>
              <span>${branch.address}</span>
            </div>
          </div>

          <div class="branch-info-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div>
              <strong>Phone:</strong>
              <a href="tel:${branch.phone.replace(/[^0-9+]/g, '')}">${branch.phone}</a>
            </div>
          </div>

          <div class="branch-info-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <div>
              <strong>Email:</strong>
              <a href="mailto:${branch.email}">${branch.email}</a>
            </div>
          </div>

          <div class="branch-info-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <div>
              <strong>Working Hours:</strong>
              <span>${branch.hours}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (mapIframe) {
      mapIframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    }
  };

  branchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const branchId = tab.getAttribute('data-branch');
      selectBranch(branchId);
    });
  });

  // Initial branch selection
  selectBranch('main-hq');

  // --------------------------------------------------------------------------
  // 2. Contact Form Validation & Submission
  // --------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('contactSubmitBtn');

    const showError = (input, msg) => {
      input.classList.add('input-error');
      const errEl = input.parentElement.querySelector('.form-error-hint');
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = 'block';
      }
    };

    const clearError = (input) => {
      input.classList.remove('input-error');
      const errEl = input.parentElement.querySelector('.form-error-hint');
      if (errEl) {
        errEl.style.display = 'none';
      }
    };

    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => clearError(inp));
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Please provide a valid email address.');
        isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showError(subjectInput, 'Please enter a clear message subject.');
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please write a message with at least 10 characters.');
        isValid = false;
      }

      if (!isValid) return;

      // Submit feedback simulation
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          Sending Message...
        `;
      }

      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
        }
      }, 1000);
    });
  }
});

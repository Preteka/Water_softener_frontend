/**
 * AquaPure - Pricing & Interactive Booking Wizard Logic
 * Handles 4-step booking workflow, appointment scheduling, 10% advance calculation,
 * payment verification simulation, and FAQ accordion.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Multi-Step Booking Wizard State
  // --------------------------------------------------------------------------
  const bookingState = {
    currentStep: 1,
    selectedPlanId: 'whole-home-protection',
    customer: {
      fullName: '',
      email: '',
      phone: '',
      altPhone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      waterConcern: 'Hard water and mineral scale',
      notes: ''
    },
    appointment: {
      date: '',
      slotId: 'slot-1',
      slotLabel: '09:00 AM – 11:00 AM'
    },
    quote: {
      confirmedAmount: 32000,
      advancePercent: 10,
      advanceAmount: 3200,
      remainingBalance: 28800
    },
    payment: {
      method: 'upi',
      status: 'pending',
      bookingRef: ''
    }
  };

  // DOM Elements
  const stepIndicators = document.querySelectorAll('.wizard-stepper .step-indicator');
  const stepPanes = document.querySelectorAll('.wizard-step-pane');
  const stepperFill = document.getElementById('stepperProgressFill');
  const wizardContainer = document.getElementById('serviceBookingWizard');

  // Navigation Buttons
  const btnNextStep1 = document.getElementById('btnNextStep1');
  const btnPrevStep2 = document.getElementById('btnPrevStep2');
  const btnNextStep2 = document.getElementById('btnNextStep2');
  const btnPrevStep3 = document.getElementById('btnPrevStep3');
  const btnPayAdvance = document.getElementById('btnPayAdvance');
  const btnPrintSummary = document.getElementById('btnPrintBookingSummary');
  const btnNewBooking = document.getElementById('btnStartNewBooking');

  // Inputs
  const planSelectInput = document.getElementById('wizardSelectedPlan');
  const nameInput = document.getElementById('custFullName');
  const emailInput = document.getElementById('custEmail');
  const phoneInput = document.getElementById('custPhone');
  const altPhoneInput = document.getElementById('custAltPhone');
  const addressInput = document.getElementById('custAddress');
  const cityInput = document.getElementById('custCity');
  const stateInput = document.getElementById('custState');
  const pincodeInput = document.getElementById('custPincode');
  const concernSelect = document.getElementById('custWaterConcern');
  const notesInput = document.getElementById('custNotes');

  const appointmentDateInput = document.getElementById('appointmentDate');
  const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
  const termsCheckbox = document.getElementById('termsAgreementCheck');
  const paymentMethodChips = document.querySelectorAll('.payment-method-chip');

  // Set minimum date to tomorrow
  if (appointmentDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    appointmentDateInput.setAttribute('min', minDateStr);
    appointmentDateInput.value = minDateStr;
    bookingState.appointment.date = minDateStr;
  }

  // --------------------------------------------------------------------------
  // 2. Plan Selection Handlers (Cards & Dropdown)
  // --------------------------------------------------------------------------
  const selectPlan = (planId) => {
    const plan = getPricingPlanById(planId);
    if (!plan) return;

    bookingState.selectedPlanId = plan.id;
    if (planSelectInput) {
      planSelectInput.value = plan.id;
    }

    // Recalculate confirmed standard quote & advance
    const breakdown = calculateQuoteBreakdown(plan.standardConfirmedQuote, plan.advancePercent);
    bookingState.quote.confirmedAmount = breakdown.confirmedQuote;
    bookingState.quote.advancePercent = breakdown.advancePercent;
    bookingState.quote.advanceAmount = breakdown.advanceAmount;
    bookingState.quote.remainingBalance = breakdown.remainingBalance;
  };

  // Plan Card "Book Now" buttons
  const planBookButtons = document.querySelectorAll('.plan-select-trigger');
  planBookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planId = btn.getAttribute('data-plan-id');
      selectPlan(planId);

      // Scroll smoothly to wizard
      if (wizardContainer) {
        wizardContainer.scrollIntoView({ behavior: 'smooth' });
      }

      // If already past step 1, return to step 1 to confirm details
      goToStep(1);
    });
  });

  if (planSelectInput) {
    planSelectInput.addEventListener('change', (e) => {
      selectPlan(e.target.value);
    });
  }

  // Initial plan load
  selectPlan('whole-home-protection');

  // --------------------------------------------------------------------------
  // 3. Step Navigation Machine
  // --------------------------------------------------------------------------
  function goToStep(stepNumber) {
    bookingState.currentStep = stepNumber;

    // Update Progress Indicators
    stepIndicators.forEach((ind, index) => {
      const sNum = index + 1;
      ind.classList.toggle('active', sNum === stepNumber);
      ind.classList.toggle('completed', sNum < stepNumber);
    });

    // Update Progress Line Fill Percentage
    if (stepperFill) {
      const fillPercents = [0, 0, 33.3, 66.6, 100];
      stepperFill.style.width = `${fillPercents[stepNumber]}%`;
    }

    // Update Visible Step Pane
    stepPanes.forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`wizardStepPane${stepNumber}`);
    if (activePane) {
      activePane.classList.add('active');
    }

    // If entering Step 3, refresh calculation summary
    if (stepNumber === 3) {
      updateReviewSummary();
    }
  }

  // --------------------------------------------------------------------------
  // 4. Validation Helpers
  // --------------------------------------------------------------------------
  const showFieldError = (input, msg) => {
    input.classList.add('input-error');
    const errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = 'block';
    }
  };

  const clearFieldError = (input) => {
    input.classList.remove('input-error');
    const errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.style.display = 'none';
    }
  };

  [nameInput, emailInput, phoneInput, addressInput, cityInput, stateInput, pincodeInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => clearFieldError(inp));
    }
  });

  // Step 1: Validate Customer Details
  function validateStep1() {
    let isValid = true;

    // Full Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your full name (minimum 2 letters).');
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please provide a valid email address.');
      isValid = false;
    }

    // Phone (10 digits Indian mobile number)
    const phoneClean = phoneInput.value.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
      showFieldError(phoneInput, 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    // Full Address
    if (!addressInput.value.trim() || addressInput.value.trim().length < 5) {
      showFieldError(addressInput, 'Please provide your full service address.');
      isValid = false;
    }

    // City
    if (!cityInput.value.trim()) {
      showFieldError(cityInput, 'City is required.');
      isValid = false;
    }

    // State
    if (!stateInput.value.trim()) {
      showFieldError(stateInput, 'State is required.');
      isValid = false;
    }

    // Pincode (6 digits)
    const pinClean = pincodeInput.value.replace(/\D/g, '');
    if (pinClean.length !== 6) {
      showFieldError(pincodeInput, 'Please enter a 6-digit postal PIN code.');
      isValid = false;
    }

    if (isValid) {
      // Save to state
      bookingState.customer.fullName = nameInput.value.trim();
      bookingState.customer.email = emailInput.value.trim();
      bookingState.customer.phone = phoneInput.value.trim();
      bookingState.customer.altPhone = altPhoneInput ? altPhoneInput.value.trim() : '';
      bookingState.customer.address = addressInput.value.trim();
      bookingState.customer.city = cityInput.value.trim();
      bookingState.customer.state = stateInput.value.trim();
      bookingState.customer.pincode = pincodeInput.value.trim();
      bookingState.customer.waterConcern = concernSelect ? concernSelect.value : 'Hard water and mineral scale';
      bookingState.customer.notes = notesInput ? notesInput.value.trim() : '';
    }

    return isValid;
  }

  // Step 2: Validate Appointment
  function validateStep2() {
    if (!appointmentDateInput.value) {
      alert('Please select a valid appointment date.');
      return false;
    }

    bookingState.appointment.date = appointmentDateInput.value;
    return true;
  }

  // Time slot selection
  timeSlotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeSlotButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.appointment.slotId = btn.getAttribute('data-slot-id');
      bookingState.appointment.slotLabel = btn.getAttribute('data-slot-label');
    });
  });

  // Step Navigation Event Listeners
  if (btnNextStep1) {
    btnNextStep1.addEventListener('click', () => {
      if (validateStep1()) {
        goToStep(2);
      }
    });
  }

  if (btnPrevStep2) {
    btnPrevStep2.addEventListener('click', () => {
      goToStep(1);
    });
  }

  if (btnNextStep2) {
    btnNextStep2.addEventListener('click', () => {
      if (validateStep2()) {
        goToStep(3);
      }
    });
  }

  if (btnPrevStep3) {
    btnPrevStep3.addEventListener('click', () => {
      goToStep(2);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Step 3: Populate Review Summary & Quote Breakdown
  // --------------------------------------------------------------------------
  function updateReviewSummary() {
    const plan = getPricingPlanById(bookingState.selectedPlanId);
    const breakdown = calculateQuoteBreakdown(plan.standardConfirmedQuote, plan.advancePercent);

    // Summary Details
    document.getElementById('revCustomerName').textContent = bookingState.customer.fullName;
    document.getElementById('revCustomerContact').textContent = `${bookingState.customer.phone} | ${bookingState.customer.email}`;
    document.getElementById('revServiceAddress').textContent = `${bookingState.customer.address}, ${bookingState.customer.city}, ${bookingState.customer.state} - ${bookingState.customer.pincode}`;
    document.getElementById('revSelectedPlan').textContent = plan.name;
    document.getElementById('revIndicativeRange').textContent = plan.formattedRange;

    // Formatted Date
    const dObj = new Date(bookingState.appointment.date);
    const dateFormatted = dObj.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    document.getElementById('revAppointmentSlot').textContent = `${dateFormatted} (${bookingState.appointment.slotLabel})`;

    // Quote Calculation
    document.getElementById('revConfirmedQuote').textContent = breakdown.formattedQuote;
    document.getElementById('revAdvancePercent').textContent = `${breakdown.advancePercent}%`;
    document.getElementById('revAdvanceAmount').textContent = breakdown.formattedAdvance;
    document.getElementById('revRemainingBalance').textContent = breakdown.formattedRemaining;
  }

  // Payment method selection
  paymentMethodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      paymentMethodChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      bookingState.payment.method = chip.getAttribute('data-method');
    });
  });

  // Terms Agreement Enable/Disable button
  if (termsCheckbox && btnPayAdvance) {
    termsCheckbox.addEventListener('change', () => {
      btnPayAdvance.disabled = !termsCheckbox.checked;
    });
  }

  // --------------------------------------------------------------------------
  // 6. Step 4: Advance Payment Processing & Confirmation
  // --------------------------------------------------------------------------
  if (btnPayAdvance) {
    btnPayAdvance.addEventListener('click', () => {
      if (!termsCheckbox.checked) {
        alert('Please review and check the agreement box before proceeding.');
        return;
      }

      // Simulate Payment Processing State
      btnPayAdvance.disabled = true;
      btnPayAdvance.innerHTML = `
        <svg class="spinner-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
        Verifying Advance Payment...
      `;

      setTimeout(() => {
        // Successful verification & booking reference generation
        const bookingRef = generateBookingReference();
        bookingState.payment.status = 'confirmed';
        bookingState.payment.bookingRef = bookingRef;

        populateConfirmation(bookingRef);
        goToStep(4);
      }, 1200);
    });
  }

  function populateConfirmation(ref) {
    const plan = getPricingPlanById(bookingState.selectedPlanId);
    const breakdown = calculateQuoteBreakdown(plan.standardConfirmedQuote, plan.advancePercent);

    document.getElementById('confBookingRef').textContent = ref;
    document.getElementById('confCustName').textContent = bookingState.customer.fullName;
    document.getElementById('confServiceName').textContent = plan.name;
    
    const dObj = new Date(bookingState.appointment.date);
    const dateFormatted = dObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('confDateTime').textContent = `${dateFormatted} at ${bookingState.appointment.slotLabel}`;

    document.getElementById('confTotalQuote').textContent = breakdown.formattedQuote;
    document.getElementById('confAdvancePaid').textContent = breakdown.formattedAdvance;
    document.getElementById('confRemaining').textContent = breakdown.formattedRemaining;
    document.getElementById('confAddress').textContent = `${bookingState.customer.address}, ${bookingState.customer.city} (${bookingState.customer.pincode})`;
  }

  // Print Summary Handler
  if (btnPrintSummary) {
    btnPrintSummary.addEventListener('click', () => {
      window.print();
    });
  }

  // Start New Booking
  if (btnNewBooking) {
    btnNewBooking.addEventListener('click', () => {
      goToStep(1);
      if (termsCheckbox) termsCheckbox.checked = false;
      if (btnPayAdvance) {
        btnPayAdvance.disabled = true;
        btnPayAdvance.innerHTML = `Pay Advance &amp; Confirm Booking`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Pricing FAQs Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.pricing-faq-section .faq-accordion-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    const body = item.querySelector('.faq-accordion-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => {
          other.classList.remove('open');
          const otherHeader = other.querySelector('.faq-accordion-header');
          const otherBody = other.querySelector('.faq-accordion-body');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherBody) otherBody.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 40 + 'px';
        }
      });
    }
  });

  const defaultOpen = document.querySelector('.pricing-faq-section .faq-accordion-item.open .faq-accordion-body');
  if (defaultOpen) {
    defaultOpen.style.maxHeight = defaultOpen.scrollHeight + 40 + 'px';
  }
});

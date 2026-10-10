/**
 * AquaPure Water Solutions - Authentication Module (Vanilla ES6+)
 * Handles Login, Signup, Validation, Password Toggles, Session Storage & Redirects
 */

const AquaPureAuth = (() => {
  const STORAGE_KEY = 'aquapure_authenticated_user';
  const USERS_STORAGE_KEY = 'aquapure_registered_users';

  // Helper to get registered users array
  const getRegisteredUsers = () => {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  // Helper to save a new registered user
  const saveRegisteredUser = (userData) => {
    const users = getRegisteredUsers();
    // Check if email already exists
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userData };
    } else {
      users.push(userData);
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Get currently logged-in user
  const getUser = () => {
    try {
      const sessionUser = sessionStorage.getItem(STORAGE_KEY);
      if (sessionUser) return JSON.parse(sessionUser);

      const localUser = localStorage.getItem(STORAGE_KEY);
      if (localUser) return JSON.parse(localUser);

      return null;
    } catch (e) {
      return null;
    }
  };

  // Check if user is logged in
  const isLoggedIn = () => {
    return getUser() !== null;
  };

  // Set logged in session
  const setSession = (userData, remember = false) => {
    const serialized = JSON.stringify(userData);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, serialized);
    } else {
      sessionStorage.setItem(STORAGE_KEY, serialized);
    }
  };

  // Log out user
  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    // Reload page or redirect to index
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
      window.location.reload();
    } else {
      window.location.href = 'index.html';
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  };

  const validatePhone = (phone) => {
    // Supports 10-15 digits, optional + or dashes/spaces
    const cleaned = String(phone).replace(/[\s\-\(\)]/g, '');
    return /^\+?[0-9]{10,15}$/.test(cleaned);
  };

  const validatePassword = (password) => {
    // Min 8 characters, at least 1 letter and 1 number
    return password && password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return { score: 0, text: 'None', className: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score: 1, text: 'Weak', className: 'weak' };
    if (score <= 4) return { score: 2, text: 'Medium', className: 'medium' };
    return { score: 3, text: 'Strong', className: 'strong' };
  };

  // Authentication API call simulation / handler
  const login = async (email, password, remember = false) => {
    // Simulated network latency for realistic UX
    await new Promise(resolve => setTimeout(resolve, 750));

    // Validate email format
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    // Check registered users in local storage
    const users = getRegisteredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      if (found.password && found.password !== password) {
        throw new Error('Invalid email or password. Please verify your credentials.');
      }
      const activeUser = {
        name: found.name,
        email: found.email,
        phone: found.phone || '',
        token: 'aqp_token_' + Date.now()
      };
      setSession(activeUser, remember);
      return activeUser;
    }

    // For initial seamless testing: if user is not found, authenticate with demo profile
    const derivedName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const newUser = {
      name: derivedName || 'AquaPure Member',
      email: email.trim(),
      phone: '+1 (555) 019-2834',
      token: 'aqp_token_' + Date.now()
    };
    saveRegisteredUser({ ...newUser, password });
    setSession(newUser, remember);
    return newUser;
  };

  const signup = async (userData, remember = true) => {
    // Simulated network latency
    await new Promise(resolve => setTimeout(resolve, 850));

    if (!userData.name || userData.name.trim().length < 2) {
      throw new Error('Please enter your full name.');
    }

    if (!validateEmail(userData.email)) {
      throw new Error('Please enter a valid email address.');
    }

    if (!validatePhone(userData.phone)) {
      throw new Error('Please enter a valid phone number (10+ digits).');
    }

    if (!validatePassword(userData.password)) {
      throw new Error('Password must be at least 8 characters and include letters & numbers.');
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    if (!userData.termsAccepted) {
      throw new Error('You must accept the Terms of Service & Privacy Policy.');
    }

    const newUser = {
      name: userData.name.trim(),
      email: userData.email.trim(),
      phone: userData.phone.trim(),
      token: 'aqp_token_' + Date.now()
    };

    saveRegisteredUser({ ...newUser, password: userData.password });
    setSession(newUser, remember);
    return newUser;
  };

  // Get destination redirect URL from query string
  const getRedirectUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      // Decode and sanitize
      return decodeURIComponent(redirect);
    }
    return 'index.html';
  };

  return {
    getUser,
    isLoggedIn,
    setSession,
    logout,
    validateEmail,
    validatePhone,
    validatePassword,
    calculatePasswordStrength,
    login,
    signup,
    getRedirectUrl
  };
})();

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Password Visibility Toggle
  // --------------------------------------------------------------------------
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      const eyeIcon = btn.querySelector('.eye-icon');
      const eyeOffIcon = btn.querySelector('.eye-off-icon');

      if (eyeIcon && eyeOffIcon) {
        if (isPassword) {
          eyeIcon.style.display = 'none';
          eyeOffIcon.style.display = 'block';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          eyeIcon.style.display = 'block';
          eyeOffIcon.style.display = 'none';
          btn.setAttribute('aria-label', 'Show password');
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Password Strength Meter (Signup Page)
  // --------------------------------------------------------------------------
  const signupPasswordInput = document.getElementById('signupPassword');
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');

  if (signupPasswordInput && strengthFill && strengthText) {
    signupPasswordInput.addEventListener('input', () => {
      const val = signupPasswordInput.value;
      const strength = AquaPureAuth.calculatePasswordStrength(val);

      strengthFill.className = 'strength-bar-fill';
      if (val.length > 0) {
        strengthFill.classList.add(strength.className);
        strengthText.textContent = `Strength: ${strength.text}`;
      } else {
        strengthText.textContent = 'Minimum 8 characters';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Helper: Input validation styling and error displays
  // --------------------------------------------------------------------------
  const setFieldError = (inputEl, errorMsg) => {
    if (!inputEl) return;
    const group = inputEl.closest('.auth-group');
    if (!group) return;

    group.classList.add('is-error');
    const msgEl = group.querySelector('.auth-error-msg');
    if (msgEl) {
      msgEl.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        ${errorMsg}
      `;
    }
  };

  const clearFieldError = (inputEl) => {
    if (!inputEl) return;
    const group = inputEl.closest('.auth-group');
    if (!group) return;
    group.classList.remove('is-error');
  };

  // Clear errors on typing
  const allInputs = document.querySelectorAll('.auth-input');
  allInputs.forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
  });

  // --------------------------------------------------------------------------
  // 4. Login Form Handler
  // --------------------------------------------------------------------------
  const loginForm = document.getElementById('loginForm');
  const loginAlert = document.getElementById('loginAlert');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (loginAlert) {
        loginAlert.style.display = 'none';
        loginAlert.className = 'auth-alert-banner';
      }

      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      const rememberCheckbox = document.getElementById('rememberMe');

      let isValid = true;

      if (!emailInput.value.trim()) {
        setFieldError(emailInput, 'Email address is required.');
        isValid = false;
      } else if (!AquaPureAuth.validateEmail(emailInput.value)) {
        setFieldError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      if (!passwordInput.value) {
        setFieldError(passwordInput, 'Password is required.');
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        setFieldError(passwordInput, 'Password must be at least 6 characters.');
        isValid = false;
      } else {
        clearFieldError(passwordInput);
      }

      if (!isValid) return;

      // Loading state
      if (loginSubmitBtn) {
        loginSubmitBtn.classList.add('is-loading');
        loginSubmitBtn.disabled = true;
      }

      try {
        const user = await AquaPureAuth.login(
          emailInput.value,
          passwordInput.value,
          rememberCheckbox ? rememberCheckbox.checked : false
        );

        if (loginAlert) {
          loginAlert.className = 'auth-alert-banner alert-success';
          loginAlert.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Welcome back, ${user.name}! Redirecting...</span>
          `;
          loginAlert.style.display = 'flex';
        }

        setTimeout(() => {
          window.location.href = AquaPureAuth.getRedirectUrl();
        }, 800);

      } catch (err) {
        if (loginAlert) {
          loginAlert.className = 'auth-alert-banner alert-error';
          loginAlert.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${err.message || 'Unable to sign in. Please try again.'}</span>
          `;
          loginAlert.style.display = 'flex';
        }
      } finally {
        if (loginSubmitBtn) {
          loginSubmitBtn.classList.remove('is-loading');
          loginSubmitBtn.disabled = false;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Signup Form Handler
  // --------------------------------------------------------------------------
  const signupForm = document.getElementById('signupForm');
  const signupAlert = document.getElementById('signupAlert');
  const signupSubmitBtn = document.getElementById('signupSubmitBtn');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (signupAlert) {
        signupAlert.style.display = 'none';
        signupAlert.className = 'auth-alert-banner';
      }

      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const phoneInput = document.getElementById('signupPhone');
      const passwordInput = document.getElementById('signupPassword');
      const confirmInput = document.getElementById('signupConfirmPassword');
      const termsCheckbox = document.getElementById('signupTerms');

      let isValid = true;

      // Name
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, 'Full name is required.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Please enter a valid full name.');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Email
      if (!emailInput.value.trim()) {
        setFieldError(emailInput, 'Email address is required.');
        isValid = false;
      } else if (!AquaPureAuth.validateEmail(emailInput.value)) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      // Phone
      if (!phoneInput.value.trim()) {
        setFieldError(phoneInput, 'Mobile number is required.');
        isValid = false;
      } else if (!AquaPureAuth.validatePhone(phoneInput.value)) {
        setFieldError(phoneInput, 'Please enter a valid phone number (10+ digits).');
        isValid = false;
      } else {
        clearFieldError(phoneInput);
      }

      // Password
      if (!passwordInput.value) {
        setFieldError(passwordInput, 'Password is required.');
        isValid = false;
      } else if (!AquaPureAuth.validatePassword(passwordInput.value)) {
        setFieldError(passwordInput, 'Must be 8+ characters with at least 1 letter and 1 number.');
        isValid = false;
      } else {
        clearFieldError(passwordInput);
      }

      // Confirm Password
      if (!confirmInput.value) {
        setFieldError(confirmInput, 'Please confirm your password.');
        isValid = false;
      } else if (confirmInput.value !== passwordInput.value) {
        setFieldError(confirmInput, 'Passwords do not match.');
        isValid = false;
      } else {
        clearFieldError(confirmInput);
      }

      // Terms
      if (termsCheckbox && !termsCheckbox.checked) {
        if (signupAlert) {
          signupAlert.className = 'auth-alert-banner alert-error';
          signupAlert.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Please accept the Terms of Service & Privacy Policy to continue.</span>
          `;
          signupAlert.style.display = 'flex';
        }
        isValid = false;
      }

      if (!isValid) return;

      // Loading state
      if (signupSubmitBtn) {
        signupSubmitBtn.classList.add('is-loading');
        signupSubmitBtn.disabled = true;
      }

      try {
        const user = await AquaPureAuth.signup({
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          password: passwordInput.value,
          confirmPassword: confirmInput.value,
          termsAccepted: termsCheckbox ? termsCheckbox.checked : true
        }, true);

        if (signupAlert) {
          signupAlert.className = 'auth-alert-banner alert-success';
          signupAlert.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Account created successfully! Welcome to AquaPure, ${user.name}. Redirecting...</span>
          `;
          signupAlert.style.display = 'flex';
        }

        setTimeout(() => {
          window.location.href = AquaPureAuth.getRedirectUrl();
        }, 900);

      } catch (err) {
        if (signupAlert) {
          signupAlert.className = 'auth-alert-banner alert-error';
          signupAlert.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${err.message || 'Unable to create account. Please try again.'}</span>
          `;
          signupAlert.style.display = 'flex';
        }
      } finally {
        if (signupSubmitBtn) {
          signupSubmitBtn.classList.remove('is-loading');
          signupSubmitBtn.disabled = false;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Forgot Password Modal Handler
  // --------------------------------------------------------------------------
  const forgotModal = document.getElementById('forgotPasswordModal');
  const openForgotBtns = document.querySelectorAll('.trigger-forgot-password');
  const closeForgotBtn = document.getElementById('closeForgotModalBtn');
  const forgotForm = document.getElementById('forgotPasswordForm');
  const forgotSuccess = document.getElementById('forgotSuccessState');

  const openForgotModal = (e) => {
    if (e) e.preventDefault();
    if (forgotModal) {
      forgotModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (forgotForm) forgotForm.style.display = 'block';
      if (forgotSuccess) forgotSuccess.style.display = 'none';
      const emailField = document.getElementById('forgotEmail');
      const loginEmail = document.getElementById('loginEmail');
      if (emailField && loginEmail && loginEmail.value) {
        emailField.value = loginEmail.value;
      }
    }
  };

  const closeForgotModal = () => {
    if (forgotModal) {
      forgotModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openForgotBtns.forEach(btn => btn.addEventListener('click', openForgotModal));
  if (closeForgotBtn) closeForgotBtn.addEventListener('click', closeForgotModal);
  if (forgotModal) {
    forgotModal.addEventListener('click', (e) => {
      if (e.target === forgotModal) closeForgotModal();
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailField = document.getElementById('forgotEmail');
      if (!emailField || !AquaPureAuth.validateEmail(emailField.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      const submitBtn = forgotForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Reset Link...';
      }

      await new Promise(r => setTimeout(r, 800));

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Reset Link';
      }

      if (forgotForm) forgotForm.style.display = 'none';
      if (forgotSuccess) forgotSuccess.style.display = 'block';
    });
  }
});

// Expose globally
window.AquaPureAuth = AquaPureAuth;

// STUDIO MOMENTS - script.js
// JavaScript Behavioural Layer

// MOBILE NAVIGATION TOGGLE
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  if (!hamburger || !mainNav) return;

  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close nav when a link is clicked (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  // Highlight active nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  mainNav.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// BOOKING PRICE CALCULATOR
const BOOKING_PRICES = {
  studio: { 30: 250, 60: 300, 120: 350 },
  Passport: { 30: 50, 60: 50, 120: 50 },
  Id: { 30: 20, 60: 20, 120: 20 }
};

function calculateBookingPrice() {
  const serviceEl = document.getElementById('service');
  const durationEl = document.getElementById('duration');
  const priceEl = document.getElementById('bookingPrice');
  const summaryEl = document.getElementById('bookingSummary');

  if (!serviceEl || !durationEl) return;

  const service = serviceEl.value;
  const duration = parseInt(durationEl.value);
  const serviceText = serviceEl.options[serviceEl.selectedIndex]?.text || '-';
  const durationText = durationEl.options[durationEl.selectedIndex]?.text || '-';

  let price = 0;
  if (service && duration && BOOKING_PRICES[service]) {
    price = BOOKING_PRICES[service][duration] || 0;
  }

  if (priceEl) priceEl.textContent = price;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="summary-row"><span>Service</span><span class="value">${serviceText}</span></div>
      <div class="summary-row"><span>Duration</span><span class="value">${durationText}</span></div>
      <div class="total-price">P${price}</div>
    `;
  }
}

function validateBooking() {
  const name = document.getElementById('bname');
  const email = document.getElementById('bemail');
  const service = document.getElementById('service');
  const duration = document.getElementById('duration');
  const msgEl = document.getElementById('bookingMsg');

  const errors = [];
  if (!name?.value.trim()) errors.push('Full Name is required.');
  if (!email?.value.trim()) errors.push('Email is required.');
  if (!service?.value) errors.push('Please select a service.');
  if (!duration?.value) errors.push('Please select a duration.');

  if (errors.length) {
    showMessage(msgEl, errors.join(' '), 'error');
    return false;
  }

  showMessage(msgEl, '✅ Booking confirmed! We will contact you shortly.', 'success');
  return true; // set to false to prevent actual submission during testing
}

// ORDER PRICE CALCULATOR
const ORDER_PRICES = {
  canvas: { A5: 120, A4: 180, A3: 250 },
  photo: { A5: 20, A4: 50, A3: 80 },
  frame: { A5: 80, A4: 120, A3: 200 }
};

function updatePrice() {
  const productEl = document.getElementById('product');
  const sizeEl = document.getElementById('size');
  const quantityEl = document.getElementById('quantity');
  const priceEl = document.getElementById('price');
  const summaryEl = document.getElementById('orderSummary');

  if (!productEl || !sizeEl || !quantityEl) return;

  const product = productEl.value;
  const size = sizeEl.value;
  const quantity = parseInt(quantityEl.value) || 0;
  const productText = productEl.options[productEl.selectedIndex]?.text || '-';

  let unitPrice = 0;
  if (product && size && ORDER_PRICES[product]) {
    unitPrice = ORDER_PRICES[product][size] || 0;
  }
  const total = unitPrice * quantity;

  if (priceEl) priceEl.textContent = total;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="summary-row"><span>Product</span><span class="value">${productText}</span></div>
      <div class="summary-row"><span>Size</span><span class="value">${size || '-'}</span></div>
      <div class="summary-row"><span>Quantity</span><span class="value">${quantity || '-'}</span></div>
      <div class="summary-row"><span>Unit Price</span><span class="value">P${unitPrice}</span></div>
      <div class="total-price">Total: P${total}</div>
    `;
  }
}

function validateOrder() {
  const name = document.getElementById('oname');
  const product = document.getElementById('product');
  const size = document.getElementById('size');
  const quantity = document.getElementById('quantity');
  const msgEl = document.getElementById('orderMsg');

  const errors = [];
  if (!name?.value.trim()) errors.push('Full Name is required.');
  if (!product?.value) errors.push('Please select a product.');
  if (!size?.value) errors.push('Please select a size.');
  if (!quantity?.value || parseInt(quantity.value) < 1)
    errors.push('Quantity must be at least 1.');

  if (errors.length) {
    showMessage(msgEl, errors.join(' '), 'error');
    return false;
  }

  showMessage(msgEl, '✅ Order placed! We will process it shortly.', 'success');
  return true;
}

// CONTACT FORM VALIDATION
function validateContact() {
  const name = document.getElementById('fullname');
  const email = document.getElementById('cemail');
  const message = document.getElementById('message');
  const msgEl = document.getElementById('contactMsg');

  const errors = [];
  if (!name?.value.trim()) errors.push('Full Name is required.');
  if (!email?.value.trim()) errors.push('Email is required.');
  if (!message?.value.trim()) errors.push('Message is required.');

  if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.push('Please enter a valid email address.');
  }

  if (errors.length) {
    showMessage(msgEl, errors.join(' '), 'error');
    return false;
  }

  showMessage(msgEl, '✅ Message sent! We will get back to you soon.', 'success');
  return true;
}

// FEEDBACK FORM VALIDATION
function validateFeedback() {
  const name = document.getElementById('fname');
  const email = document.getElementById('femail');
  const rating = document.querySelector('input[name="rating"]:checked');
  const feedback = document.getElementById('feedbackText');
  const msgEl = document.getElementById('feedbackMsg');

  const errors = [];
  if (!name?.value.trim()) errors.push('Your Name is required.');
  if (!email?.value.trim()) errors.push('Email is required.');
  if (!rating) errors.push('Please rate your experience.');
  if (!feedback?.value.trim()) errors.push('Please write your feedback.');

  if (errors.length) {
    showMessage(msgEl, errors.join(' '), 'error');
    return false;
  }

  showMessage(msgEl, '✅ Thank you for your feedback!', 'success');
  return true;
}

// GALLERY LIGHTBOX
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');

  if (!lightbox) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// HELPER: Show inline alert message
function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = `alert ${type} show`;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// SCROLL ANIMATIONS (Intersection Observer)
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.feature-card, .service-card, .gallery-item, .form-card, .summary-box, .contact-info-card, .info-item'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

// SMOOTH SCROLL FOR ANCHOR LINKS
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// INIT ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLightbox();
  initScrollAnimations();
  initSmoothScroll();

  // Attach live-update events
  const svcEl = document.getElementById('service');
  const durEl = document.getElementById('duration');
  if (svcEl) svcEl.addEventListener('change', calculateBookingPrice);
  if (durEl) durEl.addEventListener('change', calculateBookingPrice);

  const prodEl = document.getElementById('product');
  const szEl = document.getElementById('size');
  const qtyEl = document.getElementById('quantity');
  if (prodEl) prodEl.addEventListener('change', updatePrice);
  if (szEl) szEl.addEventListener('change', updatePrice);
  if (qtyEl) qtyEl.addEventListener('input', updatePrice);
});
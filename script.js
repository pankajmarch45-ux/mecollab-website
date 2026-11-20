// MeCollab - Interactive Agency Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks = document.querySelectorAll('.mob-link');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 2. Tab Switching (Brand vs Creator Form)
  window.switchFormTab = function(type) {
    const tabBrandBtn = document.getElementById('tabBrandBtn');
    const tabCreatorBtn = document.getElementById('tabCreatorBtn');
    const brandForm = document.getElementById('brandForm');
    const creatorForm = document.getElementById('creatorForm');
    const alertBox = document.getElementById('formSuccessAlert');

    if (alertBox) alertBox.style.display = 'none';

    if (type === 'brand') {
      tabBrandBtn.classList.add('active');
      tabCreatorBtn.classList.remove('active');
      brandForm.style.display = 'flex';
      creatorForm.style.display = 'none';
    } else {
      tabCreatorBtn.classList.add('active');
      tabBrandBtn.classList.remove('active');
      creatorForm.style.display = 'flex';
      brandForm.style.display = 'none';
    }
  };

  // 3. Creator Selection Quick Fill
  window.selectCreator = function(creatorName) {
    window.switchFormTab('brand');
    const select = document.getElementById('bCreatorSelect');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(creatorName) || select.options[i].value.includes(creatorName)) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  };

  // 4. Form Submissions
  window.handleBrandSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      document.getElementById('brandForm').reset();
      const alertBox = document.getElementById('formSuccessAlert');
      alertBox.querySelector('h4').textContent = 'Brand Inquiry Received!';
      alertBox.querySelector('p').textContent = 'Our campaign team will review your brief and share creator availability, rates, and media kit on WhatsApp/Email within 24 hours.';
      alertBox.style.display = 'flex';
      alertBox.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  window.handleCreatorSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      document.getElementById('creatorForm').reset();
      const alertBox = document.getElementById('formSuccessAlert');
      alertBox.querySelector('h4').textContent = 'Creator Application Submitted!';
      alertBox.querySelector('p').textContent = 'Welcome to the MeCollab family! Our talent scout will review your profile metrics and reach out for onboarding.';
      alertBox.style.display = 'flex';
      alertBox.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };
});

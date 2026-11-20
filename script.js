// MeCollab - Interactive Agency Logic & Lead Automation

// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
const SCRIPT_WEBHOOK_URL = ""; 

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

  // Helper to send lead data
  async function sendLeadData(payload) {
    // 1. Always store locally as backup
    const localLeads = JSON.parse(localStorage.getItem('mecollab_leads') || '[]');
    localLeads.push(payload);
    localStorage.setItem('mecollab_leads', JSON.stringify(localLeads));

    // 2. If Webhook URL is set, send to Google Sheet / Telegram / Email automation
    if (SCRIPT_WEBHOOK_URL && SCRIPT_WEBHOOK_URL.startsWith('http')) {
      try {
        await fetch(SCRIPT_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Webhook transmission error, saved locally:', err);
      }
    }
  }

  // 4. Form Submissions
  window.handleBrandSubmit = async function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    const brandData = {
      type: 'brand',
      submittedAt: new Date().toISOString(),
      name: document.getElementById('bName').value,
      email: document.getElementById('bEmail').value,
      phone: document.getElementById('bPhone').value,
      company: document.getElementById('bCompany').value,
      creatorSelect: document.getElementById('bCreatorSelect').value,
      budget: document.getElementById('bBudget').value,
      brief: document.getElementById('bBrief').value
    };

    await sendLeadData(brandData);

    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('brandForm').reset();
    const alertBox = document.getElementById('formSuccessAlert');
    alertBox.querySelector('h4').textContent = 'Brand Inquiry Received!';
    alertBox.querySelector('p').textContent = 'Our campaign team will review your brief and share creator availability, rates, and media kit on WhatsApp/Email within 24 hours.';
    alertBox.style.display = 'flex';
    alertBox.scrollIntoView({ behavior: 'smooth' });
  };

  window.handleCreatorSubmit = async function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;

    const creatorData = {
      type: 'creator',
      submittedAt: new Date().toISOString(),
      name: document.getElementById('cName').value,
      email: document.getElementById('cEmail').value,
      phone: document.getElementById('cPhone').value,
      handle: document.getElementById('cHandle').value,
      niche: document.getElementById('cNiche').value,
      followers: document.getElementById('cFollowers').value,
      rates: document.getElementById('cRates').value,
      link: document.getElementById('cLink').value
    };

    await sendLeadData(creatorData);

    btn.innerHTML = originalText;
    btn.disabled = false;
    document.getElementById('creatorForm').reset();
    const alertBox = document.getElementById('formSuccessAlert');
    alertBox.querySelector('h4').textContent = 'Creator Application Submitted!';
    alertBox.querySelector('p').textContent = 'Welcome to the MeCollab family! Our talent scout will review your profile metrics and reach out for onboarding.';
    alertBox.style.display = 'flex';
    alertBox.scrollIntoView({ behavior: 'smooth' });
  };
});

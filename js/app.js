lucide.createIcons();

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute(`data-${lang}`);
        } else {
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });
    document.documentElement.lang = lang;
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}

function openOrderModal(productName) {
    const modal = document.getElementById('orderModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalProductName').textContent = productName;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    const content = document.getElementById('modalContent');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

function handleSubmit(e) {
    e.preventDefault();
    showToast(currentLang === 'en' ? 'Message sent successfully! We will respond within 24 hours.' : 'Message envoyé avec succès! Nous répondrons dans les 24 heures.');
    e.target.reset();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoText = document.querySelector('.nav-text');
    const logoSub = document.querySelector('.nav-text-sub');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-blur', 'shadow-md');
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.classList.add('py-2');
        navLinks.forEach(link => { link.classList.remove('text-white'); link.classList.add('text-silvati-dark'); });
        if (logoText) { logoText.classList.remove('text-white'); logoText.classList.add('text-silvati-dark'); }
        if (logoSub) { logoSub.classList.remove('text-white/80'); logoSub.classList.add('text-silvati-dark/60'); }
    } else {
        navbar.classList.remove('nav-blur', 'shadow-md', 'py-2');
        navbar.classList.add('bg-transparent', 'py-4');
        navLinks.forEach(link => { link.classList.add('text-white'); link.classList.remove('text-silvati-dark'); });
        if (logoText) { logoText.classList.add('text-white'); logoText.classList.remove('text-silvati-dark'); }
        if (logoSub) { logoSub.classList.add('text-white/80'); logoSub.classList.remove('text-silvati-dark/60'); }
    }
});

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const heroTl = gsap.timeline();
    heroTl.to('.hero-logo', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' })
          .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
          .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .to('.hero-line', { opacity: 1, width: '6rem', duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    gsap.utils.toArray('.fade-in-up').forEach(element => {
        gsap.fromTo(element, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

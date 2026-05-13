// ==================== SCRIPT MODERNE POUR PORTFOLIO PREMIUM ====================

document.addEventListener('DOMContentLoaded', () => {
    // ==================== INITIALISATION AOS (Animations) ====================
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 0
    });

    // ==================== GESTION DU MENU DE NAVIGATION ====================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Ouvrir le menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }

    // Fermer le menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });

    // ==================== HEADER SCROLL EFFET ====================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajouter la classe scroll-header
        if (currentScroll >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        lastScroll = currentScroll;
    });

    // ==================== ACTIVE LINK AU SCROLL ====================
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLink.classList.add('active-link');
                }
            } else {
                if (navLink) {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // ==================== ANIMATION DES BARRES DE COMPÉTENCES ====================
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.style.getPropertyValue('--progress');
            bar.style.width = progress;
        });
    };

    // Déclencher l'animation quand la section compétences est visible
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    // ==================== SMOOTH SCROLL POUR ANCRAGES ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== FORMULAIRE DE CONTACT (Netlify Forms) ====================
    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Pour Netlify Forms, laisser le formulaire soumettre normalement
            // Netlify intercepte automatiquement les soumissions

            // Animation de feedback
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            btn.disabled = true;

            // Le formulaire va se soumettre automatiquement vers Netlify
            // Pas de preventDefault - Netlify gère la soumission
        });
    }

    // ==================== EFFET PARALLAXE SOURIS (Hero) ====================
    const heroSection = document.querySelector('.hero');
    const heroCards = document.querySelectorAll('.hero__card');

    if (heroSection && heroCards.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = heroSection.getBoundingClientRect();
            const x = (clientX / width - 0.5) * 20;
            const y = (clientY / height - 0.5) * 20;

            heroCards.forEach((card, index) => {
                const depth = (index + 1) * 10;
                card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        });
    }

    // ==================== ANIMATION DU TITRE HERO ====================
    const typingWords = document.querySelector('.typing-words');
    if (typingWords) {
        const words = typingWords.querySelectorAll('.word');
        let currentIndex = 0;

        setInterval(() => {
            words.forEach((word, index) => {
                word.style.opacity = index === currentIndex ? '1' : '0';
            });
            currentIndex = (currentIndex + 1) % words.length;
        }, 3000);
    }

    // ==================== LIGHT/DARK MODE (Optionnel - désactivé par défaut) ====================
    // Pour activer, décommenter les lignes ci-dessous:
    /*
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    */

    console.log('Portfolio Mahamat Oumar Ismail - Version Premium Initialisée');
});
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('[id$="-icon"]');
    
    allContents.forEach(el => {
        if (el.id !== id && el.classList.contains('active')) {
            el.classList.remove('active');
        }
    });
    
    allIcons.forEach(el => {
        if (el.id !== id + '-icon') {
            el.classList.remove('rotate-180');
        }
    });
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.classList.remove('rotate-180');
    } else {
        content.classList.add('active');
        icon.classList.add('rotate-180');
    }
}

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handleScroll() {
    const navbar = document.querySelector('nav');
    const floatingButtons = document.querySelector('.fixed.bottom-6.right-6');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    updateActiveNav();
    
    if (floatingButtons && window.innerWidth < 768) {
        if (window.scrollY > lastScrollTop && window.scrollY > 200) {
            floatingButtons.style.transform = 'translateY(200%)';
            floatingButtons.style.transition = 'transform 0.3s ease-in-out';
        } else {
            floatingButtons.style.transform = 'translateY(0)';
        }
        lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth < 768) {
                    const menu = document.getElementById('mobile-menu');
                    if (menu && !menu.classList.contains('hidden')) {
                        menu.classList.add('hidden');
                    }
                }
            }
        });
    });
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fadeIn').forEach(el => {
        observer.observe(el);
    });
}

function initImageLazyLoad() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initMobileMenu() {
    document.addEventListener('click', function(e) {
        const navbar = document.getElementById('navbar');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!e.target.closest('nav') && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 30);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function preventAnimationOnResize() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
}

let lastScrollTop = 0;

const debouncedScroll = debounce(handleScroll, 100);

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initAnimations();
    initImageLazyLoad();
    initGalleryEffects();
    initMobileMenu();
    initCounters();
    preventAnimationOnResize();
    updateActiveNav();
    
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const style = document.createElement('style');
    style.textContent = '.resize-animation-stopper * { animation: none !important; transition: none !important; }';
    document.head.appendChild(style);
    
    console.log('%cGabi Rocha - São Paulo', 'color: #a78b6e; font-size: 20px; font-weight: bold;');
    console.log('%cSite desenvolvido com elegância e sofisticação', 'color: #8b7355; font-size: 14px;');
});

window.siteUtils = {
    toggleMenu,
    toggleAccordion,
    updateActiveNav,
    animateCounter
};
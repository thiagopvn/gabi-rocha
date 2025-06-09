function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    const header = icon.parentElement;
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        header.classList.remove('active');
    } else {
         document.querySelectorAll('.accordion-content').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.accordion-header').forEach(el => {
            el.classList.remove('active');
        });

        content.classList.add('active');
        header.classList.add('active');
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            document.querySelector('.nav-links').classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0,0,0,0.95)';
    } else {
        nav.style.background = 'rgba(0,0,0,0.9)';
    }
});

document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');

    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

document.querySelector('.nav-links').addEventListener('click', function(event) {
    if (event.target.tagName !== 'A') {
        event.stopPropagation();
    }
});

function adjustHeroHeight() {
    const hero = document.getElementById('hero');
    if (window.innerWidth <= 768) {
        hero.style.height = window.innerHeight + 'px';
    } else {
        hero.style.height = '100vh';
    }
}

window.addEventListener('load', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);

document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Se você tiver data-src para lazy loading
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    galleryImages.forEach(img => imageObserver.observe(img));
});
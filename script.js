function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('[id$="-icon"]');
    
    allContents.forEach(el => {
        if (el.id !== id) {
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

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.classList.add('shadow-2xl', 'py-3');
        navbar.classList.remove('py-5');
    } else {
        navbar.classList.remove('shadow-2xl', 'py-3');
        navbar.classList.add('py-5');
    }

    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(window.scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
    
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sideNav = document.querySelectorAll('.side-nav-dots a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-copper');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-copper');
        }
    });
    
    sideNav.forEach((link, index) => {
        link.classList.remove('w-8', 'bg-copper');
        link.classList.add('w-2', 'bg-copper/50');
        
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.remove('w-2', 'bg-copper/50');
            link.classList.add('w-8', 'bg-copper');
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth < 1024) {
                    const menu = document.getElementById('mobile-menu');
                    menu.classList.add('hidden');
                }
            }
        });
    });
    
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    const premiumCards = document.querySelectorAll('.premium-card');
    premiumCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const span = document.createElement('span');
        span.className = 'absolute bottom-0 left-0 w-0 h-0.5 bg-copper transition-all duration-300';
        link.appendChild(span);
        link.classList.add('relative', 'pb-1');
        
        link.addEventListener('mouseenter', () => {
            span.style.width = '100%';
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('text-copper')) {
                span.style.width = '0';
            }
        });
    });
    
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
    
    let lastScrollTop = 0;
    const floatingButtons = document.querySelector('.fixed.bottom-8.right-8');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            if (floatingButtons) floatingButtons.style.transform = 'translateY(150%)';
        } else {
            if (floatingButtons) floatingButtons.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    const accordionButtons = document.querySelectorAll('[onclick^="toggleAccordion"]');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const maxHeight = content.scrollHeight + 32;
            
            if (content.classList.contains('active')) {
                content.style.maxHeight = maxHeight + 'px';
                setTimeout(() => {
                    content.style.maxHeight = null;
                }, 10);
            } else {
                content.style.maxHeight = maxHeight + 'px';
            }
        });
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const gallery = document.querySelector('.grid');
    if (gallery) {
        gallery.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        gallery.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            console.log('Swiped left');
        }
        if (touchEndX > touchStartX + 50) {
            console.log('Swiped right');
        }
    }
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-scale-in');
    });
    
    if ('IntersectionObserver' in window) {
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
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('#navbar') && !e.target.closest('#mobile-menu')) {
        const menu = document.getElementById('mobile-menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
});

(function() {
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
    
    const style = document.createElement('style');
    style.textContent = '.resize-animation-stopper * { animation: none !important; transition: none !important; }';
    document.head.appendChild(style);
})();

console.log('%cGabi Rocha - São Paulo', 'color: #B87333; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com 💖', 'color: #E8B4B8; font-size: 14px;');
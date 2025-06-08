// Toggle Menu Mobile
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Toggle Accordion com animação suave
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('[id$="-icon"]');
    
    // Fecha outros accordions
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
    
    // Toggle do accordion atual
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.classList.remove('rotate-180');
    } else {
        content.classList.add('active');
        icon.classList.add('rotate-180');
    }
}

// Scroll Effects
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

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(window.scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });

    updateActiveNavLink();
});

// Update Active Navigation Link
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
    
    sideNav.forEach((link) => {
        link.classList.remove('w-8', 'bg-copper');
        link.classList.add('w-2', 'bg-copper/50');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('w-2', 'bg-copper/50');
            link.classList.add('w-8', 'bg-copper');
        }
    });
}

// Intersection Observer for animations
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

// Image lazy loading observer
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.onload = () => {
                img.classList.remove('image-loading');
                img.classList.add('fade-in');
            };
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Observe reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe images for lazy loading
    document.querySelectorAll('img').forEach(img => {
        if (!img.classList.contains('image-loading')) {
            img.style.opacity = '0';
        }
        imageObserver.observe(img);
    });

    // Smooth scroll
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
                
                // Close mobile menu
                if (window.innerWidth < 1024) {
                    const menu = document.getElementById('mobile-menu');
                    menu.classList.add('hidden');
                }
            }
        });
    });
    
    // Magnetic effect
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
    
    // Premium cards mouse effect
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
    
    // Nav links underline effect
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
    
    // Gallery items stagger animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-scale-in');
    });
    
    // Hide/show floating buttons on scroll
    let lastScrollTop = 0;
    const floatingButtons = document.querySelector('.fixed.bottom-8.right-8');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            if (floatingButtons) {
                floatingButtons.style.transform = 'translateY(150%)';
                floatingButtons.style.transition = 'transform 0.3s ease-in-out';
            }
        } else {
            if (floatingButtons) {
                floatingButtons.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Counter animation
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
    
    // Observe counters
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
    
    // Touch swipe for gallery mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const gallery = document.querySelector('.gallery-grid');
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
            // Swiped left
            console.log('Swiped left');
        }
        if (touchEndX > touchStartX + 50) {
            // Swiped right
            console.log('Swiped right');
        }
    }
    
    // Form validation for contact (if added in future)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let valid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                valid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        return valid;
    }
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debounce to scroll-heavy functions
    const debouncedUpdateNav = debounce(updateActiveNavLink, 100);
    window.addEventListener('scroll', debouncedUpdateNav, { passive: true });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('#navbar') && !e.target.closest('#mobile-menu')) {
        const menu = document.getElementById('mobile-menu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
});

// Prevent animation on window resize
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

// Console branding
console.log('%cGabi Rocha - São Paulo', 'color: #B87333; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com 💖', 'color: #E8B4B8; font-size: 14px;');
console.log('%cExclusive • Elegante • Sofisticado', 'color: #6F4E37; font-size: 12px; font-style: italic;');

// Service Worker Registration (for PWA support in future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// Export functions for external use if needed
window.siteUtils = {
    toggleMenu,
    toggleAccordion,
    updateActiveNavLink
};
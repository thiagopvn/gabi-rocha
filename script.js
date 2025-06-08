function toggleDetails() {
    const details = document.getElementById('details');
    const text = document.getElementById('details-text');
    const arrow = document.getElementById('arrow');
    
    if (details.classList.contains('active')) {
        details.classList.remove('active');
        text.textContent = 'Ver detalhes completos';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        details.classList.add('active');
        text.textContent = 'Ocultar detalhes';
        arrow.style.transform = 'rotate(180deg)';
    }
}

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('[id$="-icon"]');
    
    allContents.forEach(el => {
        if (el.id !== id) el.classList.remove('active');
    });
    
    allIcons.forEach(el => {
        if (el.id !== id + '-icon') el.style.transform = 'rotate(0deg)';
    });
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        icon.style.transform = 'rotate(45deg)';
    }
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
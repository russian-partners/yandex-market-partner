// Preloader and initial animations
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Add class to trigger initial animations
            document.body.classList.add('content-loaded');
            
            // Initialize all animations immediately
            initializeAnimations();
            
        }, 500);
    }, 1000);
});

// Initialize all animations
function initializeAnimations() {
    // Make sure all content is visible
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // Start counter animations
    animateCounters();
    
    // Start progress bars
    animateProgressBars();
    
    // Start circle progress
    animateCircleProgress();
    
    // Trigger scroll animations immediately
    checkScroll();
    
    // Force show all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
}

// Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (counter.getAttribute('data-count') === '5' ? '%' : '');
        }, 16);
    });
}

// Progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Advanced circle progress animation with rotation
function animateCircleProgress() {
    const circles = document.querySelectorAll('.circle-progress');
    
    circles.forEach((circle, index) => {
        const value = circle.getAttribute('data-value');
        const degrees = (value / 100) * 360;
        
        // Set CSS variable for animation
        circle.style.setProperty('--fill-degrees', degrees);
        
        // Add animation class with delay
        setTimeout(() => {
            circle.classList.add('animated');
            
            // Add completed class after animation
            setTimeout(() => {
                circle.classList.add('completed');
            }, 2000);
            
        }, index * 600); // Stagger animation
    });
}

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('visible');
            element.style.opacity = '1';
            element.style.transform = 'none';
        }
    });
}

// Form handling
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
    partnerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            business: formData.get('business')
        };
        
        // Here you would normally send data to your server
        console.log('Form data:', data);
        
        // Show success modal
        showModal();
        
        // Reset form
        this.reset();
    });
}

// Modal functions
function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    // Check scroll animations
    checkScroll();
});

// Initialize animations when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            if (entry.target.classList.contains('advantages-grid')) {
                animateProgressBars();
            }
            if (entry.target.classList.contains('stats-grid')) {
                animateCircleProgress();
            }
        }
    });
}, observerOptions);

// Observe elements for animation triggers
document.addEventListener('DOMContentLoaded', function() {
    // Make sure content is visible immediately
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Add animation classes to elements but keep them visible
    const animatedElements = document.querySelectorAll('.advantage-card, .stat-card, .registration-form, .registration-text');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Observe sections for animations
    const sectionsToObserve = document.querySelectorAll('.hero-stats, .advantages-grid, .stats-grid');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
});

// Check scroll on load and scroll
window.addEventListener('scroll', checkScroll);

// Add animation classes on load and make visible
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.classList.add('slide-in-left', 'initial-load');
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
    }
    
    if (heroVisual) {
        heroVisual.classList.add('slide-in-right', 'initial-load');
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Ensure content is visible even if JavaScript fails
document.addEventListener('DOMContentLoaded', function() {
    // Fallback: make all content visible after a timeout
    setTimeout(() => {
        document.querySelectorAll('section, .hero-content, .hero-visual').forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            }
        });
    }, 2000);
});

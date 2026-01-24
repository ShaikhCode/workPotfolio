// ==========================================
// MAIN JAVASCRIPT FILE
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just #
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // NAVBAR BACKGROUND ON SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for styling
        if (currentScroll > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        // if (currentScroll > lastScroll && currentScroll > 500) {
        //     navbar?.classList.add('navbar-hidden');
        // } else {
        //     navbar?.classList.remove('navbar-hidden');
        // }

        lastScroll = currentScroll;
    });

    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // ==========================================
    // PARALLAX EFFECT ON HERO SECTION
    // ==========================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (hero && scrolled < window.innerHeight) {
            // Parallax background
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            
            // Fade out content
            if (heroContent) {
                const opacity = 1 - (scrolled / window.innerHeight);
                heroContent.style.opacity = opacity;
            }
        }
    });

    // ==========================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));

    // ==========================================
    // TYPING EFFECT FOR HERO TEXT (Optional)
    // ==========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Uncomment to use typing effect
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 100);
    // }

    // ==========================================
    // CURSOR TRAIL EFFECT (Optional)
    // ==========================================
    function createCursorTrail() {
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll('.cursor-circle');

        if (circles.length === 0) return;

        circles.forEach((circle, index) => {
            circle.x = 0;
            circle.y = 0;
        });

        window.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            circles.forEach((circle, index) => {
                circle.style.left = x - 12 + 'px';
                circle.style.top = y - 12 + 'px';
                circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        }

        animateCircles();
    }

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollToTop();

    // Add CSS for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--accent);
            color: var(--bg-dark);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 255, 136, 0.5);
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // DETECT IF ELEMENT IS IN VIEWPORT
    // ==========================================
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ==========================================
    // COUNTER ANIMATION FOR STATS
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Trigger counter animation when stats are in view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        stat.dataset.suffix = stat.textContent.replace(/[0-9]/g, '');
        statsObserver.observe(stat);
    });

    // ==========================================
    // PAGE LOAD ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        
        // Remove loader if exists
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }, 500);
        }
    });

    // ==========================================
    // FORM VALIDATION (If contact form exists)
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted:', data);
                contactForm.reset();
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
            }
        });
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    // Debounce function for performance
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c👋 Hello! Checking out the code?', 'font-size: 20px; color: #00ff88; font-weight: bold;');
    console.log('%cFeel free to explore! Built with vanilla JavaScript.', 'font-size: 14px; color: #a0a0a0;');

})();
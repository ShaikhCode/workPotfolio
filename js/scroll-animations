// ==========================================
// SCROLL ANIMATIONS USING INTERSECTION OBSERVER
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    const config = {
        // Observer options
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        },
        
        // Animation classes
        animationClasses: {
            fadeUp: 'animate-fade-up',
            fadeDown: 'animate-fade-down',
            fadeLeft: 'animate-fade-left',
            fadeRight: 'animate-fade-right',
            scaleUp: 'animate-scale-up'
        }
    };

    // ==========================================
    // MAIN SCROLL OBSERVER
    // ==========================================
    const createScrollObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class to trigger animation
                    entry.target.classList.add('visible');
                    
                    // Add specific animation class if it has data-animation attribute
                    const animationType = entry.target.dataset.animation;
                    if (animationType && config.animationClasses[animationType]) {
                        entry.target.classList.add(config.animationClasses[animationType]);
                    }
                    
                    // Optional: Unobserve after animation (for one-time animations)
                    if (!entry.target.dataset.repeatAnimation) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    // Optional: Remove visible class when out of view (for repeating animations)
                    if (entry.target.dataset.repeatAnimation) {
                        entry.target.classList.remove('visible');
                    }
                }
            });
        }, config.observerOptions);

        return observer;
    };

    // ==========================================
    // INITIALIZE SCROLL ANIMATIONS
    // ==========================================
    const initScrollAnimations = () => {
        const observer = createScrollObserver();

        // Select all elements that should animate on scroll
        const animatedElements = document.querySelectorAll(`
            .section-title,
            .section-subtitle,
            .section-description,
            .testimonial-card,
            .project-card,
            .skill-card,
            .about-image,
            .about-content,
            .stat-item,
            .contact-item,
            .animate-on-scroll
        `);

        // Observe each element
        animatedElements.forEach((element, index) => {
            // Add initial state
            element.classList.add('animate-on-scroll');
            
            // Add stagger delay for grid items
            if (element.classList.contains('testimonial-card') || 
                element.classList.contains('project-card') || 
                element.classList.contains('skill-card')) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }

            observer.observe(element);
        });

        console.log(`Observing ${animatedElements.length} elements for scroll animations`);
    };

    // ==========================================
    // STAGGER ANIMATIONS FOR GRID ITEMS
    // ==========================================
    const addStaggerAnimation = (containerSelector, itemSelector, delay = 0.1) => {
        const containers = document.querySelectorAll(containerSelector);
        
        containers.forEach(container => {
            const items = container.querySelectorAll(itemSelector);
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * delay}s`;
            });
        });
    };

    // Apply stagger animations to specific sections
    const initStaggerAnimations = () => {
        addStaggerAnimation('.testimonials-grid', '.testimonial-card', 0.15);
        addStaggerAnimation('.projects-grid', '.project-card', 0.15);
        addStaggerAnimation('.skills-grid', '.skill-card', 0.1);
        addStaggerAnimation('.about-stats', '.stat-item', 0.1);
    };

    // ==========================================
    // PARALLAX SCROLL EFFECT
    // ==========================================
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Use requestAnimationFrame for smooth parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // ==========================================
    // REVEAL ANIMATION (For text/content)
    // ==========================================
    const initRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal-text');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target;
                    const words = text.textContent.split(' ');
                    text.innerHTML = '';
                    
                    words.forEach((word, index) => {
                        const span = document.createElement('span');
                        span.textContent = word + ' ';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(20px)';
                        span.style.display = 'inline-block';
                        span.style.animation = `fadeUp 0.5s ease forwards ${index * 0.1}s`;
                        text.appendChild(span);
                    });
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        revealElements.forEach(element => revealObserver.observe(element));
    };

    // ==========================================
    // SCROLL PROGRESS FOR SECTIONS
    // ==========================================
    const initSectionProgress = () => {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = Math.min(
                        Math.max(
                            (windowHeight - rect.top) / (sectionHeight + windowHeight),
                            0
                        ),
                        1
                    );
                    
                    section.style.setProperty('--scroll-progress', progress);
                }
            });
        });
    };

    // ==========================================
    // VIEWPORT ANIMATIONS
    // ==========================================
    const initViewportAnimations = () => {
        // Add animation when elements come into view
        const viewportElements = document.querySelectorAll('[data-viewport-animation]');
        
        const viewportObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationName = entry.target.dataset.viewportAnimation;
                    entry.target.style.animation = `${animationName} 0.8s ease forwards`;
                    viewportObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        viewportElements.forEach(el => viewportObserver.observe(el));
    };

    // ==========================================
    // SCROLL DIRECTION DETECTION
    // ==========================================
    let lastScrollTop = 0;
    let scrollDirection = 'down';

    const detectScrollDirection = () => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                scrollDirection = 'down';
                document.body.classList.add('scroll-down');
                document.body.classList.remove('scroll-up');
            } else {
                scrollDirection = 'up';
                document.body.classList.add('scroll-up');
                document.body.classList.remove('scroll-down');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    };

    // ==========================================
    // SCROLL TRIGGERED ANIMATIONS
    // ==========================================
    const initScrollTriggers = () => {
        const triggers = document.querySelectorAll('[data-scroll-trigger]');
        
        const triggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                const action = target.dataset.scrollTrigger;
                
                if (entry.isIntersecting) {
                    // Execute custom action based on data attribute
                    switch(action) {
                        case 'counter':
                            startCounter(target);
                            break;
                        case 'chart':
                            animateChart(target);
                            break;
                        case 'progressBar':
                            animateProgressBar(target);
                            break;
                        default:
                            target.classList.add('triggered');
                    }
                    
                    triggerObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        triggers.forEach(trigger => triggerObserver.observe(trigger));
    };

    // Helper functions for scroll triggers
    function startCounter(element) {
        // Counter animation logic (already in main.js)
        element.classList.add('counting');
    }

    function animateChart(element) {
        // Chart animation logic
        element.classList.add('chart-animated');
    }

    function animateProgressBar(element) {
        // Progress bar animation
        const bars = element.querySelectorAll('.progress-bar-fill');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.dataset.width || '0%';
                bar.style.width = width;
            }, index * 200);
        });
    }

    // ==========================================
    // SMOOTH REVEAL ON SCROLL
    // ==========================================
    const initSmoothReveal = () => {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .animate-on-scroll {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // INITIALIZE ALL ANIMATIONS
    // ==========================================
    const init = () => {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeAnimations();
            });
        } else {
            initializeAnimations();
        }
    };

    const initializeAnimations = () => {
        initSmoothReveal();
        initScrollAnimations();
        initStaggerAnimations();
        initParallax();
        initRevealAnimation();
        initSectionProgress();
        initViewportAnimations();
        detectScrollDirection();
        initScrollTriggers();
        
        console.log('✨ Scroll animations initialized');
    };

    // ==========================================
    // START
    // ==========================================
    init();

    // ==========================================
    // EXPORT FOR USE IN OTHER SCRIPTS
    // ==========================================
    window.ScrollAnimations = {
        createScrollObserver,
        addStaggerAnimation,
        initParallax,
        config
    };

})();
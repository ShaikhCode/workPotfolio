// ==========================================
// TESTIMONIALS INTERACTIONS & ANIMATIONS
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // TESTIMONIAL CARD INTERACTIONS
    // ==========================================
    const initTestimonialCards = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach((card, index) => {
            // Add index data attribute
            card.dataset.index = index;

            // Mouse enter - add glow effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.zIndex = '10';
            });

            // Mouse leave - remove glow effect
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });

            // Click to expand (optional feature)
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a link
                if (e.target.tagName === 'A') return;
                
                // Toggle expanded class
                const wasExpanded = this.classList.contains('expanded');
                
                // Collapse all other cards
                testimonialCards.forEach(c => c.classList.remove('expanded'));
                
                // Toggle this card
                if (!wasExpanded) {
                    this.classList.add('expanded');
                }
            });
        });
    };

    // ==========================================
    // TESTIMONIAL SLIDER (Optional Feature)
    // ==========================================
    const initTestimonialSlider = () => {
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (!sliderContainer) return;

        const slides = sliderContainer.querySelectorAll('.testimonial-slide');
        const prevBtn = sliderContainer.querySelector('.slider-prev');
        const nextBtn = sliderContainer.querySelector('.slider-next');
        const dots = sliderContainer.querySelectorAll('.slider-dot');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        const goToSlide = (slideIndex) => {
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
            });

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });

            currentSlide = slideIndex;
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        };

        // Event listeners
        prevBtn?.addEventListener('click', prevSlide);
        nextBtn?.addEventListener('click', nextSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Auto-play (optional)
        let autoPlayInterval;
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Start auto-play
        startAutoPlay();

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);

        // Initialize
        goToSlide(0);
    };

    // ==========================================
    // TESTIMONIAL FILTERING
    // ==========================================
    const initTestimonialFilter = () => {
        const filterButtons = document.querySelectorAll('.testimonial-filter');
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter testimonials
                testimonialCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };

    // ==========================================
    // ANIMATED BADGE
    // ==========================================
    const initAnimatedBadges = () => {
        const badges = document.querySelectorAll('.testimonial-badge');
        
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const badge = entry.target;
                    const text = badge.textContent;
                    badge.textContent = '';
                    
                    // Animate each letter
                    text.split('').forEach((char, index) => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(-20px)';
                        span.style.animation = `fadeUp 0.3s ease forwards ${index * 0.05}s`;
                        badge.appendChild(span);
                    });
                    
                    badgeObserver.unobserve(badge);
                }
            });
        }, { threshold: 0.5 });

        badges.forEach(badge => badgeObserver.observe(badge));
    };

    // ==========================================
    // TESTIMONIAL MODAL
    // ==========================================
    const initTestimonialModal = () => {
        const modal = document.getElementById('testimonial-modal');
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');
        const closeBtn = modal.querySelector('.modal-close');
        const testimonialCards = document.querySelectorAll('.testimonial-card[data-expandable]');

        const openModal = (testimonial) => {
            const badge = testimonial.querySelector('.testimonial-badge').textContent;
            const text = testimonial.querySelector('.testimonial-text').textContent;
            const author = testimonial.querySelector('.author-name').textContent;
            const position = testimonial.querySelector('.author-position').textContent;

            modalContent.innerHTML = `
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-badge">${badge}</div>
                <p class="modal-text">${text}</p>
                <div class="modal-author">
                    <h4>${author}</h4>
                    <p>${position}</p>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Re-attach close button listener
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Open modal on card click
        testimonialCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    // ==========================================
    // TESTIMONIAL STATISTICS
    // ==========================================
    const displayTestimonialStats = () => {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const statsContainer = document.querySelector('.testimonial-stats');
        
        if (!statsContainer) return;

        const stats = {
            total: testimonials.length,
            categories: {}
        };

        testimonials.forEach(card => {
            const category = card.dataset.category || 'General';
            stats.categories[category] = (stats.categories[category] || 0) + 1;
        });

        console.log('Testimonial Statistics:', stats);
    };

    // ==========================================
    // RANDOM TESTIMONIAL HIGHLIGHT
    // ==========================================
    const highlightRandomTestimonial = () => {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;

        // Remove previous highlights
        testimonials.forEach(t => t.classList.remove('highlighted'));

        // Highlight random testimonial
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        testimonials[randomIndex].classList.add('highlighted');

        // Add CSS for highlighted state
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-card.highlighted {
                animation: pulseGlow 2s ease-in-out;
            }
            
            @keyframes pulseGlow {
                0%, 100% {
                    box-shadow: 0 0 0 rgba(0, 255, 136, 0);
                }
                50% {
                    box-shadow: 0 0 30px rgba(0, 255, 136, 0.6);
                }
            }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // TESTIMONIAL SHARING
    // ==========================================
    const initTestimonialShare = () => {
        const shareButtons = document.querySelectorAll('.testimonial-share');

        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const card = this.closest('.testimonial-card');
                const text = card.querySelector('.testimonial-text').textContent;
                const author = card.querySelector('.author-name').textContent;
                
                const shareText = `"${text}" - ${author}`;
                const shareUrl = window.location.href;

                if (navigator.share) {
                    navigator.share({
                        title: 'Testimonial',
                        text: shareText,
                        url: shareUrl
                    }).catch(err => console.log('Share cancelled'));
                } else {
                    // Fallback - copy to clipboard
                    navigator.clipboard.writeText(shareText).then(() => {
                        alert('Testimonial copied to clipboard!');
                    });
                }
            });
        });
    };

    // ==========================================
    // TESTIMONIAL CAROUSEL (Alternative to Slider)
    // ==========================================
    const initTestimonialCarousel = () => {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;

        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let currentIndex = 0;

        const slides = carousel.querySelectorAll('.carousel-item');
        const slidesCount = slides.length;

        slides.forEach((slide, index) => {
            // Touch events
            slide.addEventListener('touchstart', touchStart(index));
            slide.addEventListener('touchend', touchEnd);
            slide.addEventListener('touchmove', touchMove);

            // Mouse events
            slide.addEventListener('mousedown', touchStart(index));
            slide.addEventListener('mouseup', touchEnd);
            slide.addEventListener('mouseleave', touchEnd);
            slide.addEventListener('mousemove', touchMove);

            // Prevent drag on images
            slide.addEventListener('dragstart', (e) => e.preventDefault());
        });

        function touchStart(index) {
            return function(event) {
                currentIndex = index;
                startPos = getPositionX(event);
                isDragging = true;
                carousel.style.cursor = 'grabbing';
            };
        }

        function touchEnd() {
            isDragging = false;
            carousel.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100 && currentIndex < slidesCount - 1) currentIndex += 1;
            if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

            setPositionByIndex();
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function setPositionByIndex() {
            currentTranslate = currentIndex * -window.innerWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }

        function setSliderPosition() {
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        }
    };

    // ==========================================
    // INITIALIZE ALL TESTIMONIAL FEATURES
    // ==========================================
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeFeatures);
        } else {
            initializeFeatures();
        }
    };

    const initializeFeatures = () => {
        initTestimonialCards();
        initTestimonialSlider();
        initTestimonialFilter();
        initAnimatedBadges();
        initTestimonialModal();
        displayTestimonialStats();
        initTestimonialShare();
        initTestimonialCarousel();
        
        console.log('💬 Testimonials features initialized');
        
        // Optional: Highlight a random testimonial on page load
        // setTimeout(highlightRandomTestimonial, 2000);
    };

    // ==========================================
    // START
    // ==========================================
    init();

    // ==========================================
    // EXPORT FOR USE IN OTHER SCRIPTS
    // ==========================================
    window.Testimonials = {
        highlightRandomTestimonial,
        displayTestimonialStats
    };

})();
// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const duration = 2000; // Animation duration in milliseconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const start = 0;
        const increment = target / totalFrames;
        let current = start;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, frameDuration);
    });
}

// Initialize stats counter when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ensure the animation runs on mobile
            if (window.innerWidth <= 768) {
                // Force a small delay to ensure the element is fully visible
                setTimeout(animateStats, 100);
            } else {
                animateStats();
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, // Lower threshold for mobile
    rootMargin: '0px 0px -50px 0px' // Adjust root margin for better mobile detection
});

// Observe all stats sections
document.querySelectorAll('.stats-section').forEach(section => {
    statsObserver.observe(section);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        // Toggle menu on hamburger click
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu clicked'); // Debug log
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Prevent menu from closing when clicking inside it
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    } else {
        console.error('Mobile menu elements not found'); // Debug log
    }
});

// Mobile Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on mobile and stats section is visible
    if (window.innerWidth <= 768) {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // If stats section is already visible on mobile, trigger animation
                setTimeout(animateStats, 100);
            }
        }
    }

    // Lazy load videos on mobile
    const videos = document.querySelectorAll('video');
    if (window.innerWidth <= 768) {
        videos.forEach(video => {
            video.setAttribute('preload', 'none');
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
        });
    }

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optimize touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
}); 
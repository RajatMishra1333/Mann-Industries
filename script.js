  document.addEventListener('DOMContentLoaded', function() {
            // Loading Screen
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 2000);

            // Create floating particles
            function createParticles() {
                const particlesContainer = document.getElementById('particles');
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 15 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    particlesContainer.appendChild(particle);
                }
            }
            createParticles();

            // Header and navigation
            const header = document.getElementById('header');
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');
            const backToTopButton = document.getElementById('back-to-top');

            // Mobile Menu Toggle
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            });

            // Close mobile menu when clicking on links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                });
            });

            // Sticky Header on Scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Back to top button
                if (window.scrollY > 300) {
                    backToTopButton.style.display = 'flex';
                } else {
                    backToTopButton.style.display = 'none';
                }
            });

            // Hero Carousel
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.carousel-dot');
            let currentSlide = 0;

            function showSlide(index) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            // Auto-play carousel
            setInterval(() => {
                showSlide((currentSlide + 1) % slides.length);
            }, 6000);

            // Carousel dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });

            // Contact Form
            const form = document.getElementById('enquiry-form');
            const successMessage = document.getElementById('success-message');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    successMessage.classList.add('show');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }, 1500);
            });

            // Back to Top Button
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            });

            // Animate on Scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animate counter numbers
                        if (entry.target.classList.contains('stat-item')) {
                            const counter = entry.target.querySelector('.stat-number');
                            const target = parseInt(counter.getAttribute('data-target'));
                            const increment = target / 50;
                            let current = 0;

                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    counter.textContent = target.toLocaleString();
                                    clearInterval(timer);
                                } else {
                                    counter.textContent = Math.floor(current).toLocaleString();
                                }
                            }, 30);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right').forEach(el => {
                observer.observe(el);
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add staggered animation delays
            const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right');
            animatedElements.forEach((el, index) => {
                el.style.transitionDelay = (index * 0.1) + 's';
            });
        });
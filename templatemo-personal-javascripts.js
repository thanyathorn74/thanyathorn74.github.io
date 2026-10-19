/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            // observe ทุก portfolio-grid เผื่อหน้ามีมากกว่าหนึ่งชุด
            document.querySelectorAll('.portfolio-grid').forEach(grid => {
                portfolioObserver.observe(grid);
            });
        });

        // ไฮไลต์เมนูตาม section ที่กำลังดูอยู่
        const navLinks = document.querySelectorAll('.nav-links a');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

        // Activities: ปุ่มลูกศรเลื่อนการ์ดซ้าย-ขวา
        const activityScroller = document.getElementById('activityScroller');
        if (activityScroller) {
            const arrows = document.querySelectorAll('.activity-arrow');
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

            const cardStep = () => {
                const card = activityScroller.querySelector('.activity-card');
                const gap = parseFloat(getComputedStyle(activityScroller).columnGap) || 24;
                return card ? card.offsetWidth + gap : 300;
            };

            const updateArrows = () => {
                const maxScroll = activityScroller.scrollWidth - activityScroller.clientWidth - 2;
                arrows[0].disabled = activityScroller.scrollLeft <= 2;
                arrows[1].disabled = activityScroller.scrollLeft >= maxScroll;
            };

            arrows.forEach(btn => {
                btn.addEventListener('click', () => {
                    activityScroller.scrollBy({
                        left: cardStep() * Number(btn.dataset.dir),
                        behavior: reduceMotion.matches ? 'auto' : 'smooth'
                    });
                });
            });

            activityScroller.addEventListener('scroll', updateArrows, { passive: true });
            window.addEventListener('resize', updateArrows);
            updateArrows();
        }

        // Activities: สลับรูปในการ์ดที่มีหลายรูป (กดจุด หรือกดที่รูปเพื่อไปรูปถัดไป)
        document.querySelectorAll('.activity-cover').forEach(cover => {
            const photos = cover.querySelectorAll('img');
            const dots = cover.querySelectorAll('.gallery-dots button');
            if (photos.length < 2) return;

            let current = 0;
            const show = (index) => {
                current = (index + photos.length) % photos.length;
                photos.forEach((photo, n) => photo.classList.toggle('is-active', n === current));
                dots.forEach((dot, n) => dot.classList.toggle('is-active', n === current));
            };

            dots.forEach((dot, n) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    show(n);
                });
            });
            cover.addEventListener('click', () => show(current + 1));
        });

        // Enhanced smooth scrolling for navigation links
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

        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            // หน้าโปรเจกต์รายปีไม่มี .hero
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
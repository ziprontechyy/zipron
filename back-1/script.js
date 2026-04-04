// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced Scroll Reveal Animation with different effects
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add staggered delay based on index
            const delay = index * 0.15;
            element.style.transitionDelay = `${delay}s`;
            element.classList.add('active');
            
            // Add specific animation classes based on element type
            if (element.classList.contains('about-card')) {
                element.style.animation = 'scaleIn 0.8s ease-out forwards';
            } else if (element.classList.contains('service-category')) {
                element.style.animation = 'slideInLeft 0.8s ease-out forwards';
            } else if (element.classList.contains('domain-item')) {
                element.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        } else {
            element.classList.remove('active');
        }
    });
}

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    const heroBgImage = document.querySelector('.hero-bg-image');
    
    if (heroBg && heroContent) {
        heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.2}px) scale(${1 - scrolled / 3000})`;
        heroContent.style.opacity = 1 - scrolled / 700;
        
        if (heroBgImage) {
            heroBgImage.style.transform = `scale(${1.1 + scrolled / 2000})`;
        }
    }
});

// Add interactive hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements with staggered animation
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.classList.add('reveal');
        section.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add hover tilt effect to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    });
    
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-btn, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 4;
            const moveY = (y - centerY) / 4;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Initial reveal check
    reveal();
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.card-icon i');
    icons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.6}s`;
    });
    
    // Enhanced typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid rgba(0, 210, 255, 0.5)';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                heroSubtitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 800);
    }
    
    // Add particle effects to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createParticles(heroSection);
    }
});

// Create floating particles effect
function createParticles(container) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: radial-gradient(circle, rgba(0, 210, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        container.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    // Create cursor trail
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        top: ${cursorY}px;
        left: ${cursorX}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, var(--secondary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        document.body.removeChild(trail);
    }, 1200);
    
    requestAnimationFrame(animateCursor);
}

// Add cursor fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorFade {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.2);
        }
    }
`;
document.head.appendChild(style);

// Start cursor animation
animateCursor();

// Domain Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send data to Flask backend
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification(result.message || 'Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Notification System
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00d2ff, #8b5cf6)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 10, 24, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 210, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 10, 24, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to domain items
const domainItems = document.querySelectorAll('.domain-item');

domainItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(139, 92, 246, 0.1))';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'var(--glass-bg)';
    });
});

// Scroll event listener for enhanced animations
window.addEventListener('scroll', reveal);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

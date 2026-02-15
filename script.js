document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle (Simplified)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu functionality would open a side drawer in a full implementation.');
        });
    }

    // 2. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.padding = '0.7rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.padding = '1rem 0';
        }
    });

    // 3. Live Demo Simulation
    const btnAuth = document.getElementById('btn-authorized');
    const btnUnauth = document.getElementById('btn-unauthorized');
    const demoStatus = document.getElementById('demo-status');
    const demoImg = document.getElementById('demo-img');
    const demoFaceBox = document.querySelector('.demo-face-box');
    const systemLogs = document.getElementById('system-logs');
    const demoTime = document.getElementById('demo-time');

    // Update real-time clock in demo
    setInterval(() => {
        const now = new Date();
        demoTime.textContent = now.toTimeString().split(' ')[0];
    }, 1000);

    function addLog(message, type = 'info') {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        if (type === 'error') entry.style.color = '#ff4757';
        if (type === 'success') entry.style.color = '#00ff88';

        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        entry.textContent = `[${timestamp}] [${type.toUpperCase()}] ${message}`;

        systemLogs.prepend(entry);
        if (systemLogs.children.length > 8) {
            systemLogs.removeChild(systemLogs.lastChild);
        }
    }

    btnAuth.addEventListener('click', () => {
        btnAuth.classList.add('active');
        btnUnauth.classList.remove('active');

        demoStatus.textContent = 'AUTHORIZED';
        demoStatus.className = 'status-value authorized';
        demoImg.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop';
        demoFaceBox.style.borderColor = '#00ff88';
        demoFaceBox.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';

        addLog('Face detected: User ID #882', 'success');
        addLog('Access granted.', 'info');
    });

    btnUnauth.addEventListener('click', () => {
        btnUnauth.classList.add('active');
        btnAuth.classList.remove('active');

        demoStatus.textContent = 'UNAUTHORIZED';
        demoStatus.className = 'status-value unauthorized';
        demoImg.src = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop';
        demoFaceBox.style.borderColor = '#ff4757';
        demoFaceBox.style.boxShadow = '0 0 10px rgba(255, 71, 87, 0.3)';

        addLog('UNKNOWN PERSON DETECTED!', 'error');
        addLog('Activating alarm system...', 'error');
        addLog('Email alert sent with image attachment.', 'success');
    });

    // 4. Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = 'Sending...';

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#00ff88';
                contactForm.reset();

                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Scroll Reveal Effect (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .step, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS for reveal class
    const styleAttr = document.createElement('style');
    styleAttr.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleAttr);
});

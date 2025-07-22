// Initialize AOS (Animate on Scroll)
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTION (for all pages) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavPanel = document.querySelector('.mobile-nav-panel');
    const closeIcon = document.querySelector('.close-icon');
    const mobileAccordionHeader = document.querySelector('.mobile-nav-accordion-header');

    // --- MOBILE MENU LOGIC (MODIFIED) ---

// Define clear functions to open and close the menu
const openMobileMenu = () => {
    if (mobileNavPanel) {
        mobileNavPanel.classList.add('open');
    }
};

const closeMobileMenu = () => {
    if (mobileNavPanel) {
        mobileNavPanel.classList.remove('open');
    }
};

// Attach listener to the hamburger to OPEN the menu
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', openMobileMenu);
}

// Attach listener to the close icon to CLOSE the menu
if (closeIcon) {
    closeIcon.addEventListener('click', closeMobileMenu);
}

// Attach listener to the accordion HEADER. 
// This should NOT close the main menu, so we stop the event.
if (mobileAccordionHeader) {
    mobileAccordionHeader.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent this click from bubbling up
        const accordion = mobileAccordionHeader.parentElement;
        const content = accordion.querySelector('.mobile-nav-accordion-content');
        
        if (accordion && content) {
            accordion.classList.toggle('open');
            content.classList.toggle('open');
        }
    });
}

// --- NEW: LOGIC TO CLOSE MENU ON OUTSIDE CLICK ---
// This part is the only addition you need.
document.addEventListener('click', (event) => {
    // We only proceed if the mobile navigation panel exists and is open
    if (mobileNavPanel && mobileNavPanel.classList.contains('open')) {
        // The condition to close is:
        // 1. The click was NOT on the navigation panel itself (or any of its children)
        // AND
        // 2. The click was NOT on the hamburger menu icon (or any of its children)
        if (!mobileNavPanel.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            closeMobileMenu(); // If both conditions are true, call your existing close function
        }
    }
});

    // Attach listeners to all LINKS within the mobile menu to CLOSE it upon navigation.
    const allMobileLinks = document.querySelectorAll('.mobile-nav-panel a');
    if (allMobileLinks.length > 0) {
        allMobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // --- HOMEPAGE-ONLY ACCORDION FUNCTIONALITY ---
    // This part will only run if it finds the #services accordion, i.e., on the homepage.
    const accordionItems = document.querySelectorAll('#services .accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                const openItem = document.querySelector('#services .accordion-item.active');
                
                if (openItem && openItem !== item) {
                    openItem.classList.remove('active');
                    openItem.querySelector('.accordion-details').classList.remove('open');
                }

                item.classList.toggle('active');
                item.querySelector('.accordion-details').classList.toggle('open');
            });
        });
    }
    
    // --- DYNAMIC COPYRIGHT YEAR ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // --- COOKIE BANNER ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookieBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && acceptCookieBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                 cookieBanner.classList.add('show');
            }, 1500);
        }

        acceptCookieBtn.addEventListener('click', () => {
            cookieBanner.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
});
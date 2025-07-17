// Initialize AOS (Animate on Scroll)
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavPanel = document.querySelector('.mobile-nav-panel');
    const closeIcon = document.querySelector('.close-icon');
    const navLinksMobile = mobileNavPanel.querySelectorAll('a');

    const toggleNav = () => {
        mobileNavPanel.classList.toggle('open');
    };

    hamburgerMenu.addEventListener('click', toggleNav);
    closeIcon.addEventListener('click', toggleNav);
    // Close mobile nav when a link is clicked
    navLinksMobile.forEach(link => {
        link.addEventListener('click', toggleNav);
    });


    // --- ACCORDION FUNCTIONALITY ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.accordion-item.active');
            
            // Close the currently open item if it's not the one being clicked
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
                openItem.querySelector('.accordion-details').classList.remove('open');
            }

            // Toggle the clicked item's active state
            item.classList.toggle('active');
            item.querySelector('.accordion-details').classList.toggle('open');
        });
    });
    

    // --- DYNAMIC COPYRIGHT YEAR ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }


    // --- COOKIE BANNER ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookieBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && acceptCookieBtn) {
        // Check if the user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Wait a bit before showing the banner to not be intrusive
            setTimeout(() => {
                 cookieBanner.classList.add('show');
            }, 1500);
        }

        acceptCookieBtn.addEventListener('click', () => {
            // Hide the banner
            cookieBanner.classList.remove('show');
            
            // Set a value in localStorage to remember the choice
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

});
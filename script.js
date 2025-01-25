function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('#menu-toggle');
  
    // Toggle menu visibility
    navLinks.classList.toggle('show');
    
    // Toggle hamburger/X icon
    menuToggle.classList.toggle('open');
  }
  
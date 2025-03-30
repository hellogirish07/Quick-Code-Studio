// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change menu icon
    const menuIcon = mobileMenuBtn.querySelector('i');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const menuIcon = mobileMenuBtn.querySelector('i');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const menuIcon = mobileMenuBtn.querySelector('i');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    });
});

// Add event listener to the contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create custom subject line
    const subject = `New Contact Form Message by ${name} on the Quick Code Studio`;

    // Add hidden subject field to form
    const subjectInput = document.createElement('input');
    subjectInput.type = 'hidden';
    subjectInput.name = 'subject'; 
    subjectInput.value = subject;
    this.appendChild(subjectInput);

    // Add from_name field
    const fromNameInput = document.createElement('input');
    fromNameInput.type = 'hidden';
    fromNameInput.name = 'from_name';
    fromNameInput.value = name;
    this.appendChild(fromNameInput);

    // Submit the form
    this.submit();

    // Clear the form
    this.reset();
});



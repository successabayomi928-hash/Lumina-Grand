
        // Navbar scroll effect disabled
        // window.addEventListener('scroll', () => {
        //     const navbar = document.getElementById('navbar');
        //     if (window.scrollY > 50) {
        //         navbar.classList.add('scrolled');
        //     } else {
        //         navbar.classList.remove('scrolled');
        //     }
        // });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function() {
               
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                }
            });
        });

        const bookingButtons = document.querySelectorAll('.book-room-btn, #bookStayBtn');
        bookingButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.currentTarget;
                if (target.matches('a[href^="#"]')) {
                    event.preventDefault();
                    const section = document.querySelector(target.getAttribute('href'));
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    document.body.classList.add('booking-active');
                    setTimeout(() => {
                        document.body.classList.remove('booking-active');
                    }, 2400);
                }

                target.classList.add('button-clicked');
                setTimeout(() => {
                    target.classList.remove('button-clicked');
                }, 350);
            });
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Testimonial slider
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }

        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Booking Modal
        function openBookingModal(roomName, price) {
            document.getElementById('modalRoomInfo').textContent = `Booking: ${roomName} - $${price}/night`;
            document.getElementById('bookingModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('booking-active');
        }

        function closeBookingModal() {
            document.getElementById('bookingModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            document.body.classList.remove('booking-active');
        }

        // Close modal on overlay click
        document.getElementById('bookingModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('bookingModal')) {
                closeBookingModal();
            }
        });



        // Search rooms
        function searchRooms() {
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            
            if (!checkin || !checkout) {
                showToast('Please select check-in and check-out dates.');
                return;
            }
            
            document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
            showToast('Showing available rooms for your selected dates!');
        }

        // Toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }

        // Set min date for date inputs
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('input[type="date"]').forEach(input => {
            input.setAttribute('min', today);
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('mobile-open');
        }
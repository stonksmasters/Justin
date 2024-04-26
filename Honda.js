  document.addEventListener('DOMContentLoaded', function () {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.image-gallery img');
            const totalSlides = slides.length;
        
            function updateSlides() {
                slides.forEach((slide, index) => {
                    slide.style.display = (index === currentSlide) ? 'block' : 'none';
                });
            }
        
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlides();
            }
        
            function previousSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlides();
            }
        
            document.getElementById('next').addEventListener('click', nextSlide);
            document.getElementById('prev').addEventListener('click', previousSlide);
        
            updateSlides(); // Initial call to display the first slide
        
            // Optional: Auto-advance slides every 5 seconds
            setInterval(nextSlide, 5000);
        });
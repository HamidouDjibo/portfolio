$(document).ready(function(){
    // Barre de navigation sticky & bouton retour en haut au défilement
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Clic sur le bouton retour en haut
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0}, 400);
    });

    // Ouverture / fermeture du menu mobile
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Fermer automatiquement le menu mobile quand on clique sur un lien
    $('.navbar .menu li a').click(function(){
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Animation de frappe dynamique (sans dépendance externe)
    const roles = [
        "Développeur",
        "Data Scientist Junior",
        "IT Support"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect(){
        const currentRole = roles[roleIndex];
        const displayedText = isDeleting
            ? currentRole.substring(0, charIndex--)
            : currentRole.substring(0, charIndex++);

        $('.typing, .typing-2').text(displayedText);

        let typingSpeed = isDeleting ? 50 : 100;

        if(!isDeleting && charIndex === currentRole.length + 1){
            typingSpeed = 1800; // Pause quand le mot est complet
            isDeleting = true;
        } else if(isDeleting && charIndex === 0){
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // Retour visuel lors de la soumission du formulaire
    $('#contact-form').on('submit', function(){
        $('#form-status').text("Ouverture de votre messagerie pour envoyer le message à djibo8526@gmail.com...");
    });

    // Alternance dynamique des deux photos dans la section À propos
    let currentSlide = 0;
    const slides = $('.about-slider .slide');
    const dots = $('.about-slider .dot');

    function showSlide(index){
        slides.removeClass('active').eq(index).addClass('active');
        dots.removeClass('active').eq(index).addClass('active');
        currentSlide = index;
    }

    let slideInterval = setInterval(function(){
        showSlide((currentSlide + 1) % slides.length);
    }, 4000);

    dots.click(function(){
        clearInterval(slideInterval);
        showSlide($(this).data('index'));
        slideInterval = setInterval(function(){
            showSlide((currentSlide + 1) % slides.length);
        }, 4000);
    });

    $('.about-slider').hover(
        function(){ clearInterval(slideInterval); },
        function(){
            slideInterval = setInterval(function(){
                showSlide((currentSlide + 1) % slides.length);
            }, 4000);
        }
    );
});
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SCROLL PROGRESS
    ====================================================== */

    const progress =
        document.getElementById("progress");


    function updateProgress() {

        if (!progress) {
            return;
        }


        const scrollTop =
            window.scrollY;


        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        let percentage = 0;


        if (pageHeight > 0) {

            percentage =
                (scrollTop / pageHeight) * 100;

        }


        progress.style.width =
            `${percentage}%`;
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();



    /* =====================================================
       2. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );

            }
        );

    }



    /* =====================================================
       3. 3D CARD TILT
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(".tilt");


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (finePointer) {

        tiltCards.forEach(
            (card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateX =
                            ((y - centerY) /
                                centerY) *
                            -4;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            4;


                        card.style.transform =
                            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

                    }
                );

            }
        );

    }



    /* =====================================================
       4. APP SHOWCASE
    ====================================================== */

    const slides =
        document.querySelectorAll(
            "[data-copy]"
        );


    const dotsContainer =
        document.getElementById(
            "appDots"
        );


    const screenCount =
        document.getElementById(
            "screenCount"
        );


    const phoneValue =
        document.getElementById(
            "phoneValue"
        );


    const phoneMain =
        document.getElementById(
            "phoneMain"
        );


    let currentSlide = 0;

    let autoSlideTimer = null;



    const phoneData = [

        {
            value: "₹10,00,000"
        },

        {
            value: "₹10,00,000"
        },

        {
            value: "₹25,000"
        },

        {
            value: "₹10,25,000"
        },

        {
            value: "Exclusive"
        },

        {
            value: "24 / 7"
        }

    ];



    /* =====================================================
       CREATE DOTS
    ====================================================== */

    if (
        dotsContainer &&
        slides.length > 0
    ) {

        slides.forEach(
            (_, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type = "button";

                dot.className =
                    "app-dot";


                dot.setAttribute(
                    "aria-label",
                    `Show screen ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        showSlide(index);

                        restartSlider();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );

    }



    /* =====================================================
       SHOW SLIDE
    ====================================================== */

    function showSlide(index) {

        if (slides.length === 0) {
            return;
        }


        currentSlide =
            (index + slides.length) %
            slides.length;



        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === currentSlide
                );

            }
        );



        const dots =
            dotsContainer
                ? dotsContainer.querySelectorAll(
                    ".app-dot"
                )
                : [];


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );

            }
        );



        if (screenCount) {

            screenCount.textContent =
                `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

        }



        if (
            phoneValue &&
            phoneData[currentSlide]
        ) {

            phoneValue.textContent =
                phoneData[currentSlide].value;

        }



        if (phoneMain) {

            phoneMain.style.transform =
                "translateY(-8px) scale(1.02)";


            window.setTimeout(
                () => {

                    phoneMain.style.transform =
                        "translateY(0) scale(1)";

                },
                220
            );

        }

    }



    /* =====================================================
       AUTO SLIDER
    ====================================================== */

    function startSlider() {

        if (slides.length <= 1) {
            return;
        }


        clearInterval(
            autoSlideTimer
        );


        autoSlideTimer =
            window.setInterval(
                () => {

                    showSlide(
                        currentSlide + 1
                    );

                },
                4500
            );

    }



    function restartSlider() {

        clearInterval(
            autoSlideTimer
        );


        startSlider();

    }



    if (slides.length > 0) {

        showSlide(0);

        startSlider();

    }



    /* =====================================================
       PAUSE SLIDER WHEN MOUSE IS OVER IT
    ====================================================== */

    const appShowcase =
        document.querySelector(
            ".app-showcase"
        );


    if (appShowcase) {

        appShowcase.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    autoSlideTimer
                );

            }
        );


        appShowcase.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );

    }



    /* =====================================================
       5. SMOOTH SCROLL
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );



    /* =====================================================
       6. PAGE READY
    ====================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
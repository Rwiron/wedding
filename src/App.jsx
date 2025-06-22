import { useState, useEffect } from "react";
import groomAndBrideImg from "./assets/images/groomandbride.jpg";
import invitationImg from "./assets/images/invitation.jpg";
import boatImg from "./assets/images/boat.jpg";
import homeImg from "./assets/images/home.jpg";
import churchImg from "./assets/images/church.jpg";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [showDeveloperPage, setShowDeveloperPage] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentStorySlide, setCurrentStorySlide] = useState(0);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const heroImages = [groomAndBrideImg, boatImg];
  const galleryImages = [invitationImg, groomAndBrideImg, homeImg, churchImg, boatImg];
  const storyCards = [
    {
      title: "Our Journey Together",
      content: "\"And as for the matter which you and I have spoken of, indeed the Lord be between you and me forever.\" (1 Sam 20:23)",
      image: groomAndBrideImg
    },
    {
      title: "A Beautiful Beginning",
      content: "The family of Rev. Dr. MUTAGANDA Marcel and HAFASHIMANA Vincent have great pleasure to invite you to the wedding ceremony of their children.",
      image: invitationImg
    },
    {
      title: "Forever Together",
      content: "With hearts full of joy and gratitude, we invite you to witness the union of Céline and Derrick as they begin their journey as husband and wife.",
      image: homeImg
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    // Set wedding date - August 09, 2025
    const weddingDate = new Date("2025-08-09T14:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // Close mobile menu and modal when clicking outside
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false);
      }
      if (isCreditsModalOpen && !event.target.closest(".modal-content")) {
        setIsCreditsModalOpen(false);
      }
      // Close gallery modal if clicking on backdrop
      if (selectedGalleryImage && event.target.classList.contains("gallery-modal-backdrop")) {
        setSelectedGalleryImage(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen, isCreditsModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isCreditsModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isCreditsModalOpen]);

  // Hero image auto-slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);



  // Story cards auto-slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentStorySlide((prev) => (prev + 1) % storyCards.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(slideInterval);
  }, [storyCards.length]);

  // Keyboard support for gallery modal
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (selectedGalleryImage) {
        if (event.key === "Escape") {
          setSelectedGalleryImage(null);
        } else if (event.key === "ArrowLeft") {
          setSelectedGalleryImage({
            img: galleryImages[selectedGalleryImage.index === 0 ? galleryImages.length - 1 : selectedGalleryImage.index - 1],
            index: selectedGalleryImage.index === 0 ? galleryImages.length - 1 : selectedGalleryImage.index - 1
          });
        } else if (event.key === "ArrowRight") {
          setSelectedGalleryImage({
            img: galleryImages[(selectedGalleryImage.index + 1) % galleryImages.length],
            index: (selectedGalleryImage.index + 1) % galleryImages.length
          });
        }
      }
    };

    if (selectedGalleryImage) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedGalleryImage, galleryImages]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  const handleCreditsClick = () => {
    if (isMobile()) {
      setShowDeveloperPage(true);
    } else {
      setIsCreditsModalOpen(true);
    }
  };

  // Developer Page Component
  const DeveloperPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowDeveloperPage(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </button>
          <h1 className="text-lg font-serif text-gray-800">Developer Info</h1>
          <div className="w-12"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            RW
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">R Wiron</h2>
          <p className="text-gray-600">Full Stack Developer</p>
          <p className="text-gray-500 text-sm mt-2">Feel free to reach out!</p>
        </div>

        <div className="space-y-4">
          <a
            href="mailto:ruzindanawiron@gmail.com"
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
              📧
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-sm text-gray-600">ruzindanawiron@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+250780961542"
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
              📞
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Phone</p>
              <p className="text-sm text-gray-600">+250 780 961 542</p>
            </div>
          </a>

          <a
            href="https://wa.me/250780961542"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
              💬
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">WhatsApp</p>
              <p className="text-sm text-gray-600">+250 780 961 542</p>
            </div>
          </a>

          <a
            href="https://github.com/rwiron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-xl">
              🐙
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">GitHub</p>
              <p className="text-sm text-gray-600">github.com/rwiron</p>
            </div>
          </a>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm text-center">
          <p className="text-sm text-gray-500">Thank you for visiting! 🚀</p>
          <p className="text-xs text-gray-400 mt-2">
            Website crafted with ❤️ for Céline & Derrick
          </p>
        </div>
      </div>
    </div>
  );

  if (showDeveloperPage) {
    return <DeveloperPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-serif text-rose-600">
              Céline & Derrick
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("countdown")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Countdown
              </button>
              <button
                onClick={() => scrollToSection("story")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollToSection("details")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Location
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("rsvp")}
                className="text-gray-700 hover:text-rose-600 transition-colors"
              >
                RSVP
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-rose-600 focus:outline-none focus:text-rose-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                🏠 Home
              </button>
              <button
                onClick={() => scrollToSection("countdown")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                ⏰ Countdown
              </button>
              <button
                onClick={() => scrollToSection("story")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                💕 Our Story
              </button>
              <button
                onClick={() => scrollToSection("details")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                📅 Details
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                📍 Location
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                🖼️ Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                📞 Contact
              </button>
              <button
                onClick={() => scrollToSection("rsvp")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                ✉️ RSVP
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentHeroSlide ? 'opacity-90' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        <div
          className={`relative z-10 text-center text-white px-4 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-4 sm:mb-8 animate-float">
            Céline & Derrick
          </h1>

          {/* Desktop/Tablet content */}
          <div className="hidden sm:block">
            <p
              className={`text-xl md:text-2xl mb-8 ${
                isVisible ? "animate-fadeInUp animate-delay-200" : "opacity-0"
              }`}
            >
              Together Forever
            </p>
            <div
              className={`text-lg md:text-xl ${
                isVisible ? "animate-fadeInUp animate-delay-400" : "opacity-0"
              }`}
            >
              <p className="mb-2">Saturday, August 09, 2025</p>
              <p>College Saint André NYAMIRAMBO</p>
            </div>

            <button
              onClick={() => scrollToSection("countdown")}
              className={`mt-8 px-8 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 ${
                isVisible ? "animate-fadeInUp animate-delay-500" : "opacity-0"
              }`}
            >
              View Countdown
            </button>
          </div>
        </div>

        {/* Bouncing Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 animate-bounce-scroll">
          <button
            onClick={() => scrollToSection("countdown")}
            className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 flex flex-col items-center"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 mb-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            <div className="text-xs font-medium tracking-wide">Scroll Down</div>
          </button>
        </div>
      </section>

      {/* Countdown Section */}
      <section
        id="countdown"
        className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Countdown to Our Big Day
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              Every moment brings us closer to forever
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp">
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {timeLeft.days}
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wide">
                Days
              </div>
              <div className="mt-2 text-2xl">📅</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animate-delay-200">
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {timeLeft.hours}
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wide">
                Hours
              </div>
              <div className="mt-2 text-2xl">⏰</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animate-delay-400">
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {timeLeft.minutes}
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wide">
                Minutes
              </div>
              <div className="mt-2 text-2xl">⏱️</div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp animate-delay-600">
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {timeLeft.seconds}
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wide">
                Seconds
              </div>
              <div className="mt-2 text-2xl">⚡</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl animate-float">💕</span>
              <span className="text-gray-700 font-medium">
                Can't wait to celebrate with you!
              </span>
              <span className="text-2xl animate-float animate-delay-200">
                💍
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 gradient-rose">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Our Love Story
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              The beautiful chapters of our journey together
            </p>
          </div>

          {/* Sliding Story Cards */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentStorySlide * 100}%)` }}
              >
                {storyCards.map((card, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="animate-fadeInLeft">
                        <h3 className="text-2xl font-serif text-gray-800 mb-6">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {card.content}
                        </p>
                        
                        {/* Story progress indicator */}
                        <div className="mt-8 flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            Chapter {index + 1} of {storyCards.length}
                          </span>
                          <div className="flex space-x-1">
                            {storyCards.map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  i === currentStorySlide ? 'bg-rose-600' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="animate-fadeInRight">
                        <div className="relative">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="rounded-lg shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center text-white text-2xl animate-float">
                            💕
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentStorySlide((prev) => 
                  prev === 0 ? storyCards.length - 1 : prev - 1
                )}
                className="bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                {storyCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStorySlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentStorySlide 
                        ? 'bg-rose-600 scale-125' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentStorySlide((prev) => 
                  (prev + 1) % storyCards.length
                )}
                className="bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Details Section */}
      <section id="details" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Wedding Details
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center animate-fadeInLeft">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">⛪</div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Religious Wedding Ceremony
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Date:</strong> Saturday, August 09, 2025
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Time:</strong> 2:00 PM (14:00)
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Location:</strong> ADEPR MUMENA
                </p>
                <p className="text-gray-600">College Saint André NYAMIRAMBO</p>
              </div>
            </div>

            <div className="text-center animate-fadeInRight">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Introduction & Dowry Giving
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Date:</strong> Saturday, August 09, 2025
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Time:</strong> 9:00 AM
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Location:</strong> Salle ya College Saint André
                </p>
                <p className="text-gray-600">NYAMIRAMBO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section
        id="location"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Find Us Here
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              College Saint André NYAMIRAMBO - Your journey to our special day
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6188.841196706635!2d30.050740812143125!3d-1.9778727979959145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5e85c543a97%3A0x293b270987add565!2zQ29sbMOoZ2UgU2FpbnQgQW5kcsOp!5e1!3m2!1sen!2srw!4v1749343911129!5m2!1sen!2srw"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96"
                ></iframe>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <div className="relative">
                <h3 className="text-2xl font-serif text-gray-800 mb-6">
                  Join Us at College Saint André
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">📍</div>
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p>College Saint André NYAMIRAMBO</p>
                      <p>Kigali, Rwanda</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">🚗</div>
                    <div>
                      <p className="font-semibold">Getting There:</p>
                      <p>Easily accessible by car or public transport</p>
                      <p>Parking available on-site</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">⏰</div>
                    <div>
                      <p className="font-semibold">Event Times:</p>
                      <p>Introduction: 9:00 AM</p>
                      <p>Religious Ceremony: 2:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Animated Car */}
                <div className="mt-8 relative h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg overflow-hidden border-2 border-gray-200">
                  {/* Road */}
                  <div className="absolute bottom-4 left-0 right-0 h-2 bg-gray-600 rounded">
                    {/* Road lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-yellow-300 transform -translate-y-1/2">
                      <div className="w-8 h-full bg-white animate-road-lines"></div>
                    </div>
                  </div>

                  {/* Traveling Car */}
                  <div className="absolute top-1/2 left-0 animate-car-travel">
                    <div className="text-4xl">🚗</div>
                  </div>

                  {/* Destination */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl animate-float">🏛️</div>
                      <div className="text-xs text-gray-600 font-medium mt-1">
                        Wedding Ceremony
                      </div>
                    </div>
                  </div>

                  {/* Journey text */}
                  <div className="absolute top-2 left-4">
                    <div className="text-sm text-gray-700 font-medium">
                      Your journey to our special day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 gradient-gold">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Gallery
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              Capturing beautiful moments of our journey
            </p>
          </div>

          {/* Gallery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedGalleryImage({ img, index })}
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {index === 0 && "Wedding Invitation"}
                    {index === 1 && "Céline & Derrick"}
                    {index === 2 && "Beautiful Moments"}
                    {index === 3 && "Sacred Place"}
                    {index === 4 && "Journey Together"}
                  </h3>
                  <p className="text-gray-600 text-sm">Click to view full image</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 gallery-modal-backdrop">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <img
                src={selectedGalleryImage.img}
                alt={`Gallery image ${selectedGalleryImage.index + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-serif text-gray-800 mb-2">
                  {selectedGalleryImage.index === 0 && "Wedding Invitation"}
                  {selectedGalleryImage.index === 1 && "Céline & Derrick"}
                  {selectedGalleryImage.index === 2 && "Beautiful Moments"}
                  {selectedGalleryImage.index === 3 && "Sacred Place"}
                  {selectedGalleryImage.index === 4 && "Journey Together"}
                </h3>
                <p className="text-gray-600">
                  {selectedGalleryImage.index === 0 && "Our beautiful wedding invitation design"}
                  {selectedGalleryImage.index === 1 && "A precious moment captured together"}
                  {selectedGalleryImage.index === 2 && "Celebrating our love and happiness"}
                  {selectedGalleryImage.index === 3 && "Where our hearts found their home"}
                  {selectedGalleryImage.index === 4 && "Every step of our journey together"}
                </p>
                
                {/* Navigation in Modal */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setSelectedGalleryImage({
                      img: galleryImages[selectedGalleryImage.index === 0 ? galleryImages.length - 1 : selectedGalleryImage.index - 1],
                      index: selectedGalleryImage.index === 0 ? galleryImages.length - 1 : selectedGalleryImage.index - 1
                    })}
                    className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Previous</span>
                  </button>
                  
                  <span className="text-gray-500 text-sm">
                    {selectedGalleryImage.index + 1} of {galleryImages.length}
                  </span>
                  
                  <button
                    onClick={() => setSelectedGalleryImage({
                      img: galleryImages[(selectedGalleryImage.index + 1) % galleryImages.length],
                      index: (selectedGalleryImage.index + 1) % galleryImages.length
                    })}
                    className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <span>Next</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-rose-50 to-pink-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              For any questions or assistance, please feel free to contact us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center animate-fadeInLeft">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">👰</div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Céline
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>📞</strong> 0788 576 367
                  </p>
                  <p>
                    <strong>📞</strong> 0783 467 906
                  </p>
                  <p>
                    <strong>📞</strong> 0781 107 473
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center animate-fadeInRight">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🤵</div>
                <h3 className="text-2xl font-serif text-gray-800 mb-4">
                  Derrick
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>📞</strong> 0788 487 688
                  </p>
                  <p>
                    <strong>📞</strong> 0788 774 407
                  </p>
                  <p>
                    <strong>📞</strong> 0780 616 991
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4 animate-fadeInUp">
              RSVP & Support
            </h2>
            <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg animate-fadeInUp animate-delay-200">
              We can't wait to celebrate with you! Please let us know if you'll
              be joining us.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Section */}
            <div className="animate-fadeInLeft">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">
                  💝 Support Our Journey
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Your love and support mean the world to us. If you'd like to
                  contribute to our new beginning, you can donate via mobile
                  money.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Choose Recipient
                    </label>
                    <select
                      id="donationRecipient"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="0788576367">
                        👰 Céline - 0788 576 367
                      </option>
                      <option value="0780616991">
                        🤵 Derrick - 0780 616 991
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Amount (RWF)
                    </label>
                    <input
                      type="number"
                      id="donationAmount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter amount (e.g., 5000)"
                      min="100"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const recipient =
                        document.getElementById("donationRecipient").value;
                      const amount =
                        document.getElementById("donationAmount").value;
                      if (amount && amount >= 100) {
                        const ussdCode = `*182*1*1*${recipient}*${amount}#`;
                        window.location.href = `tel:${ussdCode}`;
                      } else {
                        alert("Please enter a valid amount (minimum 100 RWF)");
                      }
                    }}
                    className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg"
                  >
                    💰 Donate Now
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    This will open your phone's dialer with the mobile money
                    code
                  </p>
                </div>
              </div>
            </div>

            {/* RSVP Section */}
            <div className="animate-fadeInRight">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">
                  📝 RSVP via WhatsApp
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Send your RSVP directly to the groom via WhatsApp for a quick
                  response!
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const firstName = formData.get("firstName");
                    const lastName = formData.get("lastName");
                    const attending = formData.get("attending");
                    const guests = formData.get("guests");
                    const message = formData.get("message");

                    const whatsappMessage = `Hello Derrick! 👋\n\nRSVP for your wedding:\n\n👤 Name: ${firstName} ${lastName}\n✅ Attending: ${attending}\n👥 Number of guests: ${guests}\n💌 Message: ${
                      message || "Looking forward to your special day!"
                    }\n\nCongratulations! 🎉💕`;

                    const whatsappUrl = `https://wa.me/250780616991?text=${encodeURIComponent(
                      whatsappMessage
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Will you be attending?
                    </label>
                    <select
                      name="attending"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Please select...</option>
                      <option value="Yes, I'll be there!">
                        Yes, I'll be there! 🎉
                      </option>
                      <option value="Sorry, I can't make it">
                        Sorry, I can't make it 😔
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select number...</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5+">5+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Special Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                      placeholder="Share your wishes for the happy couple..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg flex items-center justify-center space-x-2"
                  >
                    <span>📱</span>
                    <span>Send RSVP via WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-serif mb-4">Céline & Derrick</h3>
          <p className="text-gray-400 mb-6">
            Thank you for being part of our special day
          </p>
          <div className="flex justify-center space-x-6 text-2xl">
            <span className="animate-float">💕</span>
            <span className="animate-float animate-delay-200">💍</span>
            <span className="animate-float animate-delay-400">🌹</span>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            © 2025 Céline & Derrick Wedding. Made with love.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-xs">
              Website crafted by{" "}
              <button
                onClick={() => {
                  console.log("Credits button clicked");
                  handleCreditsClick();
                }}
                className="text-rose-400 hover:text-rose-300 underline transition-colors"
              >
                R Wiron
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* Credits Modal */}
      {isCreditsModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCreditsModalOpen(false);
            }
          }}
        >
          <div
            className="modal-content bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif text-gray-800">
                  Developer Info
                </h3>
                <button
                  onClick={() => setIsCreditsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  RW
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  R Wiron
                </h4>
                <p className="text-gray-600 text-sm">Full Stack Developer</p>
                <p className="text-gray-500 text-xs mt-2">
                  Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:ruzindanawiron@gmail.com"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                    📧
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-sm text-gray-600">
                      ruzindanawiron@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+250780961542"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    📞
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-sm text-gray-600">+250 780 961 542</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/250780961542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    💬
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">WhatsApp</p>
                    <p className="text-sm text-gray-600">+250 780 961 542</p>
                  </div>
                </a>

                <a
                  href="https://github.com/rwiron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white">
                    🐙
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">GitHub</p>
                    <p className="text-sm text-gray-600">github.com/rwiron</p>
                  </div>
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  Thank you for visiting! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

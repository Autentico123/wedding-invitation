import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Users, Mail, ArrowUp, Sparkles } from "lucide-react";

/**
 * Enhanced Navigation Component
 * Features: Improved visual design, better animations, cleaner UI
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Menu items configuration
  const menuItems = [
    {
      name: "Home",
      href: "#home",
      icon: Heart,
      description: "Back to top",
      color: "text-rose-400",
    },
    {
      name: "Save the Date",
      href: "#save-date",
      icon: Users,
      description: "Important dates",
      color: "text-maroon-400",
    },
    {
      name: "RSVP",
      href: "#rsvp",
      icon: Mail,
      description: "Respond to invitation",
      color: "text-khaki-300",
    },
  ];

  /**
   * Handle scroll events
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;

      setScrollY(currentScrollY);

      const progress = (currentScrollY / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Update active section
      const sections = ["home", "save-date", "rsvp"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /**
   * Enhanced smooth scroll handler
   */
  const scrollToSection = (href) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  /**
   * Scroll to top
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  /**
   * Close menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Enhanced navbar classes with better glassmorphism
  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out w-full
    ${
      scrollY > 50
        ? "bg-maroon-900/98 backdrop-blur-2xl shadow-2xl border-b border-maroon-700/30"
        : "bg-maroon-900/95 backdrop-blur-xl shadow-xl border-b border-maroon-700/20"
    }
    ${isVisible ? "translate-y-0" : "-translate-y-full"}
  `;

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav className={navbarClasses}>
        {/* Enhanced Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-khaki-400 via-maroon-500 to-khaki-400 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
            {/* Enhanced Logo */}
            <motion.div
              className="flex items-center cursor-pointer group relative"
              onClick={() => scrollToSection("#home")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Mobile Logo */}
              <div className="flex md:hidden items-center space-x-2">
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-khaki-400/30 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative z-10 bg-gradient-to-br from-khaki-200 to-khaki-400 rounded-full p-2 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Heart className="w-5 h-5 text-maroon-800 fill-current" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-serif font-bold text-lg tracking-wide">
                    Jesseca & Syrel
                  </span>
                  <span className="text-khaki-200 font-medium tracking-wider text-xs">
                    WEDDING
                  </span>
                </div>
              </div>

              {/* Desktop Logo */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-khaki-400/40 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="relative z-10 bg-gradient-to-br from-khaki-200 to-khaki-400 rounded-full p-3 shadow-2xl border-2 border-white/20"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Heart className="w-6 h-6 text-maroon-800 fill-current" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-serif font-bold text-xl lg:text-2xl tracking-wide">
                    Jesseca & Syrel
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-khaki-200 font-medium tracking-wider text-sm lg:text-base">
                      WEDDING INVITATION
                    </span>
                    <Sparkles className="w-3 h-3 text-khaki-300 animate-pulse-slow" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu - Enhanced Design */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`relative flex items-center space-x-2 px-4 py-2.5 lg:px-5 lg:py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/15 shadow-xl border border-white/20"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-khaki-400/20 to-maroon-500/20 rounded-xl"
                          layoutId="activeTab"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      <item.icon
                        className={`w-4 h-4 relative z-10 transition-colors duration-300 ${
                          isActive
                            ? item.color
                            : "text-khaki-300 group-hover:text-white"
                        }`}
                      />
                      <span
                        className={`font-medium text-sm lg:text-base relative z-10 transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-khaki-400/0 via-white/10 to-khaki-400/0 rounded-xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden mobile-menu-container">
              <motion.button
                onClick={toggleMobileMenu}
                className="relative p-3 text-white rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden mobile-menu-container w-full overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-4 border-t border-maroon-700/50 bg-maroon-900/60 backdrop-blur-xl rounded-b-2xl shadow-2xl">
                  {menuItems.map((item, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.button
                        key={item.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(item.href);
                        }}
                        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg my-1 group transition-all duration-300 ${
                          isActive
                            ? "text-white bg-white/15 shadow-lg border border-white/20"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-khaki-300/30 to-maroon-400/30"
                              : "bg-khaki-300/20 group-hover:bg-khaki-300/30"
                          }`}
                        >
                          <item.icon
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isActive ? item.color : "text-khaki-300"
                            }`}
                          />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-white/60">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-khaki-400 rounded-full"
                            layoutId="activeMobile"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.button>
                    );
                  })}

                  <motion.div
                    className="mt-3 pt-3 border-t border-white/10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-khaki-300/70 text-xs flex items-center justify-center space-x-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{Math.round(scrollProgress)}% scrolled</span>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {scrollY > 300 && (
          <motion.button
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-2xl group"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-maroon-600/60 rounded-full blur-xl group-hover:bg-maroon-500/70 transition-all duration-300" />

            {/* Button */}
            <div className="relative bg-gradient-to-br from-maroon-700 to-maroon-900 backdrop-blur-md text-white rounded-full border-2 border-white/20 p-3">
              <ArrowUp className="w-5 h-5" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

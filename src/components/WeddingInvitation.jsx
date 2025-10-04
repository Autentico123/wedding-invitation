import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowUp,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

// Component imports
import Navigation from "./Navigation";
import FlipCard from "./FlipCard";
import SaveTheDate from "./SaveTheDate";
import RSVPForm from "./RSVPForm";

// Store and utilities
import useWeddingStore from "../store/weddingStore";
import { ANIMATION_VARIANTS, FLIP_IMAGES } from "../utils/constants";

/**
 * Main Wedding Invitation Component with enhanced footer
 * Features: FlipCard-first design, Save The Date, RSVP Form, Enhanced Footer
 * Improvements: Cleaner flow, simplified navigation, focused content, sophisticated footer
 * FIXED: JSX closing tag mismatch resolved
 */
const WeddingInvitation = () => {
  const { weddingData } = useWeddingStore();

  /**
   * Enhanced scroll to top handler
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Handle contact actions
   */
  const handleContact = (type, value) => {
    switch (type) {
      case "phone":
        window.open(`tel:${value}`);
        break;
      case "email":
        window.open(`mailto:${value}`);
        break;
      default:
        break;
    }
  };

  /**
   * Handle map navigation
   */
  const handleMapNavigation = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  /**
   * Enhanced footer animation variants
   */
  const footerVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    },
    section: {
      hidden: {
        opacity: 0,
        y: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    },
    link: {
      hidden: {
        opacity: 0,
        x: -20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-white scrollbar-wedding overflow-x-hidden w-full max-w-full">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Hero Section - Fixed FlipCard Positioning */}
      <motion.section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-8 lg:pt-28 overflow-x-hidden w-full max-w-full"
        style={{
          backgroundImage: "url(/background-image.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.stagger}
      >
        {/* Optimized Background Overlay for Better FlipCard Visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/60 via-maroon-800/40 to-rose-900/50"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Main Content Container - Fixed Positioning */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-6xl mx-auto">
          {/* FlipCard - Primary Focus Element with Fixed Positioning */}
          <motion.div
            className="relative mb-6 md:mb-8 lg:mb-10 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            {/* Enhanced FlipCard Spotlight - Reduced intensity for mobile */}
            <motion.div
              className="absolute inset-0 -m-8 md:-m-12 lg:-m-16 bg-gradient-radial from-white/20 via-khaki-400/15 to-transparent rounded-full blur-2xl md:blur-3xl"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Secondary glow for depth - Mobile optimized */}
            <motion.div
              className="absolute inset-0 -m-6 md:-m-10 lg:-m-12 bg-gradient-radial from-khaki-300/25 via-transparent to-transparent rounded-full blur-xl md:blur-2xl"
              animate={{
                scale: [0.95, 1.03, 0.95],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />

            {/* FlipCard Component - Main Feature with proper z-index */}
            <div className="relative z-10">
              <FlipCard images={FLIP_IMAGES} />
            </div>

            {/* Floating Hearts Around FlipCard - Mobile optimized positions */}
            <motion.div
              className="absolute -top-4 -left-4 md:-top-6 md:-left-6 text-khaki-300/60 z-5"
              animate={{
                y: [-3, 3, -3],
                rotate: [0, 8, 0],
                scale: [0.8, 0.95, 0.8],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-4 h-4 md:w-6 md:h-6 fill-current" />
            </motion.div>

            <motion.div
              className="absolute -top-3 -right-6 md:-top-4 md:-right-8 text-khaki-400/70 z-5"
              animate={{
                y: [2, -2, 2],
                rotate: [0, -12, 0],
                scale: [0.9, 0.85, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <Heart className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-3 md:-bottom-6 md:-right-4 text-rose-300/60 z-5"
              animate={{
                y: [-2, 5, -2],
                rotate: [0, 15, 0],
                scale: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
            </motion.div>
          </motion.div>

          {/* Simplified Header Content - Better spacing */}
          <motion.div
            className="text-center mb-6 md:mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {/* Welcome Message - Responsive text sizing */}
            <motion.h1
              className="text-2xl md:text-4xl lg:text-5xl font-serif text-white mb-3 md:mb-4 leading-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              You're Invited to Our
              <span className="block text-khaki-300 mt-1 md:mt-2">Wedding Celebration</span>
            </motion.h1>

            {/* Simple Elegant Divider - Mobile optimized */}
            <motion.div
              className="flex items-center justify-center space-x-3 md:space-x-4 mb-4 md:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="w-12 md:w-16 h-px bg-khaki-300/60"></div>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-khaki-300/80" />
              <div className="w-12 md:w-16 h-px bg-khaki-300/60"></div>
            </motion.div>

            {/* Clear Call to Action - Better responsive text */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-khaki-200/95 font-light max-w-2xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Tap the photo above to view {FLIP_IMAGES.length} important details about our special day
            </motion.p>
          </motion.div>

          {/* Interactive Instruction - Better spacing */}
          <motion.div
            className="flex flex-col items-center space-y-4 md:space-y-6 mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Prominent Action Button - Mobile optimized */}
            <motion.div
              className="bg-white/15 backdrop-blur-md rounded-full px-6 py-3 md:px-8 md:py-4 border border-white/20 shadow-2xl"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.1)",
                  "0 15px 35px rgba(0,0,0,0.15)",
                  "0 10px 30px rgba(0,0,0,0.1)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5 text-khaki-300 fill-current" />
                </motion.div>
                <span className="text-white font-medium text-sm md:text-base lg:text-lg">
                  👆 Interactive Wedding Album
                </span>
              </div>
            </motion.div>

            {/* Gentle Hint - Responsive text */}
            <motion.div
              className="text-center"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-khaki-200/80 text-xs md:text-sm lg:text-base font-light px-4">
                Each tap reveals a new memory
              </span>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator - Better positioning */}
          <motion.div
            className="mt-8 md:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <div className="text-khaki-200/90 text-sm md:text-base lg:text-lg font-light mb-3 md:mb-4 font-serif">
                Continue for Wedding Details
              </div>
              <motion.div
                className="w-px h-12 md:h-16 bg-gradient-to-b from-khaki-300/80 via-khaki-300/40 to-transparent rounded-full"
                animate={{
                  scaleY: [1, 0.7, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Save The Date Section */}
      <div id="save-date">
        <SaveTheDate />
      </div>

      {/* RSVP Section */}
      <div id="rsvp" className="overflow-x-hidden w-full max-w-full">
        <RSVPForm />
      </div>

      {/* Enhanced Footer Section */}
      <footer className="relative bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 text-white section-padding no-print overflow-x-hidden w-full max-w-full">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Hearts */}
          <motion.div
            className="absolute top-16 left-12 text-khaki-300/10"
            animate={{
              y: [-10, 15, -10],
              rotate: [0, 8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-16 h-16 fill-current" />
          </motion.div>

          <motion.div
            className="absolute top-32 right-16 text-rose-200/10"
            animate={{
              y: [12, -12, 12],
              rotate: [0, -10, 0],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Sparkles className="w-20 h-20" />
          </motion.div>

          <motion.div
            className="absolute bottom-24 left-20 text-khaki-400/10"
            animate={{
              y: [-8, 12, -8],
              rotate: [0, 12, 0],
              scale: [1.1, 0.9, 1.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          >
            <Heart className="w-12 h-12 fill-current" />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-maroon-700/10 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12"
            variants={footerVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Couple Information */}
            <motion.div
              className="lg:col-span-2 text-center lg:text-left"
              variants={footerVariants.section}
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enhanced Logo */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="bg-gradient-to-br from-khaki-200 to-khaki-400 rounded-full p-3 shadow-lg">
                      <Heart className="w-8 h-8 text-maroon-800 fill-current" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-khaki-200 font-bold">
                      Jesseca & Syrel
                    </h3>
                    <p className="text-maroon-300 font-medium tracking-wider text-sm">
                      WEDDING
                    </p>
                  </div>
                </div>

                {/* FIXED: Changed from <motion.p> to <p> to match closing tag */}
                <p className="text-maroon-200/90 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Join us as we begin our journey together in love, laughter,
                  and happily ever after. Your presence will make our special
                  day even more meaningful.
                </p>
              </motion.div>

              {/* Updated Wedding Date Display - Removed ceremony details */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Calendar className="w-5 h-5 text-khaki-400" />
                  <div>
                    <p className="text-khaki-300 font-semibold">
                      October 15, 2024
                    </p>
                    <p className="text-maroon-300 text-sm">Save the Date</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={footerVariants.section}>
              <h4 className="text-xl font-serif text-khaki-300 mb-6 flex items-center justify-center md:justify-start">
                <Sparkles className="w-5 h-5 mr-2" />
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Our Story", href: "#home", icon: Heart },
                  { name: "Save the Date", href: "#save-date", icon: Calendar },
                  { name: "RSVP", href: "#rsvp", icon: Mail },
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-maroon-200 hover:text-khaki-300 transition-all duration-300 group"
                    variants={footerVariants.link}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        const navbarHeight = 80;
                        const elementPosition =
                          element.offsetTop - navbarHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4 text-khaki-400 group-hover:text-khaki-300 transition-colors duration-300" />
                    <span className="font-medium group-hover:font-semibold transition-all duration-300">
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Information - Updated to remove ceremony address */}
            <motion.div variants={footerVariants.section}>
              <h4 className="text-xl font-serif text-khaki-300 mb-6 flex items-center justify-center md:justify-start">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </h4>
              <div className="space-y-4">
                {/* Email */}
                <motion.button
                  onClick={() =>
                    handleContact("email", weddingData.rsvp.contact)
                  }
                  className="flex items-center space-x-3 text-maroon-200 hover:text-khaki-300 transition-all duration-300 group w-full"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 text-khaki-400 group-hover:text-khaki-300 transition-colors duration-300" />
                  <span className="font-medium text-sm group-hover:font-semibold transition-all duration-300">
                    {weddingData.rsvp.contact}
                  </span>
                </motion.button>

                {/* Phone */}
                <motion.button
                  onClick={() => handleContact("phone", "+1-555-0123")}
                  className="flex items-center space-x-3 text-maroon-200 hover:text-khaki-300 transition-all duration-300 group w-full"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4 text-khaki-400 group-hover:text-khaki-300 transition-colors duration-300" />
                  <span className="font-medium text-sm group-hover:font-semibold transition-all duration-300">
                    +1 (555) 123-4567
                  </span>
                </motion.button>

                {/* Reception Location (if you want to keep it) */}
                <motion.button
                  onClick={() =>
                    handleMapNavigation(weddingData.reception.address)
                  }
                  className="flex items-start space-x-3 text-maroon-200 hover:text-khaki-300 transition-all duration-300 group w-full text-left"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MapPin className="w-4 h-4 text-khaki-400 group-hover:text-khaki-300 transition-colors duration-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm group-hover:font-semibold transition-all duration-300">
                      {weddingData.reception.venue}
                    </div>
                    <div className="text-xs text-maroon-300 group-hover:text-maroon-200 transition-colors duration-300">
                      {weddingData.reception.address}
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Social Media Links */}
              <motion.div
                className="mt-6 pt-6 border-t border-maroon-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-maroon-300 text-sm mb-3 text-center md:text-left">
                  Follow our journey
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  {[
                    { icon: Instagram, href: "#", name: "Instagram" },
                    { icon: Facebook, href: "#", name: "Facebook" },
                    { icon: Twitter, href: "#", name: "Twitter" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="w-4 h-4 text-maroon-300 group-hover:text-khaki-300 transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Bottom Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-maroon-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Main Footer Message */}
            <motion.div
              className="text-center mb-8"
              whileInView={{ scale: [0.95, 1.02, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-12 h-12 mx-auto text-khaki-300 fill-current" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-serif text-khaki-200 mb-3">
                We Can't Wait to Celebrate With You!
              </h3>
              <p className="text-maroon-200/90 max-w-2xl mx-auto leading-relaxed">
                Your presence will make our special day even more meaningful.
                Thank you for being part of our love story.
              </p>
            </motion.div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <motion.div
                className="text-maroon-300 text-sm space-y-1 text-center md:text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p>
                  <strong>Questions?</strong> Contact us at{" "}
                  {weddingData.rsvp.contact}
                </p>
                <p className="text-xs flex items-center justify-center md:justify-start space-x-1">
                  <span>Made with</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ❤️
                  </motion.span>
                  <span>for our special day</span>
                </p>
              </motion.div>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-2 bg-khaki-600 hover:bg-khaki-500 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Top</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;

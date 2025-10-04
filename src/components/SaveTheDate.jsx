import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Star,
  Sparkles,
  Navigation,
  Phone,
  Mail,
} from "lucide-react";
import useWeddingStore from "../store/weddingStore";
import { ANIMATION_VARIANTS } from "../utils/constants";

/**
 * Enhanced Save the Date component - Ceremony removed, reception only
 * Features: Glass morphism card, sophisticated animations, interactive elements
 * Improvements: Visual hierarchy, micro-animations, enhanced typography
 */
const SaveTheDate = () => {
  const { weddingData } = useWeddingStore();

  // Parse the general wedding date
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "long" }),
      day: date.getDate(),
      year: date.getFullYear(),
      fullDate: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const dateInfo = parseDate(weddingData.date);

  /**
   * Handle map navigation
   */
  const handleMapNavigation = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(mapUrl, "_blank", "noopener,noreferrer");
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

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-br from-maroon-50 via-khaki-50/30 to-rose-50 py-16 md:py-20 lg:py-24 overflow-x-hidden w-full max-w-full"
      variants={ANIMATION_VARIANTS.stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        <motion.div
          className="absolute top-20 left-10 text-maroon-200/20"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-16 text-khaki-300/20"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 text-rose-300/20"
          animate={{
            y: [-8, 12, -8],
            rotate: [0, 10, 0],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Star className="w-6 h-6 fill-current" />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 px-4"
          variants={ANIMATION_VARIANTS.stagger}
        >
          {/* Main Title */}
          <motion.div
            className="relative mb-4 sm:mb-6"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-maroon-800 mb-3 sm:mb-4 relative leading-tight">
              Save The Date
              {/* Enhanced text shadow */}
              <span className="absolute inset-0 text-maroon-800/20 blur-sm text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif">
                Save The Date
              </span>
            </h2>

            {/* Decorative elements around title */}
            <motion.div
              className="absolute -top-1 sm:-top-2 left-0 sm:-left-2 text-khaki-400/60"
              variants={ANIMATION_VARIANTS.decorativeElement}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </motion.div>

            <motion.div
              className="absolute -top-0.5 sm:-top-1 right-0 sm:-right-3 text-rose-400/60"
              variants={ANIMATION_VARIANTS.decorativeElement}
              transition={{ delay: 0.2 }}
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-maroon-600/80 mb-6 max-w-3xl mx-auto leading-relaxed font-light px-2"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            Join us as we celebrate the beginning of our forever journey
            together. Your presence will make our special day complete.
          </motion.p>

          {/* Enhanced Divider */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            <motion.div
              className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-khaki-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-6 h-6 text-khaki-500" />
            </motion.div>

            <motion.div
              className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-khaki-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Reception Card - Centered */}
        <motion.div
          className="max-w-2xl mx-auto px-4 sm:px-0"
          variants={ANIMATION_VARIANTS.fadeInUp}
          whileHover={{
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          {/* Card Background with Glass Effect */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-khaki-50/50 to-maroon-50/30 opacity-50" />

            {/* Floating Background Elements */}
            <motion.div
              className="absolute top-6 right-6 text-khaki-200/40"
              animate={{
                rotate: [0, -360],
                scale: [1.2, 0.8, 1.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-24 h-24" />
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-6 text-maroon-100/30"
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
            >
              <Heart className="w-16 h-16 fill-current" />
            </motion.div>

            <div className="relative z-10">
              {/* Card Header */}
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  className="relative bg-gradient-to-br from-khaki-100 to-maroon-200 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.8, ease: "easeOut" },
                  }}
                  animate={{
                    boxShadow: [
                      "0 4px 20px rgba(237, 197, 95, 0.3)",
                      "0 8px 30px rgba(139, 38, 53, 0.3)",
                      "0 4px 20px rgba(237, 197, 95, 0.3)",
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-maroon-700 fill-current" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-maroon-800 mb-2 px-2">
                  Wedding Reception
                </h3>

                <motion.div
                  className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-khaki-400 via-maroon-400 to-khaki-400 mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>

              {/* Event Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Date and Time */}
                <motion.div
                  className="text-center px-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-maroon-700 mb-2 leading-tight">
                    {dateInfo.fullDate}
                  </div>
                  <div className="flex items-center justify-center text-maroon-600 mb-3 sm:mb-4">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="font-medium text-base sm:text-lg">
                      {weddingData.reception.time}
                    </span>
                  </div>
                </motion.div>

                {/* Venue Information */}
                <motion.div
                  className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-khaki-100/50"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-khaki-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg sm:text-xl text-maroon-800 mb-1 leading-tight">
                        {weddingData.reception.venue}
                      </div>
                      <div className="text-sm sm:text-base text-maroon-600 leading-relaxed break-words">
                        {weddingData.reception.address}
                      </div>
                    </div>
                  </div>

                  {/* Get Directions Button */}
                  <motion.button
                    onClick={() =>
                      handleMapNavigation(weddingData.reception.address)
                    }
                    className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-khaki-600 to-maroon-600 hover:from-khaki-700 hover:to-maroon-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg active:scale-95"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Get Directions</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Card Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-khaki-100/20 to-maroon-100/20 rounded-3xl opacity-0 hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Card Shadow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-khaki-200/20 to-maroon-200/20 rounded-3xl blur-xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Romantic Quote */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl border border-white/30 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Decoration */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-50/30 to-transparent"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <motion.blockquote
                className="text-xl md:text-2xl lg:text-3xl font-serif text-maroon-700 italic leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                "Two hearts, one love, forever united in the sacred bond of
                marriage"
              </motion.blockquote>

              <motion.div
                className="flex items-center justify-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 fill-current ${
                        index === 2
                          ? "text-rose-500 w-5 h-5"
                          : index % 2 === 0
                          ? "text-rose-400"
                          : "text-maroon-400"
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-maroon-600 font-medium">
              Questions? We're here to help:
            </div>

            <div className="flex items-center space-x-6">
              <motion.button
                onClick={() => handleContact("email", weddingData.rsvp.contact)}
                className="flex items-center space-x-2 text-maroon-700 hover:text-maroon-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email Us</span>
              </motion.button>

              <motion.button
                onClick={() => handleContact("phone", "+1-555-0123")}
                className="flex items-center space-x-2 text-maroon-700 hover:text-maroon-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call Us</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SaveTheDate;

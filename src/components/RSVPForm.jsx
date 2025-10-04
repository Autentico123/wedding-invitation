import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Users,
  Mail,
  Phone,
  Heart,
  Star,
  Sparkles,
  Calendar,
  MessageSquare,
  UtensilsCrossed,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useWeddingStore from "../store/weddingStore";
import ApiService from "../services/api.service";
import { ANIMATION_VARIANTS } from "../utils/constants";

/**
 * Enhanced RSVP Form component with backend integration
 * Features: Email notifications, data persistence, real-time validation
 */
const RSVPForm = () => {
  const { addRSVPResponse, weddingData } = useWeddingStore();

  // Enhanced form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    attending: "",
    dietaryRestrictions: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Enhanced animation variants for this section
  const enhancedVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    formCard: {
      hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    },
    fieldGroup: {
      hidden: {
        opacity: 0,
        x: -30,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    },
    button: {
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
    successMessage: {
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 150,
          damping: 12,
        },
      },
    },
  };

  /**
   * Enhanced form validation
   */
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.attending) {
      errors.attending = "Please let us know if you'll be attending";
    }

    if (
      formData.phone &&
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * UPDATED: Enhanced form submission with backend integration
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend API
      const response = await ApiService.submitRSVP(formData);

      // Add to local store (for immediate UI update)
      addRSVPResponse({
        ...formData,
        id: response.data.id,
        timestamp: new Date().toISOString(),
      });

      toast.success(
        "RSVP submitted successfully! Check your email for confirmation. 💕",
        {
          duration: 5000,
          icon: "📧",
        }
      );

      setSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "1",
          attending: "",
          dietaryRestrictions: "",
          message: "",
        });
        setSubmitted(false);
      }, 6000);
    } catch (error) {
      console.error("RSVP submission error:", error);

      // More user-friendly error messages
      const errorMessage = error.message.includes("fetch")
        ? "Unable to connect to server. Please check your internet connection."
        : error.message || "Something went wrong. Please try again.";

      toast.error(errorMessage, {
        duration: 5000,
      });

      // Still save locally as fallback
      addRSVPResponse({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        offline: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle input changes with real-time validation
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /**
   * Handle field focus
   */
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  /**
   * Get input classes based on state
   */
  const getInputClasses = (fieldName, hasError = false) => {
    const baseClasses =
      "w-full px-4 py-3 bg-white/80 backdrop-blur-sm border rounded-xl transition-all duration-300 font-medium placeholder:text-gray-400 placeholder:font-normal";

    if (hasError) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
    }

    if (focusedField === fieldName) {
      return `${baseClasses} border-maroon-400 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-200 shadow-lg`;
    }

    return `${baseClasses} border-maroon-200 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-200 hover:border-maroon-300`;
  };

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-br from-rose-50 via-maroon-50/30 to-khaki-50 py-16 md:py-20 lg:py-24 overflow-x-hidden w-full max-w-full"
      variants={enhancedVariants.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-32 left-16 text-rose-200/20"
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-12 h-12 fill-current" />
        </motion.div>

        <motion.div
          className="absolute top-48 right-20 text-khaki-300/20"
          animate={{
            y: [20, -20, 20],
            rotate: [0, -15, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-24 text-maroon-200/20"
          animate={{
            y: [-12, 18, -12],
            rotate: [0, 12, 0],
            scale: [1.2, 0.8, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Star className="w-8 h-8 fill-current" />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={enhancedVariants.container}
        >
          <motion.div
            className="relative mb-8"
            variants={enhancedVariants.fieldGroup}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-maroon-800 mb-4 relative">
              RSVP
              {/* Enhanced text shadow */}
              <span className="absolute inset-0 text-maroon-800/20 blur-sm text-4xl md:text-5xl lg:text-6xl font-serif">
                RSVP
              </span>
            </h2>

            {/* Decorative elements around title */}
            <motion.div
              className="absolute -top-3 -left-3 text-rose-400/60"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-4 text-khaki-400/60"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.2,
              }}
            >
              <Star className="w-6 h-6 fill-current" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={enhancedVariants.fieldGroup}
          >
            <p className="text-lg md:text-xl text-maroon-600/80 mb-2 font-light">
              Please respond by{" "}
              <span className="font-semibold text-maroon-700">
                {weddingData.rsvp.deadline}
              </span>
            </p>
            <p className="text-base md:text-lg text-maroon-500/70 max-w-2xl mx-auto">
              We're so excited to celebrate with you! Please let us know if
              you'll be joining us for our special day.
            </p>
          </motion.div>

          {/* Enhanced Divider */}
          <motion.div
            className="flex items-center justify-center space-x-4 mt-8"
            variants={enhancedVariants.fieldGroup}
          >
            <motion.div
              className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-rose-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-6 h-6 text-rose-500 fill-current" />
            </motion.div>

            <motion.div
              className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-rose-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Form Container */}
        <motion.div
          className="max-w-3xl mx-auto"
          variants={enhancedVariants.formCard}
        >
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-50" />

              {/* Floating Background Element */}
              <motion.div
                className="absolute top-8 right-8 text-rose-100/30"
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Heart className="w-32 h-32 fill-current" />
              </motion.div>

              <div className="relative z-10 space-y-8">
                {/* Personal Information Section */}
                <motion.div variants={enhancedVariants.fieldGroup}>
                  <h3 className="text-xl font-serif text-maroon-800 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-3 text-maroon-600" />
                    Personal Information
                  </h3>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="flex items-center text-maroon-700 font-medium mb-3">
                        <span className="text-rose-500 mr-1">*</span>
                        Full Name
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={handleBlur}
                          className={getInputClasses("name", formErrors.name)}
                          placeholder="Enter your full name"
                          required
                        />
                      </motion.div>
                      {formErrors.name && (
                        <motion.p
                          className="text-red-500 text-sm mt-2 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center text-maroon-700 font-medium mb-3">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-rose-500 mr-1">*</span>
                          Email Address
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                            className={getInputClasses(
                              "email",
                              formErrors.email
                            )}
                            placeholder="your.email@example.com"
                            required
                          />
                        </motion.div>
                        {formErrors.email && (
                          <motion.p
                            className="text-red-500 text-sm mt-2 flex items-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {formErrors.email}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center text-maroon-700 font-medium mb-3">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                          <span className="text-gray-400 text-sm ml-2">
                            (optional)
                          </span>
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => handleFocus("phone")}
                            onBlur={handleBlur}
                            className={getInputClasses(
                              "phone",
                              formErrors.phone
                            )}
                            placeholder="+639129497365"
                          />
                        </motion.div>
                        {formErrors.phone && (
                          <motion.p
                            className="text-red-500 text-sm mt-2 flex items-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {formErrors.phone}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RSVP Details Section */}
                <motion.div variants={enhancedVariants.fieldGroup}>
                  <h3 className="text-xl font-serif text-maroon-800 mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-maroon-600" />
                    RSVP Details
                  </h3>

                  <div className="space-y-6">
                    {/* Attendance Question */}
                    <div>
                      <label className="text-maroon-700 font-medium mb-4 block">
                        <span className="text-rose-500 mr-1">*</span>
                        Will you be attending our wedding?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.label
                          className={`relative flex items-center cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.attending === "yes"
                              ? "border-green-400 bg-green-50"
                              : "border-gray-200 bg-white hover:border-green-300"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={formData.attending === "yes"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.attending === "yes"
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.attending === "yes" && (
                              <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="font-medium text-gray-800">
                              Joyfully Accept
                            </span>
                          </div>
                        </motion.label>

                        <motion.label
                          className={`relative flex items-center cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.attending === "no"
                              ? "border-gray-400 bg-gray-50"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={formData.attending === "no"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                              formData.attending === "no"
                                ? "border-gray-500 bg-gray-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.attending === "no" && (
                              <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-5 h-5 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-800">
                              Regretfully Decline
                            </span>
                          </div>
                        </motion.label>
                      </div>
                      {formErrors.attending && (
                        <motion.p
                          className="text-red-500 text-sm mt-3 flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.attending}
                        </motion.p>
                      )}
                    </div>

                    {/* Show additional fields only if attending */}
                    {formData.attending === "yes" && (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {/* Number of Guests */}
                        <div>
                          <label className="flex items-center text-maroon-700 font-medium mb-3">
                            <Users className="w-4 h-4 mr-2" />
                            Number of Guests
                          </label>
                          <motion.select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            onFocus={() => handleFocus("guests")}
                            onBlur={handleBlur}
                            className={getInputClasses("guests")}
                            whileFocus={{ scale: 1.02 }}
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </motion.select>
                        </div>

                        {/* Dietary Restrictions */}
                        <div>
                          <label className="flex items-center text-maroon-700 font-medium mb-3">
                            <UtensilsCrossed className="w-4 h-4 mr-2" />
                            Dietary Restrictions
                            <span className="text-gray-400 text-sm ml-2">
                              (optional)
                            </span>
                          </label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <input
                              type="text"
                              name="dietaryRestrictions"
                              value={formData.dietaryRestrictions}
                              onChange={handleChange}
                              onFocus={() => handleFocus("dietaryRestrictions")}
                              onBlur={handleBlur}
                              className={getInputClasses("dietaryRestrictions")}
                              placeholder="Any allergies or dietary requirements?"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Message Section */}
                <motion.div variants={enhancedVariants.fieldGroup}>
                  <h3 className="text-xl font-serif text-maroon-800 mb-6 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-3 text-maroon-600" />
                    Special Message
                    <span className="text-gray-400 text-sm ml-2">
                      (optional)
                    </span>
                  </h3>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      rows="4"
                      className={getInputClasses("message")}
                      placeholder="Share your wishes for the happy couple..."
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.div variants={enhancedVariants.button} className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-maroon-600 to-maroon-700 hover:from-maroon-700 hover:to-maroon-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: isSubmitting
                        ? ["0 4px 20px rgba(139, 38, 53, 0.3)"]
                        : [
                            "0 4px 20px rgba(139, 38, 53, 0.3)",
                            "0 8px 30px rgba(139, 38, 53, 0.4)",
                            "0 4px 20px rgba(139, 38, 53, 0.3)",
                          ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: isSubmitting ? 0 : Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Sending RSVP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send RSVP</span>
                        <Heart className="w-4 h-4 fill-current" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.form>
          ) : (
            /* Success Message with Email Confirmation Note */
            <motion.div
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 text-center overflow-hidden"
              variants={enhancedVariants.successMessage}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-50" />

              {/* Floating Success Elements */}
              <motion.div
                className="absolute top-8 right-8 text-green-100/30"
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <CheckCircle className="w-24 h-24 fill-current" />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                </motion.div>

                <h3 className="text-3xl font-serif text-maroon-800 mb-4">
                  Thank You!
                </h3>

                <p className="text-lg text-maroon-600 mb-4">
                  Your RSVP has been submitted successfully!
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-700 flex items-center justify-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">
                      A confirmation email has been sent to {formData.email}
                    </span>
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    Please check your inbox (and spam folder) for details
                  </p>
                </div>

                <p className="text-maroon-600 mb-6">
                  We can't wait to celebrate with you!
                </p>

                <motion.div
                  className="flex items-center justify-center space-x-2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <span className="text-maroon-500 font-medium">
                    Jesseca & Syrel
                  </span>
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RSVPForm;

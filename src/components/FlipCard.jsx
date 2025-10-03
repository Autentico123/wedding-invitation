import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import {
  RotateCcw,
  ImageIcon,
  AlertCircle,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  Share2,
  Heart,
  Sparkles,
} from "lucide-react";

/**
 * Enhanced 3D Flip Card Component
 * Features: Smooth animations, touch gestures, accessibility, visual polish
 * Improvements: Better UX, performance optimizations, refined interactions
 * @param {Array} images - Array of image URLs to display
 */
const FlipCard = ({ images }) => {
  // Core state management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [isMaximized, setIsMaximized] = useState(false);
  const [maximizedImageIndex, setMaximizedImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  // Touch gesture tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const allImages = images || [];

  /**
   * Enhanced keyboard navigation with accessibility
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isMaximized) return;

      switch (event.key) {
        case "Escape":
          handleCloseMaximize();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          event.preventDefault();
          handlePreviousImage();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          event.preventDefault();
          handleNextImage();
          break;
        case "+":
        case "=":
          event.preventDefault();
          handleZoomIn();
          break;
        case "-":
        case "_":
          event.preventDefault();
          handleZoomOut();
          break;
        case "0":
          event.preventDefault();
          setZoomLevel(1);
          break;
        case "f":
        case "F":
          event.preventDefault();
          handleFullscreen();
          break;
        default:
          break;
      }
    };

    if (isMaximized) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isMaximized, maximizedImageIndex, zoomLevel]);

  /**
   * Preload images with better error handling
   */
  useEffect(() => {
    const preloadImages = async () => {
      for (let index = 0; index < allImages.length; index++) {
        const src = allImages[index];

        setImageLoadStates((prev) => ({
          ...prev,
          [index]: "loading",
        }));

        try {
          await new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
              setImageDimensions((prev) => ({
                ...prev,
                [index]: {
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  aspectRatio: img.naturalWidth / img.naturalHeight,
                },
              }));

              setImageLoadStates((prev) => ({
                ...prev,
                [index]: "loaded",
              }));

              resolve(img);
            };

            img.onerror = () => {
              setImageErrors((prev) => ({
                ...prev,
                [index]: true,
              }));
              setImageLoadStates((prev) => ({
                ...prev,
                [index]: "error",
              }));
              reject(new Error(`Failed to load ${src}`));
            };

            img.crossOrigin = "anonymous";
            img.src = src;
          });
        } catch (error) {
          console.error(`Error loading image ${index}:`, error);
        }
      }
    };

    if (allImages.length > 0) {
      preloadImages();
    }
  }, [allImages]);

  /**
   * Enhanced card tap handler with haptic feedback simulation
   */
  const handleCardTap = useCallback(() => {
    if (isFlipped || allImages.length <= 1) return;

    // Simulate haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setIsFlipped(true);

    setTimeout(() => {
      setCurrentImageIndex(nextIndex);
    }, 400);

    setTimeout(() => {
      setIsFlipped(false);
    }, 800);
  }, [isFlipped, currentImageIndex, allImages.length]);

  /**
   * Handle maximize with animation
   */
  const handleMaximize = useCallback(
    (event) => {
      event.stopPropagation();
      setMaximizedImageIndex(currentImageIndex);
      setIsMaximized(true);
      setZoomLevel(1);
    },
    [currentImageIndex]
  );

  const handleCloseMaximize = useCallback(() => {
    setIsMaximized(false);
    setZoomLevel(1);
  }, []);

  /**
   * Navigation in maximized view
   */
  const handlePreviousImage = useCallback(() => {
    const prevIndex =
      maximizedImageIndex === 0
        ? allImages.length - 1
        : maximizedImageIndex - 1;
    setMaximizedImageIndex(prevIndex);
    setZoomLevel(1);
  }, [maximizedImageIndex, allImages.length]);

  const handleNextImage = useCallback(() => {
    const nextIndex = (maximizedImageIndex + 1) % allImages.length;
    setMaximizedImageIndex(nextIndex);
    setZoomLevel(1);
  }, [maximizedImageIndex, allImages.length]);

  /**
   * Enhanced zoom controls with smooth transitions
   */
  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  /**
   * Fullscreen handler
   */
  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  /**
   * Enhanced download with filename
   */
  const handleDownload = useCallback(() => {
    const currentImageSrc = allImages[maximizedImageIndex];
    const filename =
      currentImageSrc.split("/").pop() ||
      `wedding-photo-${maximizedImageIndex + 1}.jpg`;

    const link = document.createElement("a");
    link.href = currentImageSrc;
    link.download = filename;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [maximizedImageIndex, allImages]);

  /**
   * Share functionality
   */
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Photo",
          text: `Check out this wedding photo (${maximizedImageIndex + 1}/${
            allImages.length
          })`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled or failed");
      }
    }
  }, [maximizedImageIndex, allImages.length]);

  /**
   * Like handler with animation
   */
  const handleLike = useCallback(() => {
    setLiked(!liked);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [liked]);

  /**
   * Handle image errors
   */
  const handleImageError = useCallback((e, index) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));

    setImageLoadStates((prev) => ({
      ...prev,
      [index]: "error",
    }));

    e.target.style.display = "none";
  }, []);

  /**
   * Get image source with error handling
   */
  const getImageSource = useCallback(
    (index) => {
      if (imageErrors[index] || !allImages[index]) {
        return null;
      }
      return allImages[index];
    },
    [imageErrors, allImages]
  );

  /**
   * Get optimized image classes
   */
  const getImageClasses = useCallback(
    (index) => {
      const baseClasses = "transition-all duration-500 rounded-lg";
      const dimensions = imageDimensions[index];

      if (!dimensions) {
        return `${baseClasses} w-full h-full object-cover object-center`;
      }

      const { aspectRatio } = dimensions;
      const cardAspectRatio = 0.83;

      if (Math.abs(aspectRatio - cardAspectRatio) < 0.2) {
        return `${baseClasses} w-full h-full object-cover object-center`;
      } else if (aspectRatio > cardAspectRatio * 1.3) {
        return `${baseClasses} w-full h-full object-cover object-center`;
      } else if (aspectRatio < cardAspectRatio * 0.7) {
        return `${baseClasses} w-full h-full object-cover object-center`;
      } else {
        return `${baseClasses} w-full h-full object-contain object-center`;
      }
    },
    [imageDimensions]
  );

  /**
   * Get container styles
   */
  const getContainerStyles = useCallback(
    (index) => {
      const dimensions = imageDimensions[index];

      const baseStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      };

      if (!dimensions) {
        return baseStyles;
      }

      const { aspectRatio } = dimensions;
      if (aspectRatio > 1.5) {
        return {
          ...baseStyles,
          background:
            "linear-gradient(90deg, #fefefe 0%, #ffffff 50%, #fefefe 100%)",
        };
      } else if (aspectRatio < 0.8) {
        return {
          ...baseStyles,
          background:
            "linear-gradient(180deg, #fefefe 0%, #ffffff 50%, #fefefe 100%)",
        };
      }

      return baseStyles;
    },
    [imageDimensions]
  );

  // Early return if no images
  if (!images || images.length === 0) {
    return (
      <motion.div
        className="w-80 h-96 lg:w-96 lg:h-[28rem] bg-gradient-to-br from-maroon-100 via-khaki-50 to-maroon-100 rounded-2xl flex flex-col items-center justify-center shadow-2xl border-2 border-maroon-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ImageIcon className="w-16 h-16 text-maroon-400 mb-4" />
        </motion.div>
        <p className="text-maroon-700 font-serif text-xl font-semibold">
          No images available
        </p>
        <p className="text-maroon-500 text-sm mt-2 text-center px-4 max-w-xs">
          Please add images to display in the flip card gallery
        </p>
      </motion.div>
    );
  }

  const currentImage = getImageSource(currentImageIndex);
  const backSideIndex = (currentImageIndex + 1) % allImages.length;
  const backSideImage = getImageSource(backSideIndex);

  return (
    <>
      <motion.div
        className="relative w-80 h-96 lg:w-96 lg:h-[28rem] cursor-pointer mx-auto group"
        style={{ perspective: "1500px", x, y }}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: [0.23, 1, 0.32, 1],
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        whileHover={{
          scale: 1.05,
          y: -10,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.15 },
        }}
        onClick={handleCardTap}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        role="button"
        aria-label={`Flip card showing wedding photo ${
          currentImageIndex + 1
        } of ${allImages.length}. Tap to see next photo.`}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCardTap();
          }
        }}
      >
        {/* Enhanced 3D Flip Container */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            type: "tween",
          }}
        >
          {/* Front Side - Current Image */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className="relative w-full h-full">
              {/* Enhanced Loading State */}
              {imageLoadStates[currentImageIndex] === "loading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-maroon-50 via-khaki-50 to-rose-50 z-10">
                  <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-16 h-16 border-4 border-maroon-200 rounded-full" />
                    <div className="absolute inset-0 w-16 h-16 border-4 border-maroon-600 border-t-transparent rounded-full" />
                  </motion.div>
                  <motion.p
                    className="text-maroon-600 font-serif text-sm mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Loading image {currentImageIndex + 1}...
                  </motion.p>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-maroon-400 rounded-full"
                        animate={{ scale: [0, 1, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Error State */}
              {imageLoadStates[currentImageIndex] === "error" && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                  </motion.div>
                  <p className="text-red-600 font-serif text-base font-semibold mb-2">
                    Image {currentImageIndex + 1} failed to load
                  </p>
                  <p className="text-red-400 text-xs text-center px-4">
                    Please check your connection or try again later
                  </p>
                </motion.div>
              )}

              {/* Main Image with Enhanced Transitions */}
              {currentImage &&
                imageLoadStates[currentImageIndex] === "loaded" && (
                  <div style={getContainerStyles(currentImageIndex)}>
                    <motion.img
                      key={`front-${currentImageIndex}-${currentImage}`}
                      src={currentImage}
                      alt={`Wedding memory photo ${currentImageIndex + 1} of ${
                        allImages.length
                      }`}
                      className={getImageClasses(currentImageIndex)}
                      onError={(e) => handleImageError(e, currentImageIndex)}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      loading="eager"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                )}

              {/* Enhanced UI Overlays */}
              {imageLoadStates[currentImageIndex] === "loaded" &&
                !imageErrors[currentImageIndex] && (
                  <>
                    {/* Enhanced Image Counter */}
                    <motion.div
                      className="absolute top-3 right-3 bg-gradient-to-br from-maroon-600 to-maroon-800 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg z-20 border border-white/20"
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3 text-khaki-300" />
                        <span className="text-white text-xs font-semibold">
                          {currentImageIndex + 1}/{allImages.length}
                        </span>
                      </div>
                    </motion.div>

                    {/* Enhanced Tap Instruction */}
                    {allImages.length > 1 && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute bottom-3 left-3 z-20"
                            initial={{ opacity: 0, x: -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl border border-white/20">
                              <div className="flex items-center space-x-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <RotateCcw className="w-3.5 h-3.5 text-khaki-300" />
                                </motion.div>
                                <span className="text-white font-serif text-xs font-medium">
                                  Tap to flip
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Enhanced Maximize Button */}
                    <motion.button
                      onClick={handleMaximize}
                      className="absolute bottom-3 right-3 bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md rounded-full p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 z-20 border border-maroon-100 group/btn"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      title="View full size image"
                      aria-label="Maximize image to full screen view"
                    >
                      <Maximize2 className="w-4 h-4 text-maroon-600 group-hover/btn:text-maroon-700 transition-colors" />
                    </motion.button>
                  </>
                )}
            </div>
          </div>

          {/* Back Side - Next Image Preview */}
          {allImages.length > 1 && (
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="relative w-full h-full">
                {backSideImage &&
                  imageLoadStates[backSideIndex] === "loaded" && (
                    <div style={getContainerStyles(backSideIndex)}>
                      <motion.img
                        key={`back-${backSideIndex}-${backSideImage}`}
                        src={backSideImage}
                        alt={`Next wedding photo ${backSideIndex + 1} preview`}
                        className={getImageClasses(backSideIndex)}
                        onError={(e) => handleImageError(e, backSideIndex)}
                        initial={{ opacity: 0.8, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  )}

                {/* Loading Next Image */}
                {imageLoadStates[backSideIndex] === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-maroon-50 to-khaki-50 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-maroon-600 mx-auto mb-2"></div>
                      <p className="text-maroon-600 font-serif text-xs">
                        Preparing next photo...
                      </p>
                    </div>
                  </div>
                )}

                {/* Enhanced Back Side Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/30 via-transparent to-black/10" />

                {/* Enhanced Transition Effect */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-full p-6 shadow-2xl border border-white/20"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    <RotateCcw className="w-8 h-8 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Enhanced Next Label */}
                <motion.div
                  className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-khaki-500 to-maroon-600 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg border border-white/20">
                    <span className="text-white text-xs font-bold tracking-wide">
                      NEXT ({backSideIndex + 1})
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced Progress Indicator */}
        {allImages.length > 1 && (
          <div className="absolute -bottom-3 left-2 right-2 h-2 bg-gradient-to-r from-maroon-200/40 via-khaki-200/40 to-maroon-200/40 rounded-full overflow-hidden shadow-md backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-maroon-600 via-maroon-500 to-khaki-500 rounded-full shadow-inner relative"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentImageIndex + 1) / allImages.length) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

            {/* Progress dots */}
            <div className="absolute inset-0 flex items-center justify-evenly px-1">
              {allImages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index <= currentImageIndex
                      ? "bg-white shadow-lg"
                      : "bg-maroon-300/50"
                  }`}
                  animate={{
                    scale: index === currentImageIndex ? [1, 1.3, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Card Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-maroon-300/20 via-khaki-300/20 to-maroon-300/20 -z-10 blur-2xl"
          animate={{
            scale: isFlipped ? [1.1, 1.25, 1.1] : isHovered ? 1.15 : 1.1,
            opacity: isFlipped ? [0.2, 0.4, 0.2] : isHovered ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Enhanced Flip Particles */}
        {isFlipped && allImages.length > 1 && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${
                    i % 2 === 0 ? "#edc55f" : "#8B2635"
                  }, ${i % 2 === 0 ? "#d4a744" : "#ab1f2e"})`,
                  top: `${20 + ((i * 10) % 60)}%`,
                  left: `${15 + ((i * 12) % 70)}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  rotate: [0, 360],
                  x: [0, Math.random() * 80 - 40],
                  y: [0, Math.random() * 80 - 40],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Single Image Indicator */}
        {allImages.length === 1 && (
          <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="bg-gradient-to-r from-maroon-500 to-khaki-500 rounded-full w-3 h-3 shadow-lg border-2 border-white">
              <div className="w-full h-full bg-gradient-to-r from-maroon-600 to-khaki-600 rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Maximized View Modal */}
      <AnimatePresence>
        {isMaximized && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleCloseMaximize}
          >
            <div
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Close Button */}
              <motion.button
                onClick={handleCloseMaximize}
                className="absolute top-6 right-6 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 border border-white/10 group"
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title="Close (Esc)"
                aria-label="Close maximized view"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>

              {/* Enhanced Navigation Controls */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    onClick={handlePreviousImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-200 border border-white/10"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ scale: 1.15, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title="Previous image (← Arrow or A)"
                    aria-label="View previous image"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </motion.button>

                  <motion.button
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-200 border border-white/10"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileHover={{ scale: 1.15, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title="Next image (→ Arrow or D)"
                    aria-label="View next image"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </motion.button>
                </>
              )}

              {/* Enhanced Control Panel */}
              <motion.div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-3 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Zoom Out */}
                <motion.button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                  className="text-white p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Zoom out (-)"
                >
                  <ZoomOut className="w-5 h-5" />
                </motion.button>

                {/* Zoom Level Display */}
                <motion.div
                  className="px-4 py-1 bg-white/5 rounded-full min-w-[60px] text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                  key={zoomLevel}
                >
                  <span className="text-white text-sm font-semibold">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </motion.div>

                {/* Zoom In */}
                <motion.button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="text-white p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Zoom in (+)"
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/20" />

                {/* Like Button */}
                <motion.button
                  onClick={handleLike}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    liked
                      ? "bg-red-500/20 text-red-400"
                      : "hover:bg-white/10 text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Like this photo"
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </motion.button>

                {/* Share Button */}
                {navigator.share && (
                  <motion.button
                    onClick={handleShare}
                    className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Share this photo"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                )}

                {/* Download Button */}
                <motion.button
                  onClick={handleDownload}
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Download image"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Enhanced Image Counter */}
              <motion.div
                className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-khaki-300" />
                  <span className="text-sm font-semibold">
                    {maximizedImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              </motion.div>

              {/* Maximized Image Container */}
              <motion.div
                className="max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-lg"
                style={{
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? "grab" : "default",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                drag={zoomLevel > 1}
                dragConstraints={{
                  left: -200,
                  right: 200,
                  top: -200,
                  bottom: 200,
                }}
                dragElastic={0.1}
                whileDrag={{ cursor: "grabbing" }}
              >
                <motion.img
                  src={getImageSource(maximizedImageIndex)}
                  alt={`Wedding photo ${maximizedImageIndex + 1} of ${
                    allImages.length
                  } - Full size view`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxWidth: "90vw", maxHeight: "85vh" }}
                  onError={(e) => handleImageError(e, maximizedImageIndex)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Enhanced Keyboard Instructions */}
              <motion.div
                className="absolute bottom-6 right-6 z-10 bg-white/5 backdrop-blur-md text-white/60 px-4 py-2 rounded-lg text-xs border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <div className="flex items-center space-x-4">
                  <span>← →: Navigate</span>
                  <span>+/-: Zoom</span>
                  <span>Esc: Close</span>
                  <span>F: Fullscreen</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlipCard;

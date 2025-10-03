/**
 * Animation variants for Framer Motion
 */
export const ANIMATION_VARIANTS = {
  // Fade in from bottom
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 20,
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

  // Fade in with scale
  fadeInScale: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },

  // Stagger children animations
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  // Slide in from left
  slideInLeft: {
    hidden: {
      opacity: 0,
      x: -50,
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

  // Slide in from right
  slideInRight: {
    hidden: {
      opacity: 0,
      x: 50,
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

  // 3D Flip animation variants
  flip3D: {
    initial: { rotateY: 0 },
    animate: { rotateY: 180 },
    exit: { rotateY: 0 },
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      type: "tween",
    },
  },

  // Card entrance animation
  cardEntrance: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  },

  // Hover effects for 3D cards
  cardHover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Wedding color palette constants - STANDARDIZED
 */
export const WEDDING_COLORS = {
  maroon: {
    DEFAULT: "#8B2635", // Primary maroon - matches design
    50: "#fdf2f3",
    100: "#fce7e8",
    200: "#f9d0d2",
    300: "#f4a8ac",
    400: "#ec737a",
    500: "#e0444f",
    600: "#cc2938",
    700: "#ab1f2e",
    800: "#8B2635", // Main color
    900: "#6d1e28",
    950: "#3d0d14",
  },
  khaki: {
    50: "#fefef9",
    100: "#fefcf0",
    200: "#fcf6d9",
    300: "#f9edb8",
    400: "#f4dd85",
    500: "#edc55f",
    600: "#d4a744",
    700: "#b1853a",
    800: "#8f6835",
    900: "#75552f",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
};

/**
 * Flip card images array
 */
export const FLIP_IMAGES = [
  "/flip1.jpeg",
  "/flip2.jpeg",
  "/flip3.jpeg",
  "/flip4.jpeg",
  "/flip5.jpeg",
  "/flip6.jpeg",
  "/flip7.jpeg",
  "/flip8.jpeg",
];

/**
 * 3D Animation configuration
 */
export const FLIP_ANIMATION_CONFIG = {
  // Duration for complete flip cycle
  flipDuration: 0.8,

  // Delay before image changes (middle of flip)
  imageChangeDelay: 0.4,

  // Perspective value for 3D effect (increased for better depth)
  perspective: 1200,

  // Easing function for flip animation
  easing: "easeInOut",

  // Spring configuration for entrance animation
  springConfig: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
  },

  // Particle effect configuration
  particles: {
    count: 8,
    duration: 0.8,
    colors: ["#f4dd85", "#edc55f", "#d4a744", "#8b2635"],
    sizes: [2, 3, 4],
  },
};

/**
 * Image optimization configuration
 */
export const IMAGE_CONFIG = {
  // Fallback image for errors
  fallbackImage: "/design.png",

  // Loading placeholder (base64 encoded SVG)
  loadingPlaceholder:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYWZjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZiNzI4MCI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=",

  // Supported image formats
  supportedFormats: ["jpeg", "jpg", "png", "webp", "svg", "avif"],

  // Image optimization settings
  optimization: {
    // Enable image preloading
    preloadImages: true,

    // Use lazy loading for non-critical images
    lazyLoad: true,

    // Image quality settings
    quality: {
      high: 95, // For design images
      standard: 85, // For photo memories
      compressed: 70, // For thumbnails/previews
    },

    // Responsive image settings
    responsive: {
      mobile: { maxWidth: 480, quality: 80 },
      tablet: { maxWidth: 768, quality: 85 },
      desktop: { maxWidth: 1200, quality: 90 },
    },
  },

  // Image fit strategies
  fitStrategies: {
    design: "contain", // Show full design without cropping
    memory: "cover", // Fill card area, may crop slightly
    preview: "cover", // Fill preview area
  },

  // Error handling
  errorHandling: {
    maxRetries: 3,
    retryDelay: 1000,
    showErrorPlaceholder: true,
    logErrors: true,
  },
};

/**
 * Animation timing constants
 */
export const ANIMATION_TIMINGS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  verySlow: 1.0,
  flip: 0.8,
  entrance: 1.2,
};

/**
 * Accessibility configuration
 */
export const A11Y_CONFIG = {
  // Reduced motion support
  respectReducedMotion: true,

  // Focus management
  focusManagement: true,

  // ARIA labels
  ariaLabels: {
    flipCard: "Interactive flip card showing wedding photos",
    tapToFlip: "Tap to flip and see next photo",
    currentImage: (index, total) => `Photo ${index + 1} of ${total}`,
    designImage: "Wedding invitation design",
    memoryImage: (index) => `Wedding memory photo ${index}`,
    loadingImage: "Image is loading, please wait",
  },

  // Screen reader announcements
  announcements: {
    imageChanged: (index, total) =>
      `Now showing photo ${index + 1} of ${total}`,
    flipStarted: "Card is flipping to next image",
    flipCompleted: "Card flip completed",
    imageLoaded: "Image loaded successfully",
    imageError: "Image failed to load, showing fallback",
  },
};

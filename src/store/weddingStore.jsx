import { create } from "zustand";

const useWeddingStore = create((set) => ({
  // Wedding details
  weddingData: {
    brideGroom: {
      bride: "Jesseca",
      groom: "Syrel",
    },
    // General wedding date (no ceremony-specific details)
    date: "October 15, 2024",
    // Ceremony details removed - only reception remains
    reception: {
      time: "6:00 PM",
      venue: "Grand Ballroom",
      address: "456 Celebration Avenue, Downtown",
    },
    // Added formal attire requirements
    attire: {
      dress_code: "Formal Attire",
      colors: "In shades of maroon & beige",
      description:
        "We kindly request our guests to dress in formal attire, preferably in shades of maroon and beige to complement our wedding theme.",
    },
    rsvp: {
      deadline: "September 15, 2024",
      contact: "rsvp@sarahandmichael.com",
      message: "WE HAVE RESERVED SEAT/S FOR YOU.",
      note: "Your presence and prayers are all that we request.",
    },
    // Added gift information
    gifts: {
      title: "IN LIEU OF GIFTS",
      message: "With all that we have, we've been truly blessed.",
      preference: "Your presence and prayers are all that we request.",
      alternative:
        "But if you desire to give nonetheless, a monetary gift is one we suggest.",
    },
  },

  // RSVP responses
  rsvpResponses: [],

  // Actions
  addRSVPResponse: (response) =>
    set((state) => ({
      rsvpResponses: [...state.rsvpResponses, response],
    })),

  updateWeddingData: (newData) =>
    set((state) => ({
      weddingData: { ...state.weddingData, ...newData },
    })),
}));

export default useWeddingStore;

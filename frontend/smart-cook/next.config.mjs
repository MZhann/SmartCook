/** @type {import('next').NextConfig} */
// next.config.js

export default {
    // Custom webpack configuration
    webpack: (config, { isServer }) => {
        // Extend webpack config here (if needed)
        return config;
    },

    // Environment variables
    env: {
        APIURL: process.env.APIURL,
        APIKEY: process.env.APIKEY,
    },

    // Image configuration
    images: {
        domains: ['www.google.com', 'media.geeksforgeeks.org', 'geeksforgeeks.org', 'web-production-ad96.up.railway.app'],
    },

    // Other Next.js configuration options (if needed)
};

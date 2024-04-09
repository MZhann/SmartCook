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
        domains: ['www.google.com', 'media.geeksforgeeks.org', 'geeksforgeeks.org', 'oaidalleapiprodscus.blob.core.windows.net', 'web-production-ad96.up.railway.app', 'abeu.s3.amazonaws.com'],
    }
};

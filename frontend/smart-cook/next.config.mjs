/** @type {import('next').NextConfig} */
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

    // Other Next.js configuration options (if needed)
};

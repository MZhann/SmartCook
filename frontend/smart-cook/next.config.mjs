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
        APIKEY: "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",
    },

    // Other Next.js configuration options (if needed)
};
const TOKEN_KEY = "generation_tokens";

export const initializeTokenCount = () => {
    let tokens = localStorage.getItem(TOKEN_KEY);
    if (!tokens) {
        // 5 generatiion tokens by default
        localStorage.setItem(TOKEN_KEY, 5);
        tokens = 5;
    }
    return parseInt(tokens);
};

export const getTokenCount = () => {
    return initializeTokenCount();
};

// Increments
export const incrementTokenCount = () => {
    let tokens = getTokenCount();
    if (tokens < 5) {
        tokens += 1;
        localStorage.setItem(TOKEN_KEY, tokens);
    }
    return tokens;
};

export const decrementTokenCount = () => {
    let tokens = getTokenCount();
    if (tokens > 0) {
        tokens -= 1;
        localStorage.setItem(TOKEN_KEY, tokens);
    }
    return tokens;
};

// Reset token count to 5
export const resetTokenCount = () => {
    localStorage.setItem(TOKEN_KEY, 5);
    return 5;
};

// export const isUserAuthorized = () => {
//     // Retrieve the token from localStorage
//     const accessToken = localStorage.getItem("accessToken");

//     return accessToken !== null && accessToken !== undefined;
// };

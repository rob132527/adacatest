// utils.js
function manipulateUsername(username) {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Format: YYYYMMDDTHHMMSS
    return `${username}_${timestamp}`;
}

module.exports = manipulateUsername;

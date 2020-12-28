// parse userID and return user's name
const getName = (userID) => {
    if (!userID) return null;
    return userID.split("#").slice(0, -1).join("#");
};

// parse userID and return user's color
const getColor = (userID, lightness = 60) => {
    if (userID === null) return null;
    var hue = userID.split("$").slice(-1)[0];
    return `hsl(${hue}, 90%, ${lightness}%)`;
};

export { getName, getColor };
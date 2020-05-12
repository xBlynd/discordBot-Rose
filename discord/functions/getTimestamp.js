module.exports = () => {
    let date = new Date(Date.now());

    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `[${hours}:${minutes}:${seconds}]`;
};

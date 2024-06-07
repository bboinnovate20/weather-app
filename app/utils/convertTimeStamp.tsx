

export function convertTimestamp(timestamp: number) {

    const date = new Date(timestamp );
    console.log('date', date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}${ampm}`;
}

export function checkSunriseOrSunset(sunriseTimestamp: number, sunsetTimestamp: number) {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const sunriseTime = new Date(sunriseTimestamp).getHours();
    const sunsetTime = new Date(sunsetTimestamp).getHours();

    if (currentHours >= sunriseTime && currentHours < sunsetTime) {
        return 'sunrise';
    } else {
        return 'sunset';
    }
}




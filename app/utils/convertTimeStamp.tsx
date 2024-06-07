

export function convertTimestamp(timestamp: number, timezone: number) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    date.setSeconds(date.getSeconds() + timezone); // Add timezone offset

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function checkSunriseOrSunset(sunriseTimestamp: number, sunsetTimestamp: number, timezone: number) {
    const currentTime = new Date();
    const currentHours = currentTime.getUTCHours() + (timezone / 3600);
    
    const sunriseDate = new Date(sunriseTimestamp * 1000); // Convert to milliseconds
    sunriseDate.setSeconds(sunriseDate.getSeconds() + timezone); // Add timezone offset
    const sunriseTime = sunriseDate.getUTCHours();

    const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert to milliseconds
    sunsetDate.setSeconds(sunsetDate.getSeconds() + timezone); // Add timezone offset
    const sunsetTime = sunsetDate.getUTCHours();

    if (currentHours >= sunriseTime && currentHours < sunsetTime) {
        return 'sunrise';
    } else {
        return 'sunset';
    }
}




//1080 -> 18:00 

export function convertMinutesToHourString(min: number) {
    const hour = Math.floor(min / 60);
    const minutes = min % 60;
    return `${String(hour).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
}
export function formatSeconsToMinutes(seconds: number){
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;

}
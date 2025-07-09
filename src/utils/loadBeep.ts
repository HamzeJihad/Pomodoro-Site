import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

export function loadBeep(){
    const audio = new Audio(gravitationalBeep);
    audio.loop = false;
    
    audio.load();

    return () => {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error("Error playing beep sound:", error);
        });
    }


}
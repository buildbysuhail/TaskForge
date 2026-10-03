import { useRef } from "react";

import hoverCompletedSound from "@/assets/sounds/hover-completed.wav";
import kanbanDropSound from "@/assets/sounds/kanban-drop.mp3"
import submitButtonSound from "@/assets/sounds/submit-button.mp3";
import tabClickSound from "@/assets/sounds/tab-click.mp3";


function useSoundEffects() {
    const sounds = useRef({
        hoverCompleted: new Audio(hoverCompletedSound),
        kanbanDrop: new Audio(kanbanDropSound),
        submitButton: new Audio(submitButtonSound),
        tabClick: new Audio(tabClickSound),
    });

    const play = (soundName, volume = 1) => {
        const sound = sounds.current[soundName];

        if (!sound) {
            console.warn(`Sound "${soundName}" not found.`);
            return;
        }

        sound.currentTime = 0;
        sound.volume = volume;

        sound.play().catch(() => {});
    };

    return {
        play,

        playHoverCompleted: () => play("hoverCompleted"),
        playKanbanDrop: () => play("kanbanDrop"),
        playSubmitButton: () => play("submitButton"),
        playTabClick: () => play("tabClick"),
    };
}

export default useSoundEffects;
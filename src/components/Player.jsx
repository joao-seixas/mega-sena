import './Player.css';
import { useState, useRef } from 'react';
import playIcon from '../assets/play.svg';
import fastIcon from '../assets/fast.svg';
import pauseIcon from '../assets/pause.svg';

function Player({concurso, sorteios, callbackConcurso}) {
    const semConcursos = sorteios.length < 1;
    const timer = useRef(null);
    const step = useRef(0);
    const [playing, setPlaying] = useState(null);
    const btnAnteriorDisabled = concurso === 0 || semConcursos;
    const btnPosteriorDisabled = concurso === sorteios.length - 1 || semConcursos;
    function startTimer(action) {
        if (timer.current) {
            stopTimer();
            return;
        }
        setPlaying(action);
        step.current = 0;
        switch (action) {
            case 'fastRewind' :
                timer.current = setInterval(decrease, 400);
                break;
            case 'normalRewind' :
                timer.current = setInterval(decrease, 800);
                break;
            case 'normalForward' :
                timer.current = setInterval(increase, 800);
                break;
            case 'fastForward' :
                timer.current = setInterval(increase, 400);
                break;
        }

        function stopTimer() {
            clearInterval(timer.current);
            timer.current = null;
            setPlaying(null);
        }

        function increase() {
            callbackConcurso(++step.current + concurso);
            if ((concurso + step.current) >= (sorteios.length - 1)) stopTimer();
        }
        function decrease() {
            callbackConcurso(--step.current + concurso);
            if ((concurso + step.current) <= 0) stopTimer();
        }
    }

    return (
        <footer className="player">
            <button
                className="player-button mirror"
                disabled={btnAnteriorDisabled || (timer.current && (playing != 'fastRewind'))}
                onClick={() => {startTimer('fastRewind');}}
            >
                <img src={playing === 'fastRewind' ? pauseIcon : fastIcon} />
            </button>
            <button
                className="player-button mirror"
                disabled={btnAnteriorDisabled || (timer.current && (playing != 'normalRewind'))}
                onClick={() => {startTimer('normalRewind');}}
            >
                <img src={playing === 'normalRewind' ? pauseIcon : playIcon} />
            </button>
            <button
                className="player-button"
                disabled={btnPosteriorDisabled || (timer.current && (playing != 'normalForward'))}
                onClick={() => {startTimer('normalForward');}}
            >
                <img src={playing === 'normalForward' ? pauseIcon : playIcon} />
            </button>
            <button
                className="player-button"
                disabled={btnPosteriorDisabled || (timer.current && (playing != 'fastForward'))}
                onClick={() => {startTimer('fastForward');}}
            >
                <img src={playing === 'fastForward' ? pauseIcon : fastIcon} />
            </button>
        </footer>
    );
}

export default Player
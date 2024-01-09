import './Navegador.css';
import { useState, useRef } from 'react';
import Data from '../components/Data';
import calendarIcon from '../assets/calendar.svg';
import nextIcon from '../assets/next.svg';
import beforeIcon from '../assets/before.svg';
import firsIcon from '../assets/first.svg';
import lastIcon from '../assets/last.svg';
import playIcon from '../assets/play.svg';
import fastIcon from '../assets/fast.svg';
import pauseIcon from '../assets/pause.svg';

function Navegador({concurso, sorteios, callbackConcurso}) {
    const semConcursos = sorteios.length < 1;
    const data = semConcursos ?  '' : sorteios[concurso]?.['Data do Sorteio'].split('/').reverse().join('-');
    const refInputData = useRef(null);
    const timer = useRef(null);
    const step = useRef(0);
    const [playing, setPlaying] = useState(null);
    const btnAnteriorDisabled = concurso === 0 || semConcursos;
    const btnPosteriorDisabled = concurso === sorteios.length - 1 || semConcursos;
    const inputDataHandleChange = ({target: {value}}) => {
        let posInicial = 0;
        let posFinal = sorteios.length - 1;
        let dataBuscada = new Date(value);
        let meio;
        let dataAtual;

        while(posInicial <= posFinal) {
            meio = parseInt((posInicial + posFinal) / 2);
            dataAtual = new Date(sorteios[meio]['Data do Sorteio'].split('/').reverse().join('-'));

            if (dataAtual.getTime() === dataBuscada.getTime()) {
                callbackConcurso(meio);
                return;
            }
            if (dataAtual > dataBuscada) posFinal = meio - 1;
            if (dataAtual < dataBuscada) posInicial = meio + 1;
        }

        callbackConcurso(meio);
    }

    function startTimer(action) {
        if (timer.current) {
            stopTimer();
            return;
        }
        setPlaying(action);
        step.current = 0;
        switch (action) {
            case 'fastRewind' :
                timer.current = setInterval(decrease, 300);
                break;
            case 'normalRewind' :
                timer.current = setInterval(decrease, 800);
                break;
            case 'normalForward' :
                timer.current = setInterval(increase, 800);
                break;
            case 'fastForward' :
                timer.current = setInterval(increase, 300);
                break;
        }

        function stopTimer() {
            clearInterval(timer.current);
            timer.current = null;
            setPlaying(null);
        }

        function increase() {
            if ((concurso + step.current) >= (sorteios.length - 1)) {
                stopTimer();
                return;
            }
            callbackConcurso(++step.current + concurso);
        }
        function decrease() {
            if ((concurso + step.current) <= 0) {
                stopTimer();
                return;
            }
            callbackConcurso(--step.current + concurso);
        }
    }

    return (
        <div className="navegador">
            <div className="data">
                <Data dataString={sorteios[concurso]?.['Data do Sorteio']} />
                <img
                    className="calendario"
                    src={calendarIcon}
                    onClick={() => refInputData.current.showPicker()}
                    style={{'display' : semConcursos ? 'none' : 'block'}}
                />
                <input
                    className="input-data"
                    type="date"
                    ref={refInputData}
                    onChange={inputDataHandleChange}
                    value={data}
                />
            </div>
            <div className="concurso">
                <button
                    className="botao-concurso"
                    disabled={btnAnteriorDisabled}
                    onClick={() => callbackConcurso(0)}
                >
                    <img src={firsIcon} />
                </button>
                <button
                    className="botao-concurso"
                    disabled={btnAnteriorDisabled}
                    onClick={() => callbackConcurso(concurso - 1)}
                >
                    <img src={beforeIcon} />
                </button>
                Concurso
                <select
                    className="input-concurso"
                    value={concurso}
                    disabled={semConcursos}
                    onChange={({target: {value}}) => callbackConcurso(parseInt(value))}>
                        {sorteios.map((sorteio, index) => <option key={sorteio.Concurso} value={index}>{sorteio.Concurso}</option>)}
                </select>
                <button
                    className="botao-concurso"
                    disabled={btnPosteriorDisabled}
                    onClick={() => callbackConcurso(concurso + 1)}
                >
                    <img src={nextIcon} />
                </button>
                <button
                    className="botao-concurso"
                    disabled={btnPosteriorDisabled}
                    onClick={() => callbackConcurso(sorteios.length - 1)}
                >
                    <img src={lastIcon} />
                </button>
            </div>
            <div className="concurso">
                <button
                    className="botao-concurso mirror"
                    disabled={btnAnteriorDisabled || (timer.current && (playing != 'fastRewind'))}
                    onClick={() => {
                        startTimer('fastRewind');
                    }}
                >
                    <img src={playing === 'fastRewind' ? pauseIcon : fastIcon} />
                </button>
                <button
                    className="botao-concurso mirror"
                    disabled={btnAnteriorDisabled || (timer.current && (playing != 'normalRewind'))}
                    onClick={() => {
                        startTimer('normalRewind');
                    }}
                >
                    <img src={playing === 'normalRewind' ? pauseIcon : playIcon} />
                </button>
                <button
                    className="botao-concurso"
                    disabled={btnPosteriorDisabled || (timer.current && (playing != 'normalForward'))}
                    onClick={() => {
                        startTimer('normalForward');
                    }}
                >
                    <img src={playing === 'normalForward' ? pauseIcon : playIcon} />
                </button>
                <button
                    className="botao-concurso"
                    disabled={btnPosteriorDisabled || (timer.current && (playing != 'fastForward'))}
                    onClick={() => {
                        startTimer('fastForward');
                    }}
                >
                    <img src={playing === 'fastForward' ? pauseIcon : fastIcon} />
                </button>
            </div>
        </div>
    );
}

export default Navegador
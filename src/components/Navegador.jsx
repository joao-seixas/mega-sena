import './Navegador.css';
import { useRef } from 'react';
import Data from '../components/Data';
import calendarIcon from '../assets/calendar.svg';
import nextIcon from '../assets/next.svg';
import beforeIcon from '../assets/before.svg';
import firsIcon from '../assets/first.svg';
import lastIcon from '../assets/last.svg';

function Navegador({concurso, sorteios, callbackConcurso}) {
    const semConcursos = sorteios.length < 1;
    const data = semConcursos ?  '' : sorteios[concurso]?.['Data do Sorteio'].split('/').reverse().join('-');
    const refInputData = useRef(null);
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
        </div>
    );
}

export default Navegador
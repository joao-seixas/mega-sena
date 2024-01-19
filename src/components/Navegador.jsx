import './Navegador.css';
import { useState, useRef, useEffect } from 'react';
import binarySearch from '../utils/binarySearch';
import calendarIcon from '../assets/calendar.svg';
import nextIcon from '../assets/next.svg';
import beforeIcon from '../assets/before.svg';
import firsIcon from '../assets/first.svg';
import lastIcon from '../assets/last.svg';

function Navegador({concurso, sorteios, callbackConcurso, small}) {
    const semConcursos = sorteios.length < 1;
    const data = semConcursos ?  '' : sorteios[concurso]?.data;
    const dateOptions = small ? {} : {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const dataString = semConcursos ?  '-' : data.toLocaleDateString('pt-BR', dateOptions);
    const [inputValue, setInputValue] = useState(semConcursos ? '' : sorteios[concurso].concurso);
    const refInputData = useRef(null);
    const btnAnteriorDisabled = concurso === 0 || semConcursos;
    const btnPosteriorDisabled = concurso === sorteios.length - 1 || semConcursos;
    function inputDataHandleChange({target: {value}}) {
        callbackConcurso(
            binarySearch(
                new Date(value).getTime(),
                sorteios.length,
                (index) => sorteios[index].data.getTime()
            )
        );
    }
    function handleInputConcurso(event) {
        // numeros
        if (event.keyCode > 47 && event.keyCode < 58) return;
        // backspace
        if (event.keyCode === 8) return;
        // shift/control
        if (event.keyCode === 16 || event.keyCode === 17) return;
        // direita/esquerda
        if (event.keyCode === 37 || event.keyCode === 39) return;
        // tab
        if (event.keyCode === 9) return;
        //home/delete
        if (event.keyCode === 35 || event.keyCode === 36) return;
        //enter
        if (event.keyCode === 13) searchConcurso(event);
        
        event.preventDefault();
    }
    function searchConcurso(event) {
        let concursoAtual;

        if (event.target.value === '') return;

        concursoAtual = binarySearch(
            parseInt(event.target.value),
            sorteios.length,
            (index) => sorteios[index].concurso
        );

        callbackConcurso(concursoAtual);
        setInputValue(sorteios[concursoAtual].concurso);
        event.target.blur();
    }

    useEffect(() => {
        setInputValue(semConcursos ? '' : sorteios[concurso].concurso);
    }, [concurso]);

    return (
        <div className="navegador">
            <div className="quantidade-concursos">
                {small ? '' : `Concursos encontrados: ${sorteios.length}`}
            </div>
            <div className="data">
                {dataString}
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
                {small ? <></> : 'Concurso'}
                {small ? <></> : 
                    <input
                        className="input-concurso"
                        type="text"
                        inputMode="numeric"
                        disabled={semConcursos}
                        value={inputValue}
                        onKeyDown={handleInputConcurso}
                        onChange={(event) => setInputValue(event.target.value)}
                        onClick={(event) => event.target.select()}
                        onBlur={searchConcurso}
                    />
                }
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
            {small ?
                <input
                    className="input-concurso"
                    type="text"
                    inputMode="numeric"
                    disabled={semConcursos}
                    value={inputValue}
                    onKeyDown={handleInputConcurso}
                    onChange={(event) => setInputValue(event.target.value)}
                    onClick={(event) => event.target.select()}
                    onBlur={searchConcurso}
                /> : <></>}
        </div>
    );
}

export default Navegador
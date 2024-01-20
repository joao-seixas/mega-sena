import './Numeros.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Bolas from '../components/Bolas';
import Navegador from '../components/Navegador';
import Player from '../components/Player';
import findQuantities from '../utils/findQuantities';

function Numeros() {

    const [sorteios] = useOutletContext();
    const [concursoInicial, setConcursoInicial] = useState(0);
    const [concursoFinal, setConcursoFinal] = useState(sorteios.length);
    const sorteiosFiltrados = sorteios.slice(concursoInicial, concursoFinal);
    const bolas = calculaBolas();
    const callbackInicio = (concurso) => {
        setConcursoInicial(concurso);
    }
    const callbackFim = (concurso) => {
        setConcursoFinal(concurso + concursoInicial + 1);
    }
    function calculaBolas() {
        let quantities = findQuantities(sorteiosFiltrados);
        let max = Math.max(...quantities);
        let min = Math.min(...quantities);
        let corFundo;
        let currentNumbers = [];

        for (let index = 0; index < 60; index++) {
            corFundo = 255 - (Math.round((quantities[index] - min) * (255 / (max - min))));
            currentNumbers[index + 1] = {
                cor: `rgb(0, 0, 0)`,
                background: `rgb(255, ${corFundo}, ${corFundo})`,
                borda: 'black',
                title: `${quantities[index]} concursos`
            };
        }
        return currentNumbers;
    }
    
    return (
        <div className="concursos">
            <div className="mapa-calor">
                <div className="numero-concursos">
                    {sorteiosFiltrados.length} {sorteiosFiltrados.length > 1 ? 'concursos' : 'concurso'}
                </div>
                <Bolas bolas={bolas} callbackBola={null} />
            </div>
            <Player concurso={sorteiosFiltrados.length - 1} sorteios={sorteios.slice(concursoInicial, sorteios.length)} callbackConcurso={callbackFim} />
            <div className="painel-numeros">
                <div className="navegador-numeros">
                    <div className="titulo">Início</div>
                    <Navegador concurso={concursoInicial} sorteios={sorteios.slice(0, concursoFinal)} callbackConcurso={callbackInicio} small={true} />
                </div>
                <div className="navegador-numeros">
                    <div className="titulo">Fim</div>
                    <Navegador concurso={sorteiosFiltrados.length - 1} sorteios={sorteios.slice(concursoInicial, sorteios.length)} callbackConcurso={callbackFim} small={true} />
                </div>
            </div>
        </div>
    );
}

export default Numeros
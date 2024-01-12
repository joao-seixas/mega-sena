import './Numeros.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Bolas from '../components/Bolas';
import Navegador from '../components/Navegador';
import Player from '../components/Player';

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
        let numeros = new Array(60).fill(0);
        let max = 0;
        let min = sorteiosFiltrados.length;
        let corFundo;
        let currentBolas = [];

        for (let bola = 0; bola < 60; bola++) {
            for (let concurso = 0; concurso < sorteiosFiltrados.length; concurso++) {
                for (let bolaConcurso = 1; bolaConcurso < 7; bolaConcurso++) {
                    if (sorteiosFiltrados[concurso][`Bola${bolaConcurso}`] === bola + 1) {
                        numeros[bola]++;
                        break;
                    }
                }
            }
            if (numeros[bola] > max) max = numeros[bola];
            if (numeros[bola] < min) min = numeros[bola];
        }

        for (let bola = 0; bola < 60; bola++) {
            corFundo = 255 - (Math.trunc((numeros[bola] - min) * (255 / (max - min))));
            currentBolas[bola + 1] = {cor: `rgb(0, 0, 0)`, background: `rgb(255, ${corFundo}, ${corFundo})`, borda: 'black', title: `${numeros[bola]} concursos`};
        }
        return currentBolas;
    }
    
    return (
        <div className="concursos">
            <div className="mapa-calor">
                <div>{sorteiosFiltrados.length} {sorteiosFiltrados.length > 1 ? 'concursos' : 'concurso'}</div>
                <Bolas bolas={bolas} callbackBola={null} />
            </div>
            <Player concurso={sorteiosFiltrados.length - 1} sorteios={sorteios.slice(concursoInicial, sorteios.length)} callbackConcurso={callbackFim} />
            <div className="painel-concurso">
                <div>
                    <h3>Início</h3>
                    <Navegador concurso={concursoInicial} sorteios={sorteios.slice(0, concursoFinal)} callbackConcurso={callbackInicio} small={true} />
                </div>
                <div>
                    <h3>Fim</h3>
                    <Navegador concurso={sorteiosFiltrados.length - 1} sorteios={sorteios.slice(concursoInicial, sorteios.length)} callbackConcurso={callbackFim} small={true} />
                </div>
            </div>
        </div>
    );
}

export default Numeros
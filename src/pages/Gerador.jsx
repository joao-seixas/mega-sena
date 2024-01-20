import './Gerador.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Bolas from '../components/Bolas';
import filter from '../utils/filter';
import findQuantities from '../utils/findQuantities';

function Gerador() {
    const [sorteios] = useOutletContext();
    const quantities = findQuantities(sorteios);
    const [priorizar, setPriorizar] = useState('nenhuma');
    const [geradas, setGeradas] = useState(gerarBolas());
    const bolas = getNumbers(geradas);
    function gerarBolas() {
        let bolasGeradas = [];
        let bolaAtual;
        let chancesMap = [];
        let min = Math.min(...quantities);
        let max = Math.max(...quantities);
        let chances;

        if (priorizar === 'nenhuma') {
            for (let index = 0; index < 60; index++) {
                chancesMap.push(index + 1);
            }
        }

        if (priorizar === 'mais') {
            for (let index = 0; index < 60; index++) {
                chances = 1 + (Math.trunc((quantities[index] - min) * (100 / (max - min))));
                for (let chancesIndex = 0; chancesIndex < chances; chancesIndex++) {
                    chancesMap.push(index + 1);
                }
            }
        }

        if (priorizar === 'menos') {
            for (let index = 0; index < 60; index++) {
                chances = 99 - (Math.trunc((quantities[index] - min) * (100 / (max - min))));
                for (let chancesIndex = 0; chancesIndex < chances; chancesIndex++) {
                    chancesMap.push(index + 1);
                }
            }
        }

        do {
            for (let indice = 0; indice < 6; indice++) {
                do {
                    bolaAtual = chancesMap[Math.floor(Math.random() * chancesMap.length)];
                } while(bolasGeradas.indexOf(bolaAtual) > -1);
                bolasGeradas.push(bolaAtual);
            }
        } while (filter(bolasGeradas, sorteios).length > 0);

        return bolasGeradas;
    }
    function getNumbers(geradas) {
        let numbers = {};

        for(let index = 0; index < 6; index++) {
            numbers = {...numbers, [geradas[index]] : {cor: 'white', background: '#BF5700', title: 'número da sorte!'}};
        }
        
        return numbers;
    }

    return (
        <div className="concursos">
            <div className="volante-gerador">
                <div className="numeros-gerador">
                    <div className="titulo-gerador">
                        Boa sorte!
                    </div>
                </div>
                <Bolas bolas={bolas} callbackBola={null} />
            </div>
            <button
                className="botao-gerar"
                onClick={() => setGeradas(gerarBolas())}
            >
                Gerar novo
            </button>
            <div className="painel-gerador">
                <fieldset className="priorizar">
                    <legend>Priorizar:</legend>
                    <input
                        type="radio"
                        name="priorizar"
                        id="nenhuma"
                        value="nenhuma"
                        checked={priorizar == 'nenhuma'}
                        onChange={(event) => setPriorizar(event.target.value)}
                    />
                    <label htmlFor="nenhuma">
                        Nenhuma
                    </label>
                    <input
                        type="radio"
                        name="priorizar"
                        id="mais"
                        value="mais"
                        checked={priorizar == 'mais'}
                        onChange={(event) => setPriorizar(event.target.value)}
                    />
                    <label htmlFor="mais">
                        Mais sorteadas
                    </label>
                    <input
                        type="radio"
                        name="priorizar"
                        id="menos"
                        value="menos"
                        checked={priorizar == 'menos'}
                        onChange={(event) => setPriorizar(event.target.value)}
                    />
                    <label htmlFor="menos">
                        Menos sorteadas
                    </label>
                </fieldset>
            </div>
        </div>
    );
}

export default Gerador
import './Gerador.css';
import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Bolas from '../components/Bolas';
import filter from '../utils/filter';
import findQuantities from '../utils/findQuantities';

function Gerador() {
    const [sorteios] = useOutletContext();
    const quantities = findQuantities(sorteios);
    const selectedNumbers = useRef([]);
    const [priorizar, setPriorizar] = useState('nenhuma');
    const [geradas, setGeradas] = useState([]);
    const bolas = getNumbers(geradas);
    function gerarBolas() {
        let bolasGeradas = [...selectedNumbers.current];
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
                chances = 1 + (Math.round((quantities[index] - min) * (100 / (max - min))));
                for (let chancesIndex = 0; chancesIndex < chances; chancesIndex++) {
                    chancesMap.push(index + 1);
                }
            }
        }

        if (priorizar === 'menos') {
            for (let index = 0; index < 60; index++) {
                chances = 99 - (Math.round((quantities[index] - min) * (100 / (max - min))));
                for (let chancesIndex = 0; chancesIndex < chances; chancesIndex++) {
                    chancesMap.push(index + 1);
                }
            }
        }

        do {
            for (let indice = 0; indice < 6 - selectedNumbers.current.length; indice++) {
                do {
                    bolaAtual = chancesMap[Math.floor(Math.random() * chancesMap.length)];
                    console.log(bolaAtual);
                } while(bolasGeradas.indexOf(bolaAtual) > -1);
                bolasGeradas.push(bolaAtual);
            }
        } while (filter(bolasGeradas, sorteios).length > 0);

        console.log(bolasGeradas);
        return bolasGeradas;
    }
    function getNumbers(geradas) {
        let numbers = {};

        for(let index = 0; index < 6; index++) {
            numbers = {...numbers, [geradas[index]] : {cor: 'white', background: '#BF5700', title: 'número da sorte!'}};
        }

        for(let index = 0; index < selectedNumbers.current.length; index++) {
            numbers = {...numbers, [selectedNumbers.current[index]] : {cor: 'white', background: '#CEA54E', title: 'marcada'}};
        }

        return numbers;
    }
    function callbackBola(bola) {
        let tempNumbers = [...selectedNumbers.current];
        let numberIndex = selectedNumbers.current.indexOf(parseInt(bola));

        if (numberIndex > -1) {
            tempNumbers.splice(numberIndex, 1);
            selectedNumbers.current = tempNumbers;
            setGeradas(gerarBolas());
            return;
        }
        if (selectedNumbers.current.length > 5) return;
        tempNumbers.push(parseInt(bola));
        selectedNumbers.current = tempNumbers;
        setGeradas(gerarBolas());
    }

    return (
        <div className="concursos">
            <div className="volante-gerador">
                <div className="numeros-gerador">
                    <div className="titulo-gerador">
                        Boa sorte!
                    </div>
                </div>
                <Bolas bolas={bolas} callbackBola={callbackBola} />
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
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                </fieldset>
            </div>
        </div>
    );
}

export default Gerador
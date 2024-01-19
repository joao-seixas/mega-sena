import './Gerador.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Bolas from '../components/Bolas';

function Gerador() {

    const [sorteios] = useOutletContext();
    const [geradas, setGeradas] = useState(gerarBolas());
    const bolas = getNumbers(geradas);
    function gerarBolas() {
        let bolasGeradas = [];
        let bolaAtual;

        for (let indice = 0; indice < 6; indice++) {
            do {
                bolaAtual = Math.floor(Math.random() * 60 + 1);
            } while(bolasGeradas.indexOf(bolaAtual) > -1);
            bolasGeradas.push(bolaAtual);
        }

        return bolasGeradas;
    }
    function getNumbers(geradas) {
        let numbers = {};

        for(let index = 0; index < 6; index++) {
            numbers = {...numbers, [geradas[index]] : {cor: 'white', background: '#BF5700', title: 'sorteada'}};
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
                <fieldset disabled={true}>
                    <legend>Priorizar:</legend>
                    <input type="radio" name="priorizar" id="nenhuma" defaultChecked />
                    <label htmlFor="nenhuma">Nenhuma</label>
                    <input type="radio" name="priorizar" id="mais" />
                    <label htmlFor="mais">Mais sorteadas</label>
                    <input type="radio" name="priorizar" id="menos" />
                    <label htmlFor="menos">Menos sorteadas</label>
                </fieldset>
            </div>
        </div>
    );
}

export default Gerador
import './Sequencias.css';
import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Navegador from '../components/Navegador';
import Bolas from '../components/Bolas';
import Premios from '../components/Premios';
import Player from '../components/Player';
import Filtro from '../components/Filtro';

function Sequencias() {

    const [sorteios] = useOutletContext();
    const [sequencias, setSequencias] = useState(0);
    const sorteiosFiltrados = useMemo(findSequences, [sorteios]);
    const [sorteiosAtuais, setSorteiosAtuais] = useState(sorteiosFiltrados[sequencias]);
    const [concurso, setConcurso] = useState(sorteiosFiltrados[sequencias].length - 1);
    const [bolasMarcadas, setBolasMarcadas] = useState({});
    const bolas = {
        [sorteiosAtuais[concurso]?.Bola1] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosAtuais[concurso]?.Bola2] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosAtuais[concurso]?.Bola3] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosAtuais[concurso]?.Bola4] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosAtuais[concurso]?.Bola5] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosAtuais[concurso]?.Bola6] : {cor: 'white', background: 'green', title: 'sorteada'},
        ...bolasMarcadas
    };
    const callbackConcurso = (novoConcurso) => {
        setConcurso(novoConcurso);
    }
    const callbackBola = (bola) => {
        let tempBolas = {...bolasMarcadas};

        if (bola in tempBolas) {
            delete tempBolas[bola];
            setBolasMarcadas({...tempBolas});
            filtraSorteios(tempBolas);
            return;
        }
        if (Object.keys(tempBolas).length > 5) return;
        tempBolas = {...tempBolas, [bola] : {cor: 'white', background: 'lightgreen', title: 'sorteada'}};
        setBolasMarcadas(tempBolas);
        filtraSorteios(tempBolas);
    }
    const filtraSorteios = (tempBolas) => {
        let todosEncontrados;
        let umEncontrado;
        let novo = [];

        for (let indiceSorteios = 0; indiceSorteios < sorteiosFiltrados[sequencias].length; indiceSorteios++) {
            todosEncontrados = true;
            for (let indiceMarcadas = 0; indiceMarcadas < Object.keys(tempBolas).length; indiceMarcadas++) {
                umEncontrado = false;
                for (let indiceBolas = 1; indiceBolas < 7; indiceBolas++) {
                    if (Object.keys(tempBolas)[indiceMarcadas] === sorteiosFiltrados[sequencias][indiceSorteios][`Bola${indiceBolas}`].toString()) {
                        umEncontrado = true;
                        break;
                    }
                }
                todosEncontrados = todosEncontrados && umEncontrado;
            }
            if(todosEncontrados) novo.push(sorteiosFiltrados[sequencias][indiceSorteios]);
        }
        setSorteiosAtuais(novo);
        novo.length > 0 ? setConcurso(novo.length - 1) : setConcurso(-1);
    }
    function findSequences() {
        let sequenciasEncontradas = [[], [], [], [], []];
        let sorted;
        let tamanhoSequencia;

        for(let sorteio = 0; sorteio < sorteios.length; sorteio++) {
            sorted = [
                sorteios[sorteio].Bola1,
                sorteios[sorteio].Bola2,
                sorteios[sorteio].Bola3,
                sorteios[sorteio].Bola4,
                sorteios[sorteio].Bola5,
                sorteios[sorteio].Bola6
            ].sort((a, b) => a - b);
            tamanhoSequencia = -1;
            for (let bola = 0; bola < 6;) {
                if ((sorted[bola] + 1) === sorted[++bola]) tamanhoSequencia++; else
                    if (tamanhoSequencia > -1) {
                        sequenciasEncontradas[tamanhoSequencia].push(sorteios[sorteio]);
                        tamanhoSequencia = -1;
                    }
            }
        }
        sequenciasEncontradas[0] = [...new Set(sequenciasEncontradas[0])];
        return sequenciasEncontradas;
    }
    function handleChangeSequencias({target : {value}}) {
        let sequenciaAtual = parseInt(value);

        setSequencias(sequenciaAtual);
        setSorteiosAtuais(sorteiosFiltrados[sequenciaAtual]);
        setConcurso(sorteiosFiltrados[sequenciaAtual].length - 1);
    }

    return (
        <div className="concursos">
            <div className="volante">
                <Navegador concurso={concurso} sorteios={sorteiosAtuais} callbackConcurso={callbackConcurso} small={false} />
                <Bolas bolas={bolas} callbackBola={callbackBola} />
            </div>
            <Premios sorteio={sorteiosAtuais[concurso]} />
            <Filtro sequencias={sequencias} handleChangeSequencias={handleChangeSequencias} />
            <Player concurso={concurso} sorteios={sorteiosAtuais} callbackConcurso={callbackConcurso} />
        </div>
    );
}

export default Sequencias
import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Navegador from '../components/Navegador';
import Player from '../components/Player';
import Bolas from '../components/Bolas';
import Premios from '../components/Premios';

function Concursos() {

    const [sorteios] = useOutletContext();
    const [bolasMarcadas, setBolasMarcadas] = useState({});
    const [concurso, setConcurso] = useState(sorteios.length - 1);
    const sorteiosFiltrados = useMemo(filtraSorteios, [bolasMarcadas]);
    const bolas = {
        [sorteiosFiltrados[concurso]?.Bola1] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosFiltrados[concurso]?.Bola2] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosFiltrados[concurso]?.Bola3] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosFiltrados[concurso]?.Bola4] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosFiltrados[concurso]?.Bola5] : {cor: 'white', background: 'green', title: 'sorteada'},
        [sorteiosFiltrados[concurso]?.Bola6] : {cor: 'white', background: 'green', title: 'sorteada'},
        ...bolasMarcadas
    };
    const callbackConcurso = (novoConcurso) => {
        setConcurso(novoConcurso);
    }
    const callbackBola = (bola) => {
        let tempBolas = {...bolasMarcadas};

        if (bola in tempBolas) {
            delete tempBolas[bola];
            setBolasMarcadas(tempBolas);
            return;
        }
        if (Object.keys(tempBolas).length > 5) return;
        tempBolas = {...tempBolas, [bola] : {cor: 'black', background: 'lightgreen', title: 'sorteada'}};
        setBolasMarcadas(tempBolas);
    }
    function filtraSorteios() {
        let todasBolasEncontradas;
        let umaBolaEncontrada;
        let sorteiosEncontrados = [];

        for (let indiceSorteios = 0; indiceSorteios < sorteios.length; indiceSorteios++) {
            todasBolasEncontradas = true;
            for (let indiceMarcadas = 0; indiceMarcadas < Object.keys(bolasMarcadas).length; indiceMarcadas++) {
                umaBolaEncontrada = false;
                for (let indiceBolas = 1; indiceBolas < 7; indiceBolas++) {
                    if (Object.keys(bolasMarcadas)[indiceMarcadas] === sorteios[indiceSorteios][`Bola${indiceBolas}`].toString()) {
                        umaBolaEncontrada = true;
                        break;
                    }
                }
                todasBolasEncontradas = todasBolasEncontradas && umaBolaEncontrada;
            }
            if(todasBolasEncontradas) sorteiosEncontrados.push(sorteios[indiceSorteios]);
        }
        setConcurso(sorteiosEncontrados.length - 1);
        return sorteiosEncontrados;
    }

    return (
        <div className="concursos">
            <div>Concursos encontrados: {sorteiosFiltrados.length}</div>
            <Navegador concurso={concurso} sorteios={sorteiosFiltrados} callbackConcurso={callbackConcurso} />
            <Bolas bolas={bolas} callbackBola={callbackBola} />
            <Player concurso={concurso} sorteios={sorteiosFiltrados} callbackConcurso={callbackConcurso} />
            <Premios sorteio={sorteiosFiltrados[concurso]} />
        </div>
    );
}

export default Concursos
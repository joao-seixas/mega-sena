import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Navegador from '../components/Navegador';
import Bolas from '../components/Bolas';
import Premios from '../components/Premios';

function Sequencias() {

    const [sorteios] = useOutletContext();
    const sorteiosFiltrados = useRef(sorteios);
    const [concurso, setConcurso] = useState(sorteiosFiltrados.current.length - 1);
    const [bolasMarcadas, setBolasMarcadas] = useState({});
    const bolas = {
        [sorteiosFiltrados.current[concurso]?.Bola1] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
        [sorteiosFiltrados.current[concurso]?.Bola2] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
        [sorteiosFiltrados.current[concurso]?.Bola3] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
        [sorteiosFiltrados.current[concurso]?.Bola4] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
        [sorteiosFiltrados.current[concurso]?.Bola5] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
        [sorteiosFiltrados.current[concurso]?.Bola6] : {cor: 'white', background: 'green', borda: 'black', title: 'sorteada'},
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
        tempBolas = {...tempBolas, [bola] : {cor: 'white', background: 'blue', borda: 'black', title: 'sorteada'}};
        setBolasMarcadas(tempBolas);
        filtraSorteios(tempBolas);
    }
    const filtraSorteios = (tempBolas) => {
        let todosEncontrados;
        let umEncontrado;
        let novo = [];

        for (let indiceSorteios = 0; indiceSorteios < sorteios.length; indiceSorteios++) {
            todosEncontrados = true;
            for (let indiceMarcadas = 0; indiceMarcadas < Object.keys(tempBolas).length; indiceMarcadas++) {
                umEncontrado = false;
                for (let indiceBolas = 1; indiceBolas < 7; indiceBolas++) {
                    if (Object.keys(tempBolas)[indiceMarcadas] === sorteios[indiceSorteios][`Bola${indiceBolas}`].toString()) {
                        umEncontrado = true;
                        break;
                    }
                }
                todosEncontrados = todosEncontrados && umEncontrado;
            }
            if(todosEncontrados) novo.push(sorteios[indiceSorteios]);
        }
        sorteiosFiltrados.current = novo;
        novo.length > 0 ? setConcurso(novo.length - 1) : setConcurso(-1);
    }
    return (
        <div className="concursos">
            <div>Concursos encontrados: {sorteiosFiltrados.current.length}</div>
            <Navegador concurso={concurso} sorteios={sorteiosFiltrados.current} callbackConcurso={callbackConcurso} />
            <Bolas bolas={bolas} callbackBola={callbackBola} />
            <Premios sorteio={sorteiosFiltrados.current[concurso]} />
        </div>
    );
}

export default Sequencias
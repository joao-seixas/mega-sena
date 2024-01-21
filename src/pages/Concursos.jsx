import './Concursos.css';
import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Navegador from '../components/Navegador';
import Bolas from '../components/Bolas';
import Premios from '../components/Premios';
import Player from '../components/Player';
import Filtro from '../components/Filtro';
import filter from '../utils/filter';
import findSequences from '../utils/findSequences';

function Concursos() {

    const [sorteios] = useOutletContext();
    const [sequencias, setSequencias] = useState(0);
    const sorteiosFiltrados = useMemo(() => findSequences(sorteios), [sorteios]);
    const [sorteiosAtuais, setSorteiosAtuais] = useState(sorteiosFiltrados[sequencias]);
    const [concurso, setConcurso] = useState(sorteiosFiltrados[sequencias].length - 1);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const bolas = getNumbers();
    function getNumbers() {
        let numbers = {};

        for(let index = 0; index < 6; index++) {
            numbers = {...numbers, [sorteiosAtuais[concurso]?.bolas[index]] : {cor: 'white', background: '#BF5700', title: 'sorteada'}};
        }
        for(let index = 0; index < selectedNumbers.length; index++) {
            numbers = {...numbers, [selectedNumbers[index]] : {cor: 'white', background: '#CEA54E', title: 'sorteada'}};
        }
        
        return numbers;
    }
    function callbackConcurso(novoConcurso) {
        setConcurso(novoConcurso);
    }
    function callbackBola(bola) {
        let tempNumbers = selectedNumbers;
        let numberIndex = selectedNumbers.indexOf(bola);

        if (numberIndex > -1) {
            tempNumbers.splice(numberIndex, 1);
            markNumbers();
            return;
        }
        if (selectedNumbers.length > 5) return;
        tempNumbers.push(bola);
        markNumbers();

        function markNumbers() {
            let tempSorteiosAtuais = filter(tempNumbers, sorteiosFiltrados[sequencias]);

            setSelectedNumbers(tempNumbers);
            setSorteiosAtuais(tempSorteiosAtuais);
            setConcurso(tempSorteiosAtuais.length - 1);
        }
    }
    function handleChangeSequencias({target: {value}}) {
        let sequenciaAtual = parseInt(value);

        setSequencias(sequenciaAtual);
        setSorteiosAtuais(sorteiosFiltrados[sequenciaAtual]);
        setConcurso(sorteiosFiltrados[sequenciaAtual].length - 1);
    }

    return (
        <div className="concursos">
            <div className="volante">
                <Navegador
                    concurso={concurso}
                    sorteios={sorteiosAtuais}
                    callbackConcurso={callbackConcurso}
                    small={false}
                />
                <Bolas
                    bolas={bolas}
                    callbackBola={callbackBola}
                />
            </div>
            <Player
                concurso={concurso}
                sorteios={sorteiosAtuais}
                callbackConcurso={callbackConcurso}
            />
            <Premios
                sorteio={sorteiosAtuais[concurso]}
            />
            <Filtro
                sequencias={sequencias}
                handleChangeSequencias={handleChangeSequencias}
            />
        </div>
    );
}

export default Concursos
import './Filtro.css';
import { useState, useRef } from 'react';
import expandIcon from '../assets/expand.svg';
import collapseIcon from '../assets/collapse.svg';

function Filtro({sequencias, handleChangeSequencias}) {
    const opcoesFiltroRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    function handleExpand() {
        if (isExpanded) {
            opcoesFiltroRef.current.classList.remove('opcoes-filtro-visible');
            setIsExpanded(false);
        } else {
            opcoesFiltroRef.current.classList.add('opcoes-filtro-visible');
            setIsExpanded(true);
        }
    }

    return (
        <div>
            <div className="filtro">
                <div className="titulo-filtro" onClick={handleExpand}>
                    Filtros
                    <button className="botao-filtro" onClick={handleExpand}>
                        <img className="img-filtro" src={isExpanded ? collapseIcon : expandIcon} />
                    </button>
                </div>
                <div className="opcoes-filtro" ref={opcoesFiltroRef}>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="all"
                            value="0"
                            checked={sequencias === 0}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="all">
                            todos os jogos
                        </label>
                    </div>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="two"
                            value="1"
                            checked={sequencias === 1}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="two">
                            sequências de 2
                        </label>
                    </div>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="three"
                            value="2"
                            checked={sequencias === 2}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="three">
                            sequências de 3
                        </label>
                    </div>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="four"
                            value="3"
                            checked={sequencias === 3}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="four">
                            sequências de 4
                        </label>
                    </div>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="five"
                            value="4"
                            checked={sequencias === 4}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="five">
                            sequências de 5
                        </label>
                    </div>
                    <div className="opcao-filtro">
                        <input
                            type="radio"
                            name="sequencias"
                            id="six"
                            value="5"
                            checked={sequencias === 5}
                            onChange={(event) => {
                                handleExpand();
                                handleChangeSequencias(event);
                            }}
                        />
                        <label htmlFor="six">
                            sequências de 6
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filtro
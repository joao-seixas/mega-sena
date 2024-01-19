import './Menu.css';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <ul>
            <li><Link to="concursos">Concursos</Link></li>
            <li><Link to="numeros">Números</Link></li>
            <li><Link to="gerador">Gerador</Link></li>
        </ul>
    );
}

export default Menu
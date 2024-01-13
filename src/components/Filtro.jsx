import './Filtro.css';

function Filtro({sequencias, handleChangeSequencias}) {
    return (
        <div className="filtro">
            <input type="radio" name="sequencias" id="two" value="0" checked={sequencias === 0} onChange={handleChangeSequencias} />
            <label htmlFor="two">2</label>
            <input type="radio" name="sequencias" id="three" value="1" checked={sequencias === 1} onChange={handleChangeSequencias} />
            <label htmlFor="three">3</label>
            <input type="radio" name="sequencias" id="four" value="2" checked={sequencias === 2} onChange={handleChangeSequencias} />
            <label htmlFor="four">4</label>
            <input type="radio" name="sequencias" id="five" value="3" checked={sequencias === 3} onChange={handleChangeSequencias} />
            <label htmlFor="five">5</label>
            <input type="radio" name="sequencias" id="six" value="4" checked={sequencias === 4} onChange={handleChangeSequencias} />
            <label htmlFor="six">6</label>
        </div>
    );
}

export default Filtro
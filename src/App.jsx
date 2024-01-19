import { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import Loading from './pages/Loading';

function App() {
  const [sorteios, setSorteios] = useState(null);

  useEffect(() => {
      const url = './MEGA_SENA.xlsx';
      fetch(url)
        .then(fetchedData => fetchedData.arrayBuffer())
        .then(bufferedData => read(bufferedData))
        .then(completeData => setSorteios(
          parseData(
            utils.sheet_to_json(
              completeData.Sheets[completeData.SheetNames[0]]
            )
          )
        ));
  }, []);

  function parseData(data) {
    let parsedData = [];

    for(let index = 0; index < data.length; index++) {
      parsedData.push({
        'concurso' : data[index]['Concurso'],
        'data' : new Date(`${data[index]['Data do Sorteio'].split('/').reverse().join('-')}T03:00:00Z`),
        'bolas' : [
          data[index]['Bola1'],
          data[index]['Bola2'],
          data[index]['Bola3'],
          data[index]['Bola4'],
          data[index]['Bola5'],
          data[index]['Bola6']
        ].sort((a, b) => a - b),
        'ganhadores' : data[index]['Ganhadores 6 acertos'],
        'premio' : parseFloat(data[index]['Rateio 6 acertos'].replace('R$', '').replaceAll('.', '').replace(',', '.')),
        'ganhadoresQuina' : data[index]['Ganhadores 5 acertos'],
        'premioQuina' : parseFloat(data[index]['Rateio 5 acertos'].replace('R$', '').replaceAll('.', '').replace(',', '.')),
        'ganhadoresQuadra' : data[index]['Ganhadores 4 acertos'],
        'premioQuadra' : parseFloat(data[index]['Rateio 4 acertos'].replace('R$', '').replaceAll('.', '').replace(',', '.')),
        'acumulado' : parseFloat(data[index]['Acumulado 6 acertos'].replace('R$', '').replaceAll('.', '').replace(',', '.'))
      });
    }
    return parsedData;
  }

  if (!sorteios) return <Loading />

  return (
    <>
      <Menu />
      <Outlet context={[sorteios]} />
    </>
  )
}

export default App
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import Loading from './pages/Loading';

function App() {
  const zipFile = new JSZip();
  const xmlParser = new DOMParser();
  const [sorteios, setSorteios] = useState(null);

  useEffect(() => {
      fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados/download?modalidade=Mega-Sena')
      .then(data => data.blob())
      .then(blobData => zipFile.loadAsync(blobData))
      .then(zipFile => zipFile.files['xl/worksheets/sheet1.xml'].async('text'))
      .then(texto => xmlParser.parseFromString(texto, 'text/xml'))
      .then(document => document.getElementsByTagName('x:row'))
      .then(rows => parseData(rows));
    
      function parseData(rows) {
        let parsedData = [];
        let childs;
    
        for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
          childs = rows[rowIndex].childNodes;
          parsedData.push({
              'concurso' : parseInt(childs[0].textContent),
              'data' : new Date(`${childs[1].textContent.split('/').reverse().join('-')}T03:00:00Z`),
              'bolas' : [
                parseInt(childs[2].textContent),
                parseInt(childs[3].textContent),
                parseInt(childs[4].textContent),
                parseInt(childs[5].textContent),
                parseInt(childs[6].textContent),
                parseInt(childs[7].textContent)
              ].sort((a, b) => a - b),
              'ganhadores' : parseInt(childs[8].textContent),
              'premio' : parseFloat(childs[10].textContent.replace('R$', '').replaceAll('.', '').replace(',', '.')),
              'ganhadoresQuina' : parseInt(childs[11].textContent),
              'premioQuina' : parseFloat(childs[12].textContent.replace('R$', '').replaceAll('.', '').replace(',', '.')),
              'ganhadoresQuadra' : parseInt(childs[13].textContent),
              'premioQuadra' : parseFloat(childs[14].textContent.replace('R$', '').replaceAll('.', '').replace(',', '.')),
              'acumulado' : parseFloat(childs[15].textContent.replace('R$', '').replaceAll('.', '').replace(',', '.'))
          });
        }
      setSorteios(parsedData);
      }
  
  }, []);

  if (!sorteios) return <Loading />

  return (
    <>
      <Menu />
      <Outlet context={[sorteios]} />
      <SpeedInsights />
    </>
  )
}

export default App
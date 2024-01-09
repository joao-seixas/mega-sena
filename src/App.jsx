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
          .then(completeData => setSorteios(utils.sheet_to_json(completeData.Sheets[completeData.SheetNames[0]])));
  }, []);

  if (!sorteios) return <Loading />; else

  return (
    <>
    <Menu />
    <Outlet context={[sorteios]} />
    </>
  )
}

export default App
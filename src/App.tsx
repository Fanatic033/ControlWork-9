import './App.css';
import Header from './Components/Header/Header.tsx';
import {Route, Routes} from 'react-router-dom';
import CategoryPage from './Page/CategoryPage/CategoryPage.tsx';

const App = () => (
  <>
    <Header/>
    <Routes>
      <Route path="/category" element={<CategoryPage/>}/>
    </Routes>
  </>
);

export default App

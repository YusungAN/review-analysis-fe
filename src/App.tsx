import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Analysis, List } from './pages';
import GlobalStyle from './components/GlobalStyle';


const App = () => {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/analysis/:productid" element={<Analysis />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

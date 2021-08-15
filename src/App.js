import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';


function App() {
  return (
    <div className="app">
        <Header />
        <Content />
        <Footer />
    </div>
  );
}

export default App;

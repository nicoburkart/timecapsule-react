import Home from 'modules/home/home'
import Header from 'core/header/header'
import Footer from 'core/footer/footer'
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
}

export default App;

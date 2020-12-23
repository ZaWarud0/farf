import Title from './components/Title';
import FARForm from './containers/FARForm';
import './App.css';

function App() {
  
  return (
    <div className="app-container">
      <Title title="Fixed Asset Requisition Form" />
      <FARForm />
    </div>
  );
}

export default App;

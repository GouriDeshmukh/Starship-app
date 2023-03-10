import React from 'react';
import Starships from './components/Starships';
import Header from './components/Header';
import { Button } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const btnHandle = () => {
      toast.success("Starships are loaded",{position: "top-center"});    
  };

  return (
    <div className="container my-4 , text-center" style={{background:"grey",color:"yellow"}}>
      <ToastContainer/>
      <Header />   
      <Button color="warning" onClick={btnHandle}>Get Starships</Button>
      <hr/>
      <Starships />
    </div>
  );
};

export default App;



import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import {NuevaConsulta} from '../../services/firebasePsicologia';

import firebase from "../../firebase";
import imgImageForm from './images/psicologia-form.png';
import './styleFormPsico.css';
import Header from '../Header';

const Consulta_psico = () =>  {


  const handleInput = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };
  

  const [id, setId] = useState(null);
  //cargar el id
  useEffect(() => {
    firebase.ref('/UltimosUsuarios/Psicologia').once('value').then((snapshot) => {
      const valor  = snapshot.val(); //obtiene el value del ultimo user activo
      setId(valor);
    });
    
    //alert();
  }, []);



 

    //----------------------------navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/psicologia-Dashboard");
    }
    


  //---------------------------------guardar en firebase 

  const [motivo, setMotivo] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [recomendaciones, setRecom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    NuevaConsulta(motivo, objetivos, recomendaciones);/*se agrega a firebase*/
    navigate("/psicologia-Dashboard");
  }



  const handleInputMotivo = (event) => {
    setMotivo(event.target.value);
  }

  const handleObje = (event) => {
    setObjetivos(event.target.value);
  }
  const handleRecom = (event) => {
    setRecom(event.target.value);
  }



  return (
    <div className="containerBody_PsicoForm">
      
      <Header texto="CREAR UN NUEVO EXPENDIENTE" />

      <div className="containerFormulario_PsicoForm">
        <img className="imageLateral" src={imgImageForm}></img>
        <form onSubmit={handleSubmit} className="Formulario_PsicoForm">
          <div className="containerTitleFormulario_PsicoForm"><h1 className="title-form">NUEVA CONSULTA</h1></div>
          <input type="number" className="inputsPsico" placeholder="ID_USUARIO" value={id} disabled />


          <input type="text" className="inputsPsico" placeholder="Motivo de consulta" value={motivo} onChange={handleInputMotivo} onInput={handleInput} required />
                    <textarea type="text" className="inputsPsico" placeholder="Objetivos terapeuticos" value={objetivos} onChange={handleObje} onInput={handleInput} required />
                    <textarea type="text" className="inputsPsico" placeholder="Recomendaciones" value={recomendaciones} onChange={handleRecom} onInput={handleInput} required />
                    


          <input type="submit" className="btn"/>
          <input type="button" className="btn-Volver" value="Volver al dashboard " onClick={regresar} />
        </form>
        
      </div>

    </div>
  );

}

export default Consulta_psico;
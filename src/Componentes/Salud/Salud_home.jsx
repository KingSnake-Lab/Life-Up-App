
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';

import firebase from "../../firebase";

import Swal from 'sweetalert2';

import { addNuevoPaciente, showAlertNewPacient, addUserActive } from '../../services/firebaseSalud';

import InfoPaciente from "./Info_Paciente";

import './salud.css';
import Menu from '../MenuLateral';
import Header from '../Header';

function Salud_dashboard() {


    //navigate
    let navigate = useNavigate();

    const regresar = () => {
        navigate("/loader-Home");
    }
    const Formulario = () => {
        navigate("/formSalud");
    }
    const Consulta = () => {
        navigate("/formConsulta");
    }


    //------------------------ocultar form
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };






    //click en fila

    const [selectedRowId, setSelectedRowId] = useState(null);


    //leer datos de firebas3
    const [data, setData] = useState([]);

    useEffect(() => {
        let newID = "";
        const id_user = firebase.ref("/User");
        id_user.on('value', snapshot => {
            const firebaseData = snapshot.val();
            const dataArray = [];
            for (let key in firebaseData) {
                dataArray.push({ id: key, ...firebaseData[key] });

            }
            setData(dataArray);
        });



    }, []);





    //validar si ya clickeo en una fila
    function handleInputChange(event) {
        setSelectedRowId(event.target.value);
    }

    function handleButtonClick() {
        if (selectedRowId != null) {
            toggleVisible(); //hacer visble los btns
            addUserActive(parseInt(selectedRowId));//insert a firebase el id activo
        }
        else {
            //alert de que input esta vacio
            Swal.fire(
                'Error!',
                'Por favor da click en un usuario de la tabla',
                'error'
            )
        }

    }






    //----------------------------------------------------------render
    return (
        <div className="bodyContent">
        <div className="contenedorCompleto">
            <Menu />
            <Header texto="DASHBOARD SALUD"/>
            <div className="containerForm">
            <h2>Usuario seleccionado: {selectedRowId}</h2>
                <div className="containerOptions">
                   
                    
                    
                    <button className="btn_VerOpciones" onClick={handleButtonClick}>Ver opciones</button>


                    <button className="btn_VerOpciones" onClick={regresar}>Regresar</button>
                </div>

                {visible && (<div className="containerOcultos">
                    <button className="btn_Oculto" onClick={Formulario} >Expediente nuevo</button>
                    <button className="btn_Oculto"  onClick={Consulta} >Crear consulta medica</button>
                </div>
                )}

                <div className="table_container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID USER</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO PATERNO</th>
                                <th>APELLIDO MATERNO</th>
                                <th>EDAD</th>
                                <th>SEXO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr className="fila" key={item.id} onClick={() => setSelectedRowId(item.id)} >

                                    <td >{item.id}</td>
                                    <td>{item.InfoPersonal.Nombre}</td>
                                    <td>{item.InfoPersonal.AP}</td>
                                    <td>{item.InfoPersonal.AM}</td>
                                    <td>{item.InfoPersonal.Edad}</td>
                                    <td>{item.InfoPersonal.Sexo}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>

            </div>
            <InfoPaciente id={selectedRowId} />

        </div>
        </div>
    );

}

export default Salud_dashboard;
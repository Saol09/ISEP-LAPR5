
import '../app.css';
import Sidebar from '../GestorArmazem/Sidebar';
import React, { useEffect, useState } from "react";
import armazem from '../CriarArmazem/armazem.png';

const ListarArmazem = () => {

    useEffect(() => {
        getArmazensExistentes();
    }, []);

    const [armazensExistentes, setArmazensExistentes] = useState([]);

    const getArmazensExistentes = async () => {

        const armazensSistema = await fetch('http://localhost:5000/api/Armazens/');
        const armazens = await armazensSistema.json();
        setArmazensExistentes(armazens);
    }

    const inibirArmazem = async (id) => {
        await fetch('http://localhost:5000/api/Armazens/' + id, {
            method: 'DELETE',
            body: JSON.stringify({

            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        getArmazensExistentes();
    }


    return (
        <body>
            <Sidebar />
            <div className="inicio">
                <div className="info">
                    <form className="planear-form" >
                        <div className="linha">
                            <div className="imagem-geral">
                                <img className="planear" src={armazem} width={60} />
                            </div>
                            <div className="texto">
                                <span className="titulo">Armazens Existentes</span>
                            </div>
                        </div>
                        <div className='tabela'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Designacao</th>
                                        <th>Rua</th>
                                        <th>Porta</th>
                                        <th>Cidade</th>
                                        <th>Codigo Postal</th>
                                        <th>Pais</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Altitude</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {armazensExistentes.map(function (armazem) {
                                        return (
                                            <tr>
                                                <td> {armazem.id} </td>
                                                <td> {armazem.designacaoArmazem.designacao} </td>
                                                <td> {armazem.enderecoArmazem.rua} </td>
                                                <td> {armazem.enderecoArmazem.porta} </td>
                                                <td> {armazem.enderecoArmazem.cidade} </td>
                                                <td> {armazem.enderecoArmazem.codigopostal} </td>
                                                <td> {armazem.enderecoArmazem.pais} </td>
                                                <td> {armazem.coordenadasArmazem.latitude} </td>
                                                <td> {armazem.coordenadasArmazem.longitude} </td>
                                                <td> {armazem.coordenadasArmazem.altitude} </td>

                                                <td>
                                                    {' '}
                                                    {armazem.active ? (
                                                        <button
                                                            className="btn-fancy"
                                                            onClick={async (e) => {
                                                                e.preventDefault();
                                                                await inibirArmazem(armazem.id);
                                                            }}>
                                                            Inibir
                                                        </button>
                                                    ) : (
                                                        'Inibido'
                                                    )}{' '}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default ListarArmazem;

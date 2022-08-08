import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { Context } from "../../Context/AuthContext";
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { NavBar } from '../../components/UI/NavBar/NavBar'
import { TrashSimple, PencilSimple, UserCirclePlus } from "phosphor-react";
import './styles.css'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


export const ListaUsuarios = () =>{
    const { authenticated, handleLogout} = useContext(Context);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type:'',
        mensagem:'',
        loading: true
    });

    const confirmDelete = (user) => {
        confirmAlert({
            message:
            "Você tem certeza que quer excluir o usuário:  " +
            user.name +
            "?",
            buttons: [
            {
                label: "Sim",
                onClick: () => handleDelete(user.id)
            },
            {
                label: "Não",
                onClick: () => history.push("/usuarios")
            }
            ]
            });
        };

    const handleDelete = async (idUser) => {

      const valueToken = localStorage.getItem('token');
      const headers = {
        'headers': {
            'Authorization': 'Bearer ' + valueToken
        }
    }

    await api.delete("/user/"+idUser, headers)
    .then( (response) => {
        setStatus({
            type: 'sucess',
            mensagem: response.data.mensagem
        })
        getUsers();
    }).catch( (err) => {
        if(err.response){
            setStatus({
                type:'error',
                mensagem: err.response.data.mensagem
            })
        } else {
            setStatus({
                type:'error',
                mensagem: 'Erro: tente mais tarde...'
            })
        }
    })
}
    const getUsers = async () =>{

        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
        }   
        
        await api.get("/users", headers)
        .then((response) =>{
            setData(response.data.users);
            setStatus({loading:false})
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type:'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type:'error',
                    mensagem: 'Erro: Tente mais tarde!'
                })
            }
        })
    }

    useEffect( () =>{
        getUsers();
    }, [])


    return(
        <>
            <NavBar />                    
            <Container>
            {status.loading ? <Alert variant="warning">Carregando...</Alert> : ""}
            <div className="btnNovo">
            <h1>Usuários</h1>
            <Button variant="light">

                <Link className="noLink" to="/usuarios/novo">
                  Novo Usuário
                  <UserCirclePlus size={32} weight="light" />
                  </Link>
            </Button>
            </div>
            <Table striped bordered hover>  
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {(!status.loading &&
                data.map(user =>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="spaceFlex">
                        <Button variant="light">
                            {/* <Link className="noLink " to={"/usuarios/editar/"+user.id}>Editar</Link> */}
                            <Link className="noLink " to={"/usuarios/editar/"+user.id}>
                              Editar
                            <PencilSimple size={32} weight="light" />
                            </Link>
                        </Button>
                        <Button variant="danger" onClick={() => confirmDelete(user)}>
                            Excluir
                            <TrashSimple size={32} weight="light" />
                        </Button>
                        </td>
                    </tr>
                ))

            )}
            </tbody>
            </Table>            
        </Container>
        </>
    )
}





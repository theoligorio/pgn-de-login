import React, {useContext} from 'react';

import { Context } from '../../../Context/AuthContext'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { SignOut } from "phosphor-react";

export const NavBar = () =>{

    const { authenticated, handleLogout } = useContext(Context)

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">Categorias</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/usuarios">Usuários</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Button variant="outline-warning" onClick={handleLogout}>
                        Sair
                        <SignOut size={32} weight="light" />
                    </Button>
                </Form>                
                </Container>
            </Navbar>  
        </>
    )
}
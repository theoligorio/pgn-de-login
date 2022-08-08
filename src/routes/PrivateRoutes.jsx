import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../components/Login/Login';
import { Dashboard } from '../page/Dashboard';
import { ListaUsuarios } from '../page/Usuarios/ListaUsuarios';
import { UsuariosForm } from '../page/UsuariosForm/UsuariosForm';
function CustomRoute({ isPrivate, ...rest}){

    const { authenticated } = useContext(Context);
    if( isPrivate && !authenticated){
        return <Redirect to="/" />
    }
    return <Route { ...rest } />

}

export default function PrivateRoute(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute isPrivate path="/usuarios/novo" component={UsuariosForm} />
            <CustomRoute path="/usuarios/editar/:id" component={UsuariosForm} />
            <CustomRoute isPrivate path="/usuarios" component={ListaUsuarios} />
        </Switch>
    )
}
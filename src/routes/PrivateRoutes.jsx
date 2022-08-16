import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Context } from '../Context/AuthContext';
import { ListCategories } from '../page/ListCategories/ListCategories';
import { CategoriesForm } from '../page/CategoriesForm/CategoriesForm';
import { Categories } from '../page/Categories/Categories';

function CustomRoute({ isPrivate, ...rest}){
    const { authenticated } = useContext(Context);
    if (isPrivate && !authenticated){
        return <Redirect to="/"  />
    }
    return <Route { ...rest } />
}

export default function PrivateRoute(){
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/categorias" component={Categories} />
            <CustomRoute isPrivate path="/listacategorias" component={ListCategories} />
            <CustomRoute isPrivate path="/categories/create" component={CategoriesForm} />
            <CustomRoute isPrivate path="/categories/update/:id" component={CategoriesForm} />
        </Switch>
    )
};
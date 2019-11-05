import React,{Component} from "react";

import MainScreen from "./pages/Main";
import LoginScreen from "./pages/Login";
import CadastroScreen from "./pages/Cadastro";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

const Authstack = createStackNavigator(
    {
        Sign :{
            screen : LoginScreen,
        },
        Main:{
            screen : MainScreen,
        },
        Jefferson:{
            screen : CadastroScreen,
        }
    },
    {
        initialRouteName : "Sign",
    }   
);

export default createAppContainer(Authstack)
import React,{Component} from "react";
import {Text,View, TextInput, TouchableOpacity,  AsyncStorage} from "react-native";

class Main extends Component{
    constructor(){
        super();
        this.state = {
            email: null,
            senha : null,
        }
    }


    static navigationOptions ={
        header : null,
    }

    _realizarLogin = async() =>{
        await fetch("http://192.168.4.221:5000/api/login",
        {
            method : "POST",
            headers:{
                "Content-type" : "application/json",
                "Accept" : "application/json",
            },
            body: JSON.stringify({
                email : this.state.email,
                senha : this.state.senha,
            })
        })
        .then(resposta => resposta.json())
        .then (data => {
            this._irParaHome(data.token);
            console.warn(data)
        })
        .catch(error => console.warn(error))
    }

    _irParaHome = async(tokenRecebido) =>{
        console.warn("tokenRecebido : " + tokenRecebido)
        if (tokenRecebido != null){
            try {
                await AsyncStorage.setItem("@roman:token",tokenRecebido);
                this.props.navigation.navigate("Main");
            } catch (error) {
                console.warn("catch : " + error)
            }
        }
    }

    render(){
        return(
            <View>
                <TextInput placeholder="Email" onChangeText={email => this.setState({email})} />
                <TextInput placeholder="Senha" onChangeText={senha => this.setState({senha})} />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Main;
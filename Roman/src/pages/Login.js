import React,{Component} from "react";
import {Text,View, TextInput, TouchableOpacity,  AsyncStorage, StyleSheet} from "react-native";

class Main extends Component{
    constructor(){
        super();
        this.state = {
            email: "erik@email.com",
            senha : '123456',
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
            // console.warn(data)
        })
        .catch(error => console.warn(error))
    }

    _irParaHome = async(tokenRecebido) =>{
        // console.warn("tokenRecebido : " + tokenRecebido)
        if (tokenRecebido != null){
            try {
                console.warn(tokenRecebido)
                await AsyncStorage.setItem("@roman:token",tokenRecebido);
                this.props.navigation.navigate("Main");
            } catch (error) {
                console.warn("catch : " + error)
            }
        }
    }

    render(){
        return(
            <View style={styles.FundoTela}>
                <TextInput style={styles.LoginUsuario} placeholder="Email" onChangeText={email => this.setState({email})} />
                <TextInput style={styles.LoginUsuario} placeholder="Senha" onChangeText={senha => this.setState({senha})} />
                <TouchableOpacity onPress={this._realizarLogin}>
                    <Text style={styles.BotaoLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        FundoTela : {
            backgroundColor : "#7a297a",
            minHeight : 1000,
            padding : 120,
            paddingTop : 215,            
        },
        LoginUsuario : {
            color : "#fff",
            fontSize : 20,
        },
        BotaoLogin : {
            color : "#fff",
            fontSize : 25,
            textAlign : "center",
            padding : 25,
            borderWidth : 1.4,
            borderColor : "#fff",
            borderRadius : 0.5,
            marginVertical : 5,
            padding : 6,
            paddingHorizontal : 10,
        }
    })
export default Main;
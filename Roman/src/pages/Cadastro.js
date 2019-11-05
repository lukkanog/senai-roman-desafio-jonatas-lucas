import React,{Component} from "react";
import {Text,View,TextInput,TouchableOpacity,StyleSheet,Picker, AsyncStorage} from "react-native";


class Cadastro extends Component{
    constructor(){
        super();
        this.state={
            temas : [],

            nome: null,
            idTema : null,
        }
    }
    
    componentDidMount(){
        this._carregarTemas();
    }

    _carregarTemas = async() =>{
        try {
            let token = await AsyncStorage.getItem("@roman:token");

            if (token !== null){
                fetch("http://192.168.4.221:5000/api/projetos",
                {
                    headers:{
                        "Authorization" : "Bearer " + token,
                    },
                })
                .then(resposta => resposta.json())
                .then(dados => {
                    this.setState({temas : dados});
                })
                .catch(error => console.warn(error))
            }
        } catch (error) {
            console.warn("catch : " + error);
        }
    }

    _cadastrarProjeto = async() =>{
        try {
            let token = await AsyncStorage.getItem("@roman:token");

            if (token !== null){
                fetch("http://192.168.4.221:5000/api/projetos",{
                    method: "POST",
                    headers:{
                        "Authorization" : "Bearer " + token,
                        "Content-type" : "application/json",
                        "Accept" : "application/json",
                    },
                    body:JSON.stringify({
                        nome : this.state.nome,
                        idTema : this.state.idTema,
                    })
                })
            }

        } catch (error) {
            
        }
    }



    
    render(){
        return(
            <View>
                <Text>Novo Projeto</Text>
                <TextInput placeholder="Nome" onChangeText={nome => this.setState({nome})}/>

                <Picker onValueChange={idTema => this.setState({idTema})}>
                   {this.state.temas.map(item =>{
                       return(
                           <Picker.item value={item.idTema} label={item.nome}/>
                       )
                   })} 
                </Picker>

                <TouchableOpacity onPress={this._cadastrarProjeto}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Cadastro;
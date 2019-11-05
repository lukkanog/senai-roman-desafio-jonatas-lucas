import React,{Component} from "react";
import {Text, AsyncStorage, FlatList,View, StyleSheet, TouchableOpacity} from "react-native";
// import {  } from "react-native-gesture-handler";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            projetos : null,
        }
    }

    componentDidMount(){
        this._carregarProjetos();
    }

    _carregarProjetos = async() =>{
        try {
            
            let token = await AsyncStorage.getItem("@roman:token");
            console.warn(token)
            
            if (token !== null){
   
                fetch("http://192.168.4.221:5000/api/projetos",
                {
                    headers: {
                        "Authorization" : "Bearer " + token,
                    }
                })
                .then(resposta => resposta.json())
                .then(data => {
                    this.setState({projetos : data});
                })
                .catch(error => console.warn(error))
            }

        } catch (error) {
            console.warn("catch " + error)
        }

    }

    _irParaCadastro = async() =>{
        await this.props.navigation.navigate("Jefferson");
    }

    render() {
        return (
            <View style={styles.FundoTela}>
                
                <Text style={styles.Titulos}>Projetos</Text>
                <TouchableOpacity onPress={this._irParaCadastro}>
                    <Text>Cadastrar novo projeto</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.projetos}
                    keyExtractor={item => item.idProjeto.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.IdTabela}>{item.idProjeto}</Text>
                            <Text style={styles.InfoTabela}>{item.nome}</Text>
                            <Text style={styles.InfoTabela}>{item.idTemaNavigation.nome}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        FundoTela : {
            backgroundColor : "#7a297a",
            minHeight : 1000 
        },
        Titulos : {
            color : "#ffffff",
            textAlign : "center",
            fontSize : 33,
            padding : 25,
        },
        InfoTabela : {
            fontSize : 20,
            color : "#000",
            textAlign : "center",
        },
        IdTabela : {
            fontSize : 20,
            color : "#fff",
            textAlign : "center",
            
        },
        Botao : {
            backgroundColor : "#F2a",
        }

    })
export default Main;

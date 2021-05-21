import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Modal,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';

const LoveCalculator = () => {
    const [firstName, setFirstName] = React.useState('');
    const [secondName, setSecondName] = React.useState('');
    const fadeAnim = React.useRef(new Animated.Value(1)).current
    const [modalVisible, setModalVisible] = React.useState(false);
    const [percentage, setPercentage] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([  
                Animated.timing(
                    fadeAnim,
                    {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: true
                    }
                ),
                Animated.timing(
                    fadeAnim,
                    {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                    }
                ),
                Animated.timing(
                    fadeAnim,
                    {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: true
                    }
                ),
                Animated.timing(
                    fadeAnim,
                    {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                    }
            )])
        ).start();
      }, [])

    const getResult = async() => {
        setModalVisible(true)
        axios.request( {
            method: 'GET',
            url: 'https://love-calculator.p.rapidapi.com/getPercentage',
            params: {fname: `${firstName}`, sname: `${secondName}`},
            headers: {
              'x-rapidapi-key': '2154ba2729msha691362598cbf81p1f1499jsn67975545b0ca',
              'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
            }
          }).then(function (response) {
            console.log(response.data);
            console.log(parseInt(response.data.percentage))
            setPercentage(response.data.percentage)
            const result = parseInt(response.data.percentage)
            if(result < 50){
                setDescription("Que pena!\nMelhor procurar alguém melhor")
            }
            else if(result < 70){
                setDescription("Muito bom!\nVejo que vocês tem uma conexão")
            }
            else if(result < 90){
                setDescription("Legal!\nVocê encontrou uma pessoa muito especial, cuide muito bem dela")
            }
            else if(result >= 90){
                setDescription("Parabéns!\nVocê encontrou sua alma gêmea, vocês estão destinados a ser felizes para sempre")
            }
            
        }).catch(function (error) {
            console.error(error);
        });
        
    }


    return(
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={styles.modalCentered}>
                    <View style={styles.modalContainer}>
                        {percentage !== null ?
                        <View style={{alignItems:'center'}}>
                        <Text style={{...styles.title, color:'#000'}}>Resultado</Text>
                        <Text style={styles.resultText}>{percentage}%</Text>
                        <Text style={{...styles.resultText, fontSize: 20, textAlign: 'center',paddingHorizontal: 5}}>{description}</Text>
                    </View>
                    :
                    <View style={{alignItems:'center', justifyContent: 'center', height:'65%'}}>
                        <ActivityIndicator size='large' color='#700038'/>
                    </View>
                        }
                        

                        <TouchableOpacity style={styles.modalButtonContainer}
                            onPress={() => {
                                setPercentage(null)
                                setModalVisible(false)
                            }}>
                            <Text style={styles.modalButtonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Modal>
            <Text style={styles.title}>Calculadora do Amor Verdadeiro</Text>
            <View style={{width:"100%", height: 200, alignItems: 'center', justifyContent: 'center'}}>
                <Animated.Image source={require('../../images/heart.png')} style={{...styles.heartImage, transform:[{scale:fadeAnim}]}}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    placeholder="Primeiro nome"
                    placeholderTextColor="#ccc"
                    style={styles.nameInput}/>
                <TextInput
                    value={secondName}
                    onChangeText={(text) => setSecondName(text)}
                    placeholder="Segundo nome"
                    placeholderTextColor="#ccc"
                    style={styles.nameInput}/>

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => getResult()}
                    disabled={firstName === '' ||  secondName === ''}>
                    <Text style={styles.buttonText}>Obter Resultado</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center'
    },
    title:{
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#fff',
        fontSize: 20,
        marginTop: 20
    },
    inputContainer:{
        width: '100%',
        marginTop: 100,
        alignItems: 'center'
    },
    nameInput:{
        width:'60%',
        height: 50,
        borderColor: "#700038",
        borderWidth:2,
        borderRadius: 15,
        fontFamily: 'sans-serif',
        fontSize:16,
        textAlign: 'center',
        color: '#fff',
        marginVertical: 10
    },
    buttonContainer:{
        width:200,
        height: 150,
        backgroundColor: '#700038',
        borderColor: '#700038',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginVertical: 50

    },
    buttonText:{
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    heartImage:{
        marginTop:80,
        width:200,
        height: 200
    },
    modalCentered:{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    modalContainer:{
        width:'70%', 
        height:'60%', 
        backgroundColor:'#fff',
        alignItems: 'center',
        borderRadius:30,
        justifyContent: 'space-between'
    },
    modalButtonContainer:{
        width:200,
        height: 50,
        backgroundColor: '#700038',
        borderColor: '#700038',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginVertical: 50
    },
    modalButtonText:{
        fontFamily:'sans-serif',
        fontSize: 16,
        color: '#fff'
    },
    resultText:{
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize:50,
        marginVertical: 15
    }
})

export default LoveCalculator;
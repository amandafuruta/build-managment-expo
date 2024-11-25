import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundPurple:{
        backgroundColor: "#C5ADC5",
        flex: 1,
    },

    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    img:{
        borderRadius: 100,
        width:150 ,
        height:150,
        marginBottom: 50,
    },

    card:{
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        width: 300,
    },

    input:{
        borderColor: "#686666",
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        marginBottom: 15,
        padding: 10,
    },

    button:{
        borderRadius: 5,
        backgroundColor: "#C5ADC5",
        padding: 8,
        marginBottom: 5,
    },

    button_text:{
        color: "#000",
        fontSize: 15,
        textAlign: "center",
    },
})

export default styles;
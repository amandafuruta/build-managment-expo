import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundPurple:{
        backgroundColor: "#77338d",
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
        backgroundColor: "#710096",
        padding: 8,
        marginBottom: 5,
    },

    button_text:{
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
    },

    
    register_text:{
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },

    registerbox:{
        justifyContent: "center",
        position: "absolute",
        top: 365,
        backgroundColor:"#d8ecea",
        padding:  21,
        borderRadius: 5,
        borderColor: "#710096",
        borderWidth: 2,
        width: 280,
    }
})

export default styles;
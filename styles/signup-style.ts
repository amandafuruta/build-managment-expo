import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundBlue:{
        backgroundColor: "#B2B5E0",
        flex: 1,
    },
  
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
  
    card:{
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        width: 300,
    },
  
    input:{
        display: "flex",
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems: "center",
        borderColor: "#686666",
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 10,
    },

    password_input:{
        maxWidth: 200,
        width: '100%',
        height: 50,
    },
  
    button:{
        borderRadius: 5,
        backgroundColor: "#B2B5E0",
        padding: 8,
        marginBottom: 40,
    },
  
    button_text:{
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    },
  
    register_text:{
        color: 'white', 
        fontSize: 35, 
        fontWeight: 'bold', 
        marginBottom:20
    },
});

export default styles
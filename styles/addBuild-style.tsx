import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box_title:{
      backgroundColor: "#710096",
      paddingBottom: 10,
  },

  title:{
      fontSize: 40,
      color: '#fff',
      textAlign: 'center',
  },

  background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 300,
  },

  content:{
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: "#ebebeb"
  },

  card:{
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 20,
      borderColor: "#a7adaf",
      borderWidth: 1,
  },

  details:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
  },

  input:{
      borderRadius: 5,
      padding: 5,
      borderColor: "#a7adaf",
      borderWidth: 1,
      width: 200,
  },

  buttons:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 20,
  },

  btn:{
      backgroundColor: "#490061",
      borderRadius: 5,
      borderColor: "#490061",
      width: 100,
      paddingVertical: 5,
  },

  btn_text:{
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
  }
})

export default styles
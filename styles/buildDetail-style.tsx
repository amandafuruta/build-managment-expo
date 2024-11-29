import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#417abb",
    paddingVertical: 20,
    paddingHorizontal:20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  title:{
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 10,
    marginLeft: 5,
  },

  content:{
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  input:{
    borderRadius: 5,
    padding: 5,
    borderColor: "#a7adaf",
    borderWidth: 1,
    width: 200,
  },

  card:{
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
  },

  details:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  options:{
    backgroundColor: "#fff",
    boxShadow:'1px 1px 5px #a09f9f',
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 5,
  },

  options_container:{
    width: '100%',
    display: 'flex', 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent:'space-between',
  },

  option_text:{
    color:"#6d0091", 
    fontWeight:'bold', 
    fontSize:18,
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
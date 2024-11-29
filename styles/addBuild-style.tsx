import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box_title:{
    backgroundColor: "#417abb",
    paddingVertical: 40,
    position: 'relative',
    marginBottom: 20,
  },

  subtitle_box: {
    position:'absolute',
    bottom: -30,
    backgroundColor: '#fff',
    height: 70,
    width: 300,
    borderRadius: 30,
    left: '50%',
    transform: [{ translateX: -150 }],
    boxShadow: '1px 1px 10px #0000005e',
    padding: 20,
    zIndex:2,
  },

  subtitle_text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#417abb',
    textAlign: 'center',
  },

  content:{
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  card:{
    marginTop: 20,
    borderRadius: 5,
    padding: 20,
    boxShadow: '1px 1px 5px #0000006c',
    display: 'flex',
    alignItems: 'center',
  },

  details:{
    display: 'flex',
    flexDirection: 'column',      
    marginBottom: 20,
  },

  label:{
    fontWeight:'400', 
    fontSize: 18, 
    marginRight: 10,
    color: '#272727',
    marginBottom: 8,
  },

  input:{
    borderRadius: 5,
    padding: 8,
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
    backgroundColor: "#417abb",
    borderRadius: 5,
    width: 100,
    paddingVertical: 5,
  },

  btn_text:{
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  
})

export default styles
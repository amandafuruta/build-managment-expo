import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#490061",
    paddingVertical: 20,
    paddingHorizontal:20,
    display: 'flex',
    flexDirection: 'column',
    height: '30%',
  },

  title:{
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 10,
    marginLeft: 5,
    marginTop: 5, 
  },

  content:{
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    top: '10%',
  },

  details:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  card:{
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 40,
    boxShadow: '1px 1px 10px #0000005e',
  },

  input:{
    borderRadius: 5,
    padding: 5,
    borderColor: "#a7adaf",
    borderWidth: 1,
    width: 170,
  },

  label:{
    fontWeight:'500', 
    fontSize: 18, 
    marginRight: 10,
    textAlign:'right',
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

export default styles;
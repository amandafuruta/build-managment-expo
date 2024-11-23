import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#490061",
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

  edit_text:{
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 20,
  },  

  input:{
    borderRadius: 5,
    padding: 5,
    borderColor: "#a7adaf",
    borderWidth: 1,
    width: 200,
  },

  img:{
    width: '100%',
    height: 200,
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
    marginBottom: 20,
  },

  total:{
    backgroundColor: "#fff",
    borderColor:"#98ccd3",
    borderWidth: 2,
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
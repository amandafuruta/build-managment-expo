import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#417abb",
    paddingVertical: 20,
    paddingHorizontal:20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 10,
  },

  content:{
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
  },

  img:{
    width: 130,
    height: 130,
    borderRadius:20,
    marginBottom: 20,
  },

  input:{
    borderRadius: 5,
    padding: 5,
    borderColor: "#a7adaf",
    borderWidth: 1,
    width: 170,
  },

  buttons:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
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
  }
})

export default styles
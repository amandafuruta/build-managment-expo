import { StyleSheet } from 'react-native';

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
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
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
    borderColor: "#a7adaf",
    borderWidth: 1,
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
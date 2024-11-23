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
  },

  mydash:{
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#439aa5",
    paddingVertical: 15,
    textAlign: "center",
    marginBottom: 30,
    backgroundColor:"#439aa5",
    color: "#fff",
    fontSize: 20,
  },

  card:{
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    borderColor: "#a7adaf",
    borderWidth: 1,
  },

  infos:{
    display: 'flex',
    flexDirection: 'row',
  },

  add_text:{
    fontSize: 18,
    textAlign: 'right',
    marginRight: 10,
  },  
})

export default styles;
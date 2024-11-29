import { StyleSheet } from 'react-native';

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

  dashboard:{
    flex: 1,
    flexDirection: 'column',
  },

  btn:{
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    height: 70,
    width: '100%',
    marginBottom: 30,
    backgroundColor: "#fff",
    marginRight: 10,
    boxShadow:'1px 1px 5px #a09f9f',
  },

  btn_title:{
    color: "#417abb",
    fontSize: 20,
    paddingVertical: 5,  
    textAlign: 'center',  
  },
})

export default styles;
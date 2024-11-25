import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#439aa5",
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

  dashboard:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },

  btn:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 100,
    width: '45%',
    marginBottom: 30,
    backgroundColor: "#ad85ad",
    marginRight: 10,
  },

  btn_title:{
    color: "#fff",
    fontSize: 25,
    paddingVertical: 5,  
    textAlign: 'center',  
  },
})

export default styles;
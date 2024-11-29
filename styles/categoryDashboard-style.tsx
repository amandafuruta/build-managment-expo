import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container:{
  display:"flex", 
  flexDirection:"column",   
 },

  row:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1, 
    borderColor: '#cfcece',
    paddingHorizontal: 10,
  },

  field:{
    width: "50%",
    fontSize: 20,
  },

  white:{
    color: "#9e639e",
    borderWidth: 1,
    borderColor: "#9e639e",
  }
})

export default styles;
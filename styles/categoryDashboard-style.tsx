import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container:{
  display:"flex", 
  flexDirection:"column",  
  height: 353, 
  borderWidth: 1, 
  borderColor: '#cfcece',
  marginBottom: 50,
 },

  row:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  field:{
    width: "50%",
    fontSize: 20,
  },
})

export default styles;
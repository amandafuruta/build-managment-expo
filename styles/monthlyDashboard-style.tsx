import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    display:"flex", 
    flexDirection:"column",  
    height: 'auto', 
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
    backgroundColor: '#fff',
  },

  field:{
    width: "50%",
    fontSize: 20,
    paddingHorizontal: 10,
  },

  tableHeader:{    
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#e2e1e1',
  }
})

export default styles;
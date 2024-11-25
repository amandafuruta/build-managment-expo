import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#9e639e",
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

  row:{
    display: 'flex',
    flexDirection: 'row',
  },

  purple:{
    backgroundColor:"#9e639e",
    color: "#fff",  
    fontWeight: "bold",  
    borderBottomColor: "#fff",
    borderBottomWidth: 1,    
  },

  field:{
    width: "50%",
    paddingVertical:20,
    textAlign: "center",
    fontSize: 20,
  },

  white:{
    color: "#9e639e",
    borderWidth: 1,
    borderColor: "#9e639e",
  }
})

export default styles;
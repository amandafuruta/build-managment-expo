import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  box_title:{
    position: 'relative',
    backgroundColor: "#417abb",
    paddingVertical: 20,
    height: 100,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },

  content:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center',
  },

  title:{
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },

  pressable:{
    padding: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
  },

  text:{
    fontSize: 20,
    color: '#000',
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 150,
  },

  subtitle_box: {
    position:'absolute',
    bottom: -30,
    backgroundColor: '#fff',
    height: 70,
    width: 300,
    borderRadius: 30,
    left: '50%',
    transform: [{ translateX: -150 }],
    boxShadow: '1px 1px 10px #0000005e',
    padding: 20,
  },

  subtitle_text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#417abb',
    textAlign: 'center',
  }
})

export default styles
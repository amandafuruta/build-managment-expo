import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  box_title:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#710096",
    paddingVertical: 20,
  },

  title:{
      fontSize: 30,
      color: '#fff',
      marginLeft: 10,
  },

  pressable:{
      padding: 25,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      height: 300,
    },
})

export default styles
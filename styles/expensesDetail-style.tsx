import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#490061",
    paddingVertical: 20,
    paddingHorizontal:20,
    position: 'relative',
  },
  
  subtitle_box: {
    position:'absolute',
    bottom: -40,
    backgroundColor: '#fff',
    height: 70,
    width: 300,
    borderRadius: 30,
    left: '50%',
    transform: [{ translateX: -125 }],
    boxShadow: '1px 1px 10px #0000005e',
    padding: 20,
  },

  subtitle_text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#490061',
    textAlign: 'center',
  },

  card:{
    backgroundColor: "#fff",
    boxShadow:'1px 1px 5px #a09f9f',
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 5,
    borderLeftColor: "#490061",
    borderLeftWidth: 10,
    position: 'relative',
  },

  moreBtn:{
    position: 'absolute',
    right: 0,
    top: 10,
  },

  label:{
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#490061',
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
  
  modal:{
    position:'absolute',
    zIndex: 2,
    top: 40,
    right: 10,
    boxShadow:'1px 1px 5px #a09f9f',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#fff',
  },
})

export default styles;
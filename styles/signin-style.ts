import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	body:{
		flex: 1,
		backgroundColor: "#417abb",
	},

	img_box:{
		height: '50%',
		display:'flex', 
		alignItems: "center",
		justifyContent:'center', 
		position: 'relative',
		width:'100%',
		zIndex: 2,
	},

	img:{
		borderRadius: 100,
		width:200 ,
		height:200,
		boxShadow: '1px 0px 10px #000'
	},

	img_keyboard:{
		borderRadius: 100,
		width:150 ,
		height:150,
		boxShadow: '1px 0px 10px #000'
	},

	card:{
		height: '70%',
		position: 'absolute',
		backgroundColor: '#fff',
		bottom: 0,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		padding: 20,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},

	input:{
		borderColor: "#686666",
		width: '100%',
		borderRadius: 5,
		borderWidth: 1,
		height: 50,
		padding: 10,
		maxWidth: 300,
		marginBottom: 20
	},

	button:{
		borderRadius: 10,
		backgroundColor: "#417abb",
		marginTop: 20,
		marginBottom: 50,
		width: 100,
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	button_text:{
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
	},

	alignment:{
		display: 'flex',
		width: '100%',
		alignItems: 'center'
	}
})

export default styles;
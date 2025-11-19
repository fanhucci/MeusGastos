import { StyleSheet } from "react-native";
import { cores } from "./referencias/colors";
import { spacing } from "./referencias/spacing";
import { fontSizes } from "./referencias/fonts";


//container padrao envolvendo as telas
export const baseScreenContainer = StyleSheet.create({

  screenContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: cores.secondary,

  },

  containerBase:{
    width:'80%',
  }

});


//padrao botaoSubmit
export const submitButtonStyle = StyleSheet.create({
   
    button:{
        margin:spacing.sm,
        maxWidth:300,
        paddingVertical:spacing.sm,
        paddingHorizontal:spacing.md,
        borderRadius: 6,
        alignSelf:'center',
        alignItems:'center',
    },  

    buttonPressed:{
    opacity: 0.7
    },

    text:{
        fontWeight: 'bold',
        fontSize: fontSizes.lg,
        justifyContent:'center',
        alignItems:'center'
    }
    
});

//padrao filterButton

export const filterButtonStyle = StyleSheet.create({
  text:{
    color:cores.text,
    textAlign:'center',
  },

  button:{
    alignItems:'center',
    justifyContent:'center',
    
    borderRadius:20,
    width:80,
    height:34,
    margin:8,
    opacity:0.7
  },

  buttonPressed:{
    opacity:1,
    backgroundColor:cores.primary,
  }
})

//padrao inputText
export const userInputTextStyle = StyleSheet.create({
  text:{
    width:'100%',
    fontSize:fontSizes.xl
  },

  input: {
    width: "100%",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    fontSize: fontSizes.lg,
    borderBottomWidth: 3,
  },

  inputFocused: {
    borderBottomWidth: 3,
  },
});

//padrao infoCard
export const infoCardStyle = StyleSheet.create({
  button: {
    backgroundColor: cores.tertiary,
    padding: 10,
    borderColor: cores.textSecondary,
    borderRadius:20,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    width: "90%",
    opacity:0.5
  },

  buttonPressed:{
    opacity:0.7
  },

  data: {
    fontSize: 16,
    color: cores.textSecondary,
    opacity: 0.7,
    marginBottom:2
  },

  titulo: {
    fontSize: 22,
    color: cores.textSecondary,
    fontWeight:"bold",
  },

  texto: {
    fontSize: 18,
    color: cores.textSecondary,
    opacity: 0.8,
    fontWeight:"bold"
  },
});

export const graphBarStyle = StyleSheet.create({
  container:{
    marginVertical:10,
    width:'100%',
    height:7,
    backgroundColor:cores.tertiaryDark,
    borderTopEndRadius:20,
    borderBottomEndRadius:20,
  },

  bar:{
    flex:1,
    borderTopEndRadius:20,
    borderBottomEndRadius:20,
  },

  text:{
    fontSize:20,
    fontWeight:"bold",
    color:cores.textSecondaryLight,
    marginLeft:20
  }
})
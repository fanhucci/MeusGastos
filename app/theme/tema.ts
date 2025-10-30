import { StyleSheet } from "react-native";
import { cores } from "./referencias/colors";
import { spacing } from "./referencias/spacing";
import { fontSizes } from "./referencias/fonts";


//container padrao envolvendo as telas
export const baseScreenContainer = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.background,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  containerBase:{
    width:'80%'
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
    borderBottomWidth: 0,
  },

  inputFocused: {
    borderBottomWidth: 3,
  },
});

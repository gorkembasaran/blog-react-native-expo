import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

export default function BlogPostForm({onSubmit, initialValues, isEditable}) {
    const [title, setTitle] = useState(initialValues ? initialValues.title : '')
    const [content, setContent] = useState(initialValues ? initialValues.content : '')
  return (
    <View style={styles.main}>
      <Text style={styles.label}>Başlığı giriniz:</Text>
      <TextInput style={styles.input}
      value={title}
      onChangeText={(text=>setTitle(text))} />
      <Text style={styles.label}>İçeriği giriniz:</Text>
      <TextInput style={styles.input}
      value={content}
      onChangeText={(text=>setContent(text))} />
        <TouchableOpacity style={styles.buttonMain} onPress={()=>onSubmit(title,content)}>
            <View style={styles.buttonView}>
                {isEditable ? <Text style={styles.buttonText}>
                    Güncelle
                </Text> : <Text style={styles.buttonText}>
                    Kaydet
                </Text> }
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
        marginTop : 10,

    },
    label : {
        fontSize : 20,
        marginLeft : 10,
    },
    input : {
        borderWidth : 1,
        margin : 10,
        borderRadius : 20,
        padding : 5,
        fontSize : 18,
        marginBottom : 15,
    },
    buttonMain : {
        padding : 30,
    },
    buttonView : {
        backgroundColor : 'green',
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 20,
    },
    buttonText : {
        fontSize : 20,
        color : 'white',
    }
})
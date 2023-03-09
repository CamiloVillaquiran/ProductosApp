import React, { useContext, useEffect } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';

import { loginStyle } from '../theme/loginTheme';
import { AuthContext } from '../context/AuthContext';

import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useFrom';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ( { navigation }: Props ) => {

  const { signUp, errorMessage, removeError } = useContext( AuthContext )

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0 ) return;

    Alert.alert('Registro incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]
      );
  
}, [errorMessage])

  const onRegister = () => {
    console.log({email, password, name});
    Keyboard.dismiss();
    signUp({
      nombre: name,
      correo: email,
      password
    })
  }

  return (
    <>

        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: '#5856D6' }}
          behavior={ (Platform.OS === 'ios') ? 'padding': 'height'}
        >

          <View style={ loginStyle.formContainer}>

            {/* Keyboard avoid view */}
            <WhiteLogo />

            <Text style={loginStyle.title }> Registro</Text>

            <Text style={loginStyle.label }> Nombre: </Text>
            <TextInput 
              placeholder='Ingrese su nombre:'
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              style={[
                loginStyle.inputField,
                ( Platform.OS === 'ios') && loginStyle.inputFieldIOS
              ]}
              selectionColor="white"

              onChangeText={ (value) => onChange(value, 'name')}
              value={ name }
              onSubmitEditing= { onRegister }
              

              autoCapitalize='words'
              autoCorrect={ false }
            />

            <Text style={loginStyle.label }> Email: </Text>
            <TextInput 
              placeholder='Ingrese su email:'
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType='email-address'
              underlineColorAndroid="white"
              style={[
                loginStyle.inputField,
                ( Platform.OS === 'ios') && loginStyle.inputFieldIOS
              ]}
              selectionColor="white"

              onChangeText={ (value) => onChange(value, 'email')}
              value={ email }
              onSubmitEditing= { onRegister }
              

              autoCapitalize='none'
              autoCorrect={ false }
            />

            <Text style={loginStyle.label }> Contraseña: </Text>
            <TextInput 
              placeholder='*******'
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              secureTextEntry={true}
              style={[
                loginStyle.inputField,
                ( Platform.OS === 'ios') && loginStyle.inputFieldIOS
              ]}
              selectionColor="white"

              onChangeText={ (value) => onChange(value, 'password')}
              value={ password }
              onSubmitEditing= { onRegister }

              //TODO: onchange, value

              autoCapitalize='none'
              autoCorrect={ false }
            />

            {/* Boton login */}
            <View style={ loginStyle.buttonContainer}>
              <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ loginStyle.button}
                onPress={ onRegister }
              >
                <Text style={ loginStyle.buttonText}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>

            {/* Crear una nueva cuenta */}
            <TouchableOpacity
              onPress={ () => navigation.replace('LoginScreen')}
              activeOpacity={ 0.8 }
              style={ loginStyle.buttonReturn }
            >
              <Text style={ loginStyle.buttonText }>Regresar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </>
  )
}
import React, { useContext, useEffect } from 'react'
import { TouchableOpacity, Alert, Text, View, TextInput, Platform, Keyboard, KeyboardAvoidingView } from 'react-native'

import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyle } from '../theme/loginTheme'
import { useForm } from '../hooks/useFrom';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext( AuthContext );

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
      if (errorMessage.length === 0 ) return;

      Alert.alert('Login incorrecto', errorMessage, [{
              text: 'Ok',
              onPress: removeError
          }]
        );
    
  }, [errorMessage])
  

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({ correo: email, password });
  }
  return (
    <>
        {/* Background */}
        <Background />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={ (Platform.OS === 'ios') ? 'padding': 'height'}
        >

          <View style={ loginStyle.formContainer}>

            {/* Keyboard avoid view */}
            <WhiteLogo />

            <Text style={loginStyle.title }> Login</Text>

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
              onSubmitEditing= { onLogin }
              

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
              onSubmitEditing= { onLogin }

              //TODO: onchange, value

              autoCapitalize='none'
              autoCorrect={ false }
            />

            {/* Boton login */}
            <View style={ loginStyle.buttonContainer}>
              <TouchableOpacity
                activeOpacity={ 0.8 }
                style={ loginStyle.button}
                onPress={ onLogin }
              >
                <Text style={ loginStyle.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Crear una nueva cuenta */}
            <View style={ loginStyle.newUserContainer}>
              <TouchableOpacity 
                activeOpacity={ 0.8 }
                onPress={ () => navigation.replace('RegisterScreen')}
              >
                <Text style={ loginStyle.buttonText }>Nueva cuenta </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
    </>
  )
}

import React, { useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet, Button, Image, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import  { Picker }  from  '@react-native-picker/picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useFrom';
import { ProductsContext } from '../context/ProductsContext';
import {  } from 'react-native/Libraries/Image/Image';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};

export const ProductScreen = ({ navigation, route }: Props) => {

  const { id = '', name = ''} = route.params; 

  const { categories } = useCategories();
  const { loadProductsById, addProduct, updateProduct } = useContext( ProductsContext )

  const { _id, categoriaId, nombre, img, form, onChange, setFromValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  });


  useEffect(() => {
    navigation.setOptions({
      title: ( nombre ) ? name : 'Nombre del Producto'
    });
  }, [nombre])

  useEffect(() => {
    loadProduct();
  }, [])
  


  const loadProduct = async() => {
    if ( id.length === 0 ) return;
    const product = await loadProductsById( id );
    setFromValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    })
    /* setFromValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    }) */
  }

  const saveOrUpdate = async() => {
    if( id.length > 0 ) {
      updateProduct(categoriaId, nombre, id);
    }else {
      const temCategoriaId = categoriaId || categories[0]._id;
      const newPorduct = await addProduct( temCategoriaId, nombre );
      onChange( newPorduct._id, '_id' );
    }
  }
  

  return (
    <View style={ styles.container }>
        <ScrollView>

          <Text style={ styles.label }>Nombre del producto</Text>
          <TextInput 
            style={ styles.textInput }
            placeholder='Producto'
            value={ nombre }
            onChangeText={ ( value ) => onChange( value, 'nombre') } 
          />

          {/* Picker / Selector */}
          <Text style={ styles.label }>Categoria</Text>
          <Picker
            selectedValue={ categoriaId }
            onValueChange={( itemValue ) =>
              onChange( itemValue, 'categoriaId' )
            }
          >
            {!categoriaId && name !== ''
                        ? <View style={{ 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center'
                                }}
                            >
                                <ActivityIndicator
                                    size={40}
                                    color={'black'}
                                />
                            </View>
                        :
                        categories.map(item => (
                            <Picker.Item label={item.nombre} value={item._id} key={item._id} />
                        ))
                        }
            {/* {
              categories.map( c => (
                <Picker.Item 
                  label={ c.nombre} 
                  value={ c._id } 
                  key={ c._id }
                  />
              ))
            } */}
          </Picker>

          <Button
            title="Guardar"
            //TODO: por hacer
            onPress={ saveOrUpdate }
            color="#5856D6"
          />

          {
            ( _id.length > 0 ) && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <Button
                  title="Camara"
                  //TODO: por hacer
                onPress={ () => { } }
                color="#5856D6"
                />

                <View style={{ width: 10 }}></View>

                <Button
                  title="Galeria"
                  //TODO: por hacer
                onPress={ () => { } }
                color="#5856D6"
                />
              </View>
            )
          }

          {
            ( img.length > 0 ) && (
              <Image 
                source={{uri: img }}
                style={{
                  width: '100%',
                  height: 300,
                  marginTop: 20
                }}
              />
            )
          }

          {/* TODO: Mostrar imagen temporal */}
        

        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20
  },
  label: {
    fontSize: 18
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.6)',
    height: 45,
    marginTop: 5,
    marginBottom: 15
  }
})
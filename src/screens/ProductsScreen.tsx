import React, { useContext, useEffect } from 'react'
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductNavigator';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{};


export const ProductsScreen = ({ navigation }: Props) => {

  const { products, loadProducts } = useContext( ProductsContext )


  useEffect(() => {
    
    navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            activeOpacity={ 0.5 }
            style={{marginRight: 10}}
            onPress={ () => navigation.navigate('ProductScreen', {}) }
          >
            <Text>Agregar</Text>
          </TouchableOpacity>
        )
    })

  }, [])
  
  // TODO: pull to refresh
  
  return (
    <View style={{
      flex: 1, 
      marginHorizontal: 10 
    }}>
        <FlatList 
          data={ products }
          keyExtractor={ (p) => p._id }
          renderItem={ ({item}) => (
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => navigation.navigate('ProductScreen',{
                id: item._id,
                name: item.nombre
                })
              } 
            >
              <Text style={ styles.productName }>{ item.nombre}</Text>
            </TouchableOpacity>
          )}

          ItemSeparatorComponent={ () => (
            <View style={ styles.itemSeparator }/>
          )}
        
        />
    </View>
  )
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical:5,
    borderBottomColor: 'rgba(0,0,0,0,1)'

  }

})

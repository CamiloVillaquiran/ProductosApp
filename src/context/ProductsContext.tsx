import React, { createContext, useState, useEffect } from "react";
import cafeApi from "../api/cafeApi";
import { Producto, ProductsResponse, Categoria } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoyId: string, productName: string ) => Promise<Producto>;
    updateProduct: ( categoyId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( id: string ) => Promise<void>;
    loadProductsById: ( id: string ) => Promise<Producto>;
    uploadImage: ( data: any, id: string ) => Promise<void>; //TODO: cambiar ANY

}

export const ProductsContext = createContext({} as ProductsContextProps);



export const ProductsProvider = ({children}: any) => {

    const [products, setproducts] = useState<Producto[]>([]);

    useEffect(() => {
      loadProducts();
    }, [])
    

    const loadProducts = async() => {

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        /* setproducts([ ...products, ...resp.data.productos ]); */
        setproducts([ ...resp.data.productos ]);
    };

    const addProduct = async( categoryId: string, productName: string ): Promise<Producto> => {
        
        const resp = await cafeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        });
        setproducts([ ...products, resp.data ]);
        
        return resp.data;
    }

    const updateProduct = async( categoryId: string, productName: string, productId: string ) => {
        
        const resp = await cafeApi.put<Producto>(`/productos/${ productId }`, {
            nombre: productName,
            categoria: categoryId
        });
        setproducts( products.map( prod => {
            return ( prod._id === productId )
                ? resp.data
                : prod;
        })); 
    }

    const deleteProduct = async( id: string ) => {

    };
    const loadProductsById = async( id: string ):Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`productos/${ id }`);
        return resp.data;
    };

    //TODO: cambiar ANY
    const uploadImage = async( data: any, id: string ) => {

    };

    return(
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductsById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    )

}
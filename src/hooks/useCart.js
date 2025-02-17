import {useState, useEffect,useMemo} from "react"
import { db } from "../data/db"

export const useCart = () => {

    const initialCart = () =>{
            const localStorageCart = localStorage.getItem("cart")
            return localStorageCart ? JSON.parse(localStorageCart) : []
        }
    
        const [data] = useState(db)
        const [cart, setCart] = useState(initialCart)    
        const MAX_CART = 10;
        const MIN_CART = 0;
    
        useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart))
        },[cart])
    
        function addToCart(item){
    
            const itemExits = cart.findIndex(guitar => guitar.id === item.id)
            if(itemExits >= 0){
                console.log("El item ya existe en el carrito")
                const updateCart = [...cart]
                updateCart[itemExits].quantity++    
                setCart(updateCart)
            }else{
                item.quantity = 1
                setCart(prevCart => [...prevCart, item])
            }
            
            setCart([...cart, item])
            saveLocalStorage()
        }
    
        function removeFromCar(id){
            setCart(prevCart=> prevCart.filter(guitar => guitar.id !== id))
    
        }
    
        function increaseQuantity(id){
            const updateCart = cart.map( item => {
                //si quisieramos limitar la cantidad de items en el carrito le ponemos && item.quantity < 5 [es la cantidad que desees a limitar] o creamos una constante como const MAX_QUANTITY = 5 y la usamos en el condicional
                if(item.id === id){
                    return{
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            setCart(updateCart)
        }
    
        function decreaseQuantity(id){
            const updateCart = cart.map(item =>{
                if(item.id === id && MIN_CART < item.quantity){
                    return{
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
            setCart(updateCart)
        }
    
        function clearCart(){
            console.log("Carrito vaciado")
            setCart([])
        }
        const isEmpty = cart.length === 0;
        const totalPagar = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return{
        data,
        cart,
        addToCart,
        removeFromCar,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        totalPagar
    }

}
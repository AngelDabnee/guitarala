import {useState} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"


function App() {
    
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])    
    const MAX_CART = 10;
    const MIN_CART = 0;

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





    return (
    <>
    <Header 
        cart = {cart}
        removeFromCar = {removeFromCar}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}   
        clearCart={clearCart}
    
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) =>(
                <Guitar 
                    key = {guitar.id}
                    guitar = {guitar}
                    cart = {cart}
                    setCart = {setCart}
                    addToCart = {addToCart}
                />

            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App

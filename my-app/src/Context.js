import React, {useState, useEffect} from "react"

const Context = React.createContext()
const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setAllPhotos(data))
    }, [])

    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })

        setAllPhotos(updatedArr)
    }
    
    function addToCart(newItem) {
        setCartItems(prevItems => [...prevItems, newItem])
    }

    return (
        <Context.Provider value={{allPhotos, toggleFavorite, addToCart, cartItems}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
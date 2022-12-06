import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import Cart from '../components/Cart'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Menu from '../components/Menu'
import TableModal from '../components/TableModa'
import { CartItem } from '../types/CartItem'
import { Category } from '../types/Category'
import { Product } from '../types/Product'

import { Container, CenterContainer } from './styles'
import { api } from '../services/api'

export default function Main() {
    const [openModal, setOpenModal] = useState(false)
    const [tableSelected, setTableSelected] = useState('')
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])

    async function getCategories() {
        setIsLoading(true)

        const response = await api.get('/categories')
        setCategories(response.data)

        setIsLoading(false)
    }

    async function getProducts() {
        setIsLoading(true)

        const response = await api.get('/products')
        setProducts(response.data)

        setIsLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getCategories()
    }, [])

    function handleSaveTable(table: string) {
        setTableSelected(table)
    }

    function handleAddCart(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product.id === product.id)

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product: product
                })
            }
            const newCartItems = [...prevState];
            newCartItems[itemIndex] = {
                ...newCartItems[itemIndex],
                quantity: newCartItems[itemIndex].quantity + 1
            }
            return newCartItems
        })
    }

    function handleRemoveCart(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product.id === product.id)

            const item = prevState[itemIndex]
            const newCartItems = [...prevState]

            if (item.quantity == 1) {

                newCartItems.splice(itemIndex, 1)

                return newCartItems
            }

            newCartItems[itemIndex] = {
                ...newCartItems[itemIndex],
                quantity: newCartItems[itemIndex].quantity - 1
            }
            return newCartItems
        })
    }

    function handleConfirmOrder() {
        setCartItems([])
        setTableSelected('')
    }

    return (
        <>
            <Container>
                <Header table={tableSelected} setTableSelected={setTableSelected} />

                {isLoading ? (
                    <CenterContainer>
                        <ActivityIndicator color='red' size='large' />
                    </CenterContainer>
                ) : (
                    <>
                        <Categories categories={categories} />
                        <Menu products={products} table={tableSelected} onAddToCart={handleAddCart} />
                    </>
                )
                }

            </Container>

            {!tableSelected && (
                <Footer setOpenModal={setOpenModal} />
            )}

            {tableSelected && (
                <Cart
                    cartItems={cartItems}
                    onAddToCart={handleAddCart}
                    onRemoveToCart={handleRemoveCart}
                    OnConfirmOrder={handleConfirmOrder}
                />
            )}

            <TableModal openModal={openModal} setOpenModal={setOpenModal} onSave={handleSaveTable} />
        </>
    )
}
import { useState } from "react";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import TableModal from "../components/TableModa";

import { Text } from "../components/Text";
import { products } from "../mocks/products";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { Container } from "./styles";

export default function Main() {
    const [openModal, setOpenModal] = useState(false)
    const [tableSelected, setTableSelected] = useState('')
    const [cartItems, setCartItems] = useState<CartItem[]>([])


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
                <Menu table={tableSelected} onAddToCart={handleAddCart} />
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
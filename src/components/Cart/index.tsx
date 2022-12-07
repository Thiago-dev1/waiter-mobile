import { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { api } from '../../services/api'
import { CartItem } from '../../types/CartItem'
import { Product } from '../../types/Product'
import Button from '../Button'
import { MinusCircle } from '../Icons/MinusCircle'
import { PlusCircle } from '../Icons/PlusCircle'
import OrderConfirmedModal from '../OrderConfirmedModal'
import { Text } from '../Text'
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles'

interface Props {
    cartItems: CartItem[];
    onAddToCart: (prodcut: Product) => void;
    onRemoveToCart: (prodcut: Product) => void;
    OnConfirmOrder: () => void;
    tableSelected: string;
}


export default function Cart({cartItems, onAddToCart, onRemoveToCart, OnConfirmOrder, tableSelected}: Props) {

    const [openModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const total = cartItems.reduce((acc, cartItem) => { 
        return acc +  cartItem.product.price * cartItem.quantity
    }, 0)


    async function handleConfirmOrder() {
        setIsLoading(true)
        const  payload = {
            table: tableSelected,
            products: cartItems.map((item) => ({
                product: item.product,
                quantity: item.quantity
            }))
        }

        await new Promise(resolve => setTimeout(resolve, 500))
        await api.post('/orders', payload)

        setIsLoading(false)
        setOpenModal(true)
    }

    return (
        <>
            <OrderConfirmedModal 
                visible={openModal}
                OnConfirmOrder={OnConfirmOrder}
            />
            <View style={{ minHeight: 110, paddingHorizontal: 24, paddingVertical: 16, backgroundColor: 'white' }}>
            {cartItems.length > 0 &&
                (
                    <FlatList
                        data={cartItems}
                        keyExtractor={cartItems => cartItems.product.id}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 20, maxHeight: 150 }}
                        renderItem={({ item }) => {
                            return (
                                <Item>
                                    <ProductContainer>
                                        <Image source={{ uri: item.product.imagePath }} />
                                        <QuantityContainer>
                                            <Text size={14} color='#666'>{item.quantity}x</Text>
                                        </QuantityContainer>
                                        <ProductDetails>
                                            <Text size={14} weight='600' style={{ marginBottom: 4 }}>{item.product.name}</Text>
                                            <Text size={14} color='#666'>{item.product.price}</Text>
                                        </ProductDetails>
                                    </ProductContainer>
                                    <Actions>
                                        <TouchableOpacity style={{ marginRight: 24 }} onPress={() => onAddToCart(item.product)} >
                                            <PlusCircle />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onRemoveToCart(item.product)}>
                                            <MinusCircle />
                                        </TouchableOpacity>
                                    </Actions>
                                </Item>
                            )
                        }
                        }
                    />
                )
            }
            <Summary>
                <TotalContainer>
                    {cartItems.length == 0 ?
                        <Text color='#999'>Seu carrinho {'\n'}está vazio</Text>
                        :
                        <>
                            <Text color='#666'>Total</Text>
                            <Text size={20} weight='600'>{total}</Text>
                        </>
                    }
                </TotalContainer>
                <Button 
                    disabled={cartItems.length == 0 ? true : false} 
                    onPress={handleConfirmOrder}
                    loading={isLoading}
                >
                    Confirmar Pedido
                </Button>
            </Summary>
        </View>
        </>
    )
}
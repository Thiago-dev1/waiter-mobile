import { useState } from 'react'
import { FlatList } from 'react-native'

import { Text } from '../Text'
import { PlusCircle } from '../Icons/PlusCircle'
import ProdcutModal from '../ProductModal'
import { Empty } from '../Icons/Empty'
import { Product } from '../../types/Product'

import {
    Container,
    List,
    ViewProduct,
    ViewProductDetails,
    ViewProductImage,
    Separetor,
    AddToCartButton,
    CenterContainer
} from './styles'

interface Props {
    table: string;
    onAddToCart: (prodcut: Product) => void;
    products: Product[]
}


export default function Menu({ table, onAddToCart, products }: Props) {

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedProdcut, setSelectedProduct] = useState<Product | null>(null)

    function handleOpenModal(product: Product) {
        setSelectedProduct(product)
        setIsModalVisibile(true)
    }

    const [isModalVisibile, setIsModalVisibile] = useState(false)

    return (
        <>
            <ProdcutModal
                visible={isModalVisibile}
                onClose={() => setIsModalVisibile(false)}
                product={selectedProdcut as Product}
                onAddToCart={onAddToCart}
                table={table}
            />
            <Container>

                {products.length > 0 ?
                    <List>
                        <FlatList
                            data={products}
                            keyExtractor={products => products.id}
                            ItemSeparatorComponent={Separetor}
                            renderItem={({ item }) => {
                                return (
                                    <ViewProduct onPress={() => handleOpenModal(item)}>
                                        <ViewProductImage source={{ uri: item.imagePath }} />
                                        <ViewProductDetails>
                                            <Text weight='600'>{item.name}</Text>
                                            <Text size={14} style={{ marginVertical: 8 }} >{item.description}</Text>
                                            <Text size={14} weight='600' >{item.price}</Text>
                                        </ViewProductDetails>
                                        <AddToCartButton style={{ display: table ? 'flex' : 'none' }} onPress={() => onAddToCart(item)}>
                                            <PlusCircle />
                                        </AddToCartButton>
                                    </ViewProduct>
                                )
                            }}
                        />

                    </List>

                    :

                    <CenterContainer>
                        <Empty />
                        <Text color='#666' style={{ marginTop: 24 }}>
                            Nenhum produto foi encontrado!
                        </Text>
                    </CenterContainer>
                }
            </Container>
        </>
    )
}
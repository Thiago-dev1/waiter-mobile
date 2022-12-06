import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image } from 'react-native'

import { Text } from '../Text'
import {
    Catogires,
    Container,
    List,
    ViewCategory,
    ViewCategoryIcon,
    ViewProduct,
    ViewProductDetails,
    ViewProductImage,
    Separetor,
    AddToCartButton,
    CenterContainer
} from './styles'

// import { products } from '../../mocks/products'
import { PlusCircle } from '../Icons/PlusCircle'
import { api } from '../../services/api'
import { Category } from '../../types/Category'
// import { categories } from '../../mocks/categories'
import ProdcutModal from '../ProductModal'
import { Product } from '../../types/Product'
import { Empty } from '../Icons/Empty'

interface Props {
    table: string,
    onAddToCart: (prodcut: Product) => void
}


export default function Menu({ table, onAddToCart }: Props) {

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedProdcut, setSelectedProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [categories, setCategories] = useState<Category[]>([])

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


    function handleSelectedCategory(id: string) {
        if (id == selectedCategory) {
            setSelectedCategory('')
        } else {
            setSelectedCategory(id)
        }
    }

    function handleOpenModal(product: Product) {
        setSelectedProduct(product)
        setIsModalVisibile(true)
    }

    const [isModalVisibile, setIsModalVisibile] = useState(false)

    let productsFilter = products

    if (selectedCategory.length > 0) {
        productsFilter = products.filter(product => product.Category.id == selectedCategory)
    }

    return (
        <>
            <ProdcutModal
                visible={isModalVisibile}
                onClose={() => setIsModalVisibile(false)}
                product={selectedProdcut as Product}
                onAddToCart={onAddToCart}
                table={table}
            />

            {isLoading && (
                <CenterContainer>
                    <ActivityIndicator color='red' size='large' />
                </CenterContainer>
            )}

            {!isLoading && (
                <Container>
                    <Catogires>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={categories}
                            keyExtractor={categories => categories.id}
                            horizontal
                            renderItem={({ item }) => {
                                const isSelected = selectedCategory === item.id
                                return (
                                    <ViewCategory onPress={() => handleSelectedCategory(item.id)}>
                                        <ViewCategoryIcon><Text size={17} opacity={isSelected ? 1 : 0.5}>{item.icon}</Text></ViewCategoryIcon>
                                        <Text size={16} weight='700' opacity={isSelected ? 1 : 0.5} >{item.name}</Text>
                                    </ViewCategory>
                                )
                            }}
                        />
                    </Catogires>
                    {productsFilter.length > 0 ?
                        <List>
                            <FlatList
                                data={productsFilter}
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
                            <Text color='#666' style={{marginTop: 24 }}>
                                Nenhum produto foi encontrado!
                            </Text>
                        </CenterContainer>
                    }
                </Container>
            )}
        </>
    )
}
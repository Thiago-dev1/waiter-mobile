import { useEffect, useState } from 'react'
import { FlatList, Image } from 'react-native'

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
    AddToCartButton
} from './styles'

import { products } from '../../mocks/products'
import { PlusCircle } from '../Icons/PlusCircle'
import { api } from '../../services/api'
import { Category } from '../../types/Category'


export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        api.get('/categories')
           .then(response => setCategories(response.data))
    }, [selectedCategory])

    function handleSelectedCategory(id: string) {
        if (id == selectedCategory) {
            setSelectedCategory('')
        } else {
            setSelectedCategory(id)
        }
    }

    return (
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
            <List>
                <FlatList
                    data={products}
                    keyExtractor={products => products._id}
                    ItemSeparatorComponent={Separetor}
                    renderItem={({ item }) => {
                        return (
                            <ViewProduct>
                                <ViewProductImage source={{ uri: item.imagePath }} />
                                <ViewProductDetails>
                                    <Text weight='600'>{item.name}</Text>
                                    <Text size={14} style={{ marginVertical: 8 }} >{item.description}</Text>
                                    <Text size={14} weight='600' >{item.price}</Text>
                                </ViewProductDetails>
                                <AddToCartButton>
                                    <PlusCircle />
                                </AddToCartButton>
                            </ViewProduct>

                        )
                    }}
                />

            </List>
        </Container>
    )
}
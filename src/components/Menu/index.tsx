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

import { categories } from '../../mocks/categories'
import { products } from '../../mocks/products'
import { Circle } from 'react-native-svg'
import { PlusCircle } from '../Icons/PlusCircle'

const test = 'https://m.media-amazon.com/images/I/51lsaWT3Z5L._AC_UL320_.jpg'


export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        fetch('http://172.26.123.234:3333/categories')
            .then(response => response.json())
            .then(response => console.log(response.data))
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
                    keyExtractor={categories => categories._id}
                    horizontal
                    renderItem={({ item }) => {
                        const isSelected = selectedCategory === item._id
                        return (
                            <ViewCategory onPress={() => handleSelectedCategory(item._id)}>
                                <ViewCategoryIcon><Text size={16} opacity={isSelected ? 1 : 0.5} >{item.icon}</Text></ViewCategoryIcon>
                                <Text size={18} weight='700' opacity={isSelected ? 1 : 0.5} >{item.name}</Text>
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
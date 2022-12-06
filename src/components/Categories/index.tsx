
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { api } from '../../services/api'
import { Category } from '../../types/Category'
import { Text } from '../Text'
import { Catogires, ViewCategory, ViewCategoryIcon } from './styles'


interface Props {
    categories: Category[]
}

export default function Categories({categories}: Props) {

    const [selectedCategory, setSelectedCategory] = useState('')
    // const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)


    function handleSelectedCategory(id: string) {
        if (id == selectedCategory) {
            setSelectedCategory('')
        } else {
            setSelectedCategory(id)
        }
    }

    return (
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
    )
}
import { FlatList, Image, Modal, View } from "react-native";
import { Product } from "../../types/Product";
import Button from "../Button";
import Footer from "../Footer";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { BodyModal, HeaderModal, ViewClose, ProductTitle, IngredientView, FooterModal, IngredientsContainer } from "./styles";

interface Props {
    visible: boolean;
    onClose: () => void;
    product: Product;
    onAddToCart: (prodcut: Product) => void;
    table: string;
}

export default function ProdcutModal({ visible, onClose, product, onAddToCart, table }: Props) {

    function handleAddToCart(){
        if (table) {
            onAddToCart(product)
            onClose()
        } else {
            onClose()
            alert('Selecione uma Mesa')
        }
    }

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            presentationStyle={"pageSheet"}
            onRequestClose={onClose}
        >
            <HeaderModal>
                <Image source={{ uri: product?.imagePath }} style={{ flex: 1 }} />
                <ViewClose onPress={onClose}>
                    <Close color='white' />
                </ViewClose>
            </HeaderModal>
            <BodyModal>
                <ProductTitle>
                    <Text weight='600' size={24}>{product?.name}</Text>
                    <Text color="#666" style={{ marginTop: 8 }}>{product?.description}</Text>
                </ProductTitle>
                {product?.Ingredients.length > 0 &&
                    (
                        <IngredientsContainer>
                            <Text weight='600' color='#666' style={{ marginTop: 32, marginBottom: 16 }}>Ingredientes</Text>
                            <FlatList
                                data={product?.Ingredients}
                                keyExtractor={ingredients => ingredients.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {

                                    return (
                                        <IngredientView>
                                            <Text>{item.icon}</Text>
                                            <Text style={{ marginLeft: 20 }}>{item.name}</Text>
                                        </IngredientView>
                                    )
                                }}
                            />
                        </IngredientsContainer>
                    )
                }
            </BodyModal>
            <FooterModal>
                <View>
                    <Text>Preço</Text>
                    <Text weight='600' size={20}>{product?.price}</Text>
                </View>
                <View style={{}}>
                    <Button onPress={handleAddToCart}>
                        Adcionar ao pedido
                    </Button>
                </View>
            </FooterModal>
        </Modal>
    )
}
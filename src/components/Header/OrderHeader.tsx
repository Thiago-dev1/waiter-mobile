import { TouchableOpacity, View } from 'react-native'
import { Text } from '../Text'
import { ContainerPedidos } from './styles'

interface Props {
    table?: string;
    setTableSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function OrderHeader({ setTableSelected, table }: Props) {
    return (
        <>
            <ContainerPedidos>
                <Text weight='600' size={24}>Pedido</Text>
                <TouchableOpacity onPress={() => setTableSelected('')}>
                    <Text weight='600' color='red'>cancelar pedido</Text>
                </TouchableOpacity>
            </ContainerPedidos>
            <View style={{padding: 16, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgba(204, 204, 204, 0.3)', borderRadius: 8, marginTop: 24}}>
                <Text color='#666'>Mesa {table}</Text>
            </View>
        </>
    )
}
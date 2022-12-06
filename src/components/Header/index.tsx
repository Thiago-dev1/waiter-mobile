import { Text } from '../Text'
import OrderHeader from './OrderHeader'
import { Container } from './styles'

interface Props {
    table?: string;
    setTableSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({ table, setTableSelected }: Props) {
    return (
        <Container>
            {table ?
                <OrderHeader setTableSelected={setTableSelected} table={table} />
                :
                <>
                    <Text>Bem-vindo(a) ao</Text>
                    <Text weight='700' size={20} >WAITER<Text size={20}>APP</Text> </Text>
                </>
            }
        </Container>
    )
}
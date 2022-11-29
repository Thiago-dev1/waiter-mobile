import { Text } from '../Text'
import { Container } from './styles'

export default function Header() {
    return (
        <Container>
            <Text>Bem-vindo(a) ao</Text>
            <Text weight='700' size={20} >WAITER<Text size={20}>APP</Text> </Text>
        </Container>
    )
}
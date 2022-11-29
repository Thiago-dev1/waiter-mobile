import Button from '../Button'
import { Container } from './styles'

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Footer({setOpenModal}: Props) {
    return (
        <Container>
            <Button onPress={() => setOpenModal(true)}>
                Novo Pedido
            </Button>
        </Container>
    )
}
import { Text } from '../Text'
import { Container } from './styles'

interface Props {
    children: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function Button({children, onPress, disabled}: Props) {
    return (
        <Container onPress={onPress} disabled={disabled}>
            <Text weight='600' color='#fff'>{children}</Text>
        </Container>
    )
}
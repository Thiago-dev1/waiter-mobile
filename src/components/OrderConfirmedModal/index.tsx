import { Modal } from 'react-native'
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { BodyModal, Overlay, Button } from './styles'


interface Props {
    visible: boolean;
    OnConfirmOrder: () => void;
}

export default function OrderConfirmedModal({visible,  OnConfirmOrder}: Props) {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <Overlay>
                <BodyModal>
                    <Text style={{marginBottom: 15}}><CheckCircle/></Text>
                    <Text color='#fff' weight='600' size={20} style={{marginBottom: 4}}>Pedido confirmado</Text>
                    <Text color='#fff' opacity={0.9}>O pedido já entrou na fila de produção!</Text>
                    <Button style={{marginTop: 24}} onPress={OnConfirmOrder}>
                        <Text color='red' weight='600'>Ok</Text>
                    </Button>
                </BodyModal>
            </Overlay>
        </Modal>
    )
}
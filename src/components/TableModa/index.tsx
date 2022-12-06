import { useState } from 'react'
import { Modal, Platform, TouchableOpacity } from 'react-native'

import Button from '../Button'
import { Close } from '../Icons/Close'
import { Text } from '../Text'
import { Form, HeaderModal, Input, ModalBody, Overlay } from './styles'

interface Props {
    openModal: boolean; 
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (table: string) => void
}


export default function TableModal({openModal, setOpenModal, onSave}: Props) {

    const [table, setTable] = useState('')

    function handleSave() {
        onSave(table)
        setOpenModal(false)
        setTable('')
    }

    return (
        <Modal 
            transparent 
            visible={openModal} 
            animationType='fade'
            onRequestClose={() => setOpenModal(false)}
        >
            <Overlay>
                <ModalBody>
                    <HeaderModal>
                        <Text weight='600'>Informar a mesa</Text>
                        <TouchableOpacity onPress={(e) => setOpenModal(false)}>
                            <Close color='#666' />
                        </TouchableOpacity>
                    </HeaderModal>
                    <Form>
                        <Input
                            placeholder='Número da mesa'
                            placeholderTextColor={'#666'}
                            keyboardType='number-pad'
                            onChangeText={(value) => setTable(value)}
                        />
                        <Button disabled={table.length > 0 ? false : true} onPress={handleSave}>
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    )
}
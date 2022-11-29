import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native'


export const Overlay = styled.KeyboardAvoidingView`
    background: rgba(0, 0, 0, 0.6);
    flex: 1;
    align-items: stretch;
    justify-content: center;

    padding: 0 24px;
`

export const ModalBody = styled.View`
    background-color: white;
    border-radius: 8px;
    padding: 24px;
`

export const HeaderModal = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const Form = styled.View`

`

export const Input = styled.TextInput`
    border: 1px solid rgba(204, 204, 204, 0.5);
    border-radius: 8px;
    padding: 12px;
    margin: 32px 0;
`
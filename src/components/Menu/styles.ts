import { Platform } from 'react-native'
import styled from 'styled-components/native'


const isAndroid = Platform.OS == 'android'

export const Container = styled.View`
    flex: 1;
    margin-top: 34px;
`

export const List = styled.View`
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 35px;
`

export const ViewProduct = styled.TouchableOpacity`
    flex-direction: row;
`

export const ViewProductImage = styled.Image`
    border-radius: 8px;   
    width: 120px;
    height: 96px;
`

export const ViewProductDetails = styled.View`
    margin-left: 16px;
    flex: 1;
`
export const Separetor = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(204, 204, 204, 0.3);
    margin: 24px 0;
`

export const AddToCartButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    right: 0;
`

export const CenterContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`
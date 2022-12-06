import { Platform } from 'react-native'
import styled from 'styled-components/native'


const isAndroid = Platform.OS == 'android'

export const Catogires = styled.View`
    margin-left: 24px;
`

export const ViewCategory = styled.TouchableOpacity`
    align-items: center; 
    opacity: 1;
    margin-right: 8px;
`

export const ViewCategoryIcon = styled.View`
    width: 44px;
    height: 44px;
    margin-bottom: 8px;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, ${`${isAndroid ? 1 : 0.1}`});
    elevation: 2;
    border-radius: 22px;   
`
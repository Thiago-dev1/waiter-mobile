import styled  from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

const isAndroid = Platform.OS == 'android'

export const Container = styled.SafeAreaView`
    background-color: #FFFFFF;
    flex: 1;
    margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`
export const CenterContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`
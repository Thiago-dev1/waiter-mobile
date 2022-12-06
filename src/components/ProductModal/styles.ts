import styled from 'styled-components/native'

export const HeaderModal = styled.View`
    width: 100%;
    height: 200px;
`

export const BodyModal = styled.View`
    padding: 0 24px;
    flex: 1;
    margin-top: 32px;
`

export const ViewClose = styled.TouchableOpacity`
    position: absolute;
    top: 23px;
    right: 23px;

    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
`

export const ProductTitle = styled.View`
`
export const IngredientsContainer = styled.View`
    flex: 1;
`

export const IngredientView = styled.View`
    flex-direction: row;
    padding: 16px;
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;

    margin-bottom: 4px;
`

export const FooterModal = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 24px;
    height: 80px;
`
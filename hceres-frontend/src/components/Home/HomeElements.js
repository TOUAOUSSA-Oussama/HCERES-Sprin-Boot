// Cette component est pour definir les styles liees a Home

import styled  from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../../AppElements'

// style pour la page home
export const HomeContainer = styled(Container)`
    border-color: rgb(7, 7, 6);
    border-style: solid;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 80%);
    height: 100vh;
    align-items: center;
`
export const leftside = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const rightside = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const title = styled.p`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 70px;
    line-height: 112px;
`
export const pg = styled.pg`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 84px;
`
export const labo = styled(Link)`
    width: 650px;
`
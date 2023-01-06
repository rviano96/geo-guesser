import styled from 'styled-components'

import {
    TextField as textField,
    Button
} from '@material-ui/core'

export const FormContainer = styled.div`
    max-width: 450px;
    display: flex;
    margin: 0 auto;
    height:100%;
`
export const Content = styled.div`
    margin-top:auto;
    margin-bottom:auto;
    /* background-color: #74bad0; */
    background-color:#dddddd;
    padding:1rem;
    border-radius:1rem;
    box-shadow: 0px 4px 8px 5px rgba(0,0,0,0.2);
`
export const TextField = styled(textField)`
    width: 100%;
    &>*{
        width: 100%,
        };
`

export const SubmitButton = styled(Button)`
    margin-top: 24px;
    text-align: center;
    margin-right:auto;
    margin-left:auto;
    display:flex;
    background-color: #add8e6 !important;
    &:hover{
    background-color:  #7ddde6 !important;
  }
  text-align:center !important;
`
export const SuccessMessage = styled.p`
    color:green;
`

export const ErrorMessage = styled.p`
    color:red;
`

export const Title = styled.h1`
    text-align:center;
`
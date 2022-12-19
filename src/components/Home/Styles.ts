import styled from 'styled-components'
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
`
export const Title = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 70px;
`

export const ButtonContainer = styled.div`
  padding: 1rem;
  display:flex;
  justify-content:center;
  `

export const Button = styled.button`
  border-radius:20px;
  background-color: #add8e6;
  border:none; 
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:hover{
    background-color:  #7ddde6;
  }
`
export const ButtonLink = styled(Link)`
text-decoration: none;
color:black;
&:active{
  color:black;
}
`
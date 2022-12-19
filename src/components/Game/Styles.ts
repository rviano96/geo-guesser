import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  height:100%;
`

export const Top = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;

`
export const StreetViewContainer = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
`
export const ButtonContainer = styled.div`
  //display:flex;
  padding: 0.5rem;
  justify-content: center;
  display:none;
`

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 19%;
  height: 36%;
  position: absolute;
  bottom: 1rem;
  left: 2rem;
  flex-direction: column;
  &:hover{
    width: 50%;
    height: 50%;
  }
  &:hover ${ButtonContainer}{
    display:flex
    
  }
`

export const Button = styled.button`
  border-radius:20px;
  background-color: #add8e6;
  width:30%;
  border:none;
  cursor: pointer;
  &:hover{
    background-color:  #7ddde6;
  }
`

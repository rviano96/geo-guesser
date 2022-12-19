import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;
`
export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  height:70%;
  width:100%;
`

export const PointsContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px 5px rgba(0,0,0,0.2);
  width:50%;
  border-radius:10px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const Points = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:37.5%;
`

export const Distance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:37.5%;
`

export const EmptyBar = styled.div`
  border: 1px solid #b0aeae;
  width: 50%;
  border-radius: 7px;
  height: 100%;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #add8e6;
`

export const FillBar = styled(EmptyBar)`
    border: none;
    background: #3de13d;
    width: ${prop => `${prop.percent}%`};
    height: 100%;
    border-radius: 7px;

`

export const BarContainer = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const BottomContainer = styled.div`
  display:flex;
  justify-content:center;
  width:100%;
  height:30%;
  
`

export const ButtonContainer = styled.div`
  display:flex;
  padding: 0.5rem;
  justify-content: center;
`

export const Button = styled.button`
  border-radius:20px;
  background-color: #add8e6;
  border:none;
  cursor: pointer;
  padding:0.5rem;
  &:hover{
    background-color:  #7ddde6;
  }
`

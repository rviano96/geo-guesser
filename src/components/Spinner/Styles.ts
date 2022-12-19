import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
`

export const Loading = styled.div`
  border: ${prop => `${prop.border}px solid #a4d6ea`};
  border-top: ${prop => `${prop.border}px  #1395c8  solid`};
  border-radius: 50%;
  height: ${prop => `${prop.size}px`};
  width: ${prop => `${prop.size}px`};
  animation: ${prop => `spin ${prop.time}s linear infinite`};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
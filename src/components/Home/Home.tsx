import { Button, ButtonContainer, ButtonLink, Container, Title } from "./Styles";

interface IHome {

}

const Home: React.FC<IHome> = ({ }) => {
    return (
        <Container >
            <Title>
                Where is it?
            </Title>
            <img src="../../assets/images/home.svg" />
            <ButtonContainer>
                <Button>
                    <ButtonLink to='/game'>
                        START GAME
                    </ButtonLink>
                    </Button>
            </ButtonContainer>
        </Container >
    )
}

export default Home
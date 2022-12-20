import { Container, Loading } from "./Styles";

interface ISpinner {
    size?: number;
    border?: number;
    time?: number;
}

const Spinner: React.FC<ISpinner> = ({ size = 120, border = 16, time = 2 }) => {
    return (
        <Container>
            <Loading size={size} border={border} time={time} />
        </Container>
    );
}

export default Spinner
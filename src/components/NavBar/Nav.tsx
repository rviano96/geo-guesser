import { ReactNode, useEffect, useRef, useState } from "react";
import { Container } from "./Styles";


interface INav {
    children: ReactNode
}

const Nav: React.FC<INav> = ({ children }) => {

    return (
        <Container >
            {children}
        </Container>
    )
}

export default Nav
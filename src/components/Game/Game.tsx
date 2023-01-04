import { ReactElement, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import StreetView from "../StreetView";
import Map from "../Map";
import { Button, ButtonContainer, Container, MapContainer, StreetViewContainer, Top } from "./Styles";
import Marker from "../Marker";
import Result from "../Result";
import { locations } from "../../utils/locations";
import Spinner from "../Spinner";
// const locations = await randomStreetView.getRandomLocations(3);

interface IGame {

}

const Game: React.FC<IGame> = () => {
    const [randomLocation, setRandomLocation] = useState<{ lat: number, lng: number }>()
    const [startTime, setStartTime] = useState(new Date().getTime())

    const render = (_status: Status): ReactElement => {
        return <Spinner />
    };
    const [latLng, setLatLng] = useState<google.maps.LatLng>();
    const [showResults, setShowResults] = useState(false)
    const onClick = (e: google.maps.MapMouseEvent): void => {
        // avoid directly mutating state
        setLatLng(e.latLng!);
    };

    const onIdle = (m: google.maps.Map): void => {
        const elems = Array.from(document.querySelectorAll('div')).filter(el => (el.textContent === 'For development purposes only'));
        elems.forEach((elem) => elem.hidden = true)
    };

    const onGuessClicked = (): void => {
        setShowResults(true)
    }

    //retrieve n locations from locations array
    const getRandomLocations = (nRounds: number = 1, gameMapId: string = "01") => {
        let loc = [];
        for (let index = 0; index < nRounds; index++) {
            //get random location
            let location;
            //if game map is all the world, select randmoly from all the locations.
            if (gameMapId === "01") {
                const idx: string = '07'
                location =
                    locations[idx][
                    Math.floor(
                        Math.random() * locations[idx].length
                    )
                    ];
            } else {
                location =
                    locations[gameMapId][
                    Math.floor(Math.random() * locations[gameMapId].length)
                    ];
            }

            let data = {
                lat: parseFloat((location.split(",")[0])) ,
                lng: parseFloat(location.split(",")[1]),
            };
            loc.push(data);
        }
        //return just 1 for this first version
        return loc[0];
    }

    useEffect(() => {
        setRandomLocation(getRandomLocations())
    }, [])

    const restartGame = () => {
        setLatLng(undefined)
        setShowResults(false)
        setRandomLocation(getRandomLocations())
        setStartTime(new Date().getTime())
    }

    return (
        <Container >
            <Top >
                {showResults ?
                    <Result
                        realPosition={{ lat: randomLocation?.lat!, lng: randomLocation?.lng! }}
                        selectedPosition={latLng!}
                        restartGameCB={restartGame}
                        totalTime={new Date().getTime() - startTime} />
                    : <StreetViewContainer>
                        <Wrapper apiKey={''} render={render} >
                            <StreetView lat={randomLocation?.lat!} lng={randomLocation?.lng!} restartGame={restartGame} />
                        </Wrapper>
                        <MapContainer buttonOpened={!!latLng}>
                            {!!latLng &&
                                <ButtonContainer>
                                    <Button onClick={() => onGuessClicked()}>
                                        Guess
                                    </Button>
                                </ButtonContainer>}
                            <Wrapper apiKey={''} render={render}>
                                <Map mapTypeControl={true} onClick={onClick} onIdle={onIdle} center={latLng}>
                                    <Marker position={latLng} />
                                </Map>
                            </Wrapper>


                        </MapContainer>
                    </StreetViewContainer>}
            </Top>
        </Container>
    )
}

export default Game
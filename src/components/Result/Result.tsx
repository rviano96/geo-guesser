import { ReactElement, useContext, useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Map from "../Map";
import { BarContainer, BottomContainer, Button, ButtonContainer, Container, Distance, EmptyBar, FillBar, MapContainer, Points, PointsContainer } from "./Styles";
import Marker from "../Marker";
import { getDatabase, ref, update } from "firebase/database";
import { AuthContext } from "../../contexts/AuthContext";

interface IResult {
    selectedPosition: google.maps.LatLng;
    realPosition: { lat: number, lng: number };
    restartGameCB: () => void;
    totalTime: number;
    gameId: string
}

const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2
};
const Result: React.FC<IResult> = ({ selectedPosition, realPosition, restartGameCB, totalTime, gameId }) => {
    const [distanceInKm, setDistanceInKm] = useState(0)
    const [points, setPoints] = useState<number>()
    const { user } = useContext(AuthContext);
    const db = getDatabase();

    const render = (status: Status): ReactElement => {
        return <h1>{status}</h1>;
    };

    useEffect(() => {
        const computeDistanceInKm = () => {
            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(selectedPosition, new google.maps.LatLng(realPosition));
            setDistanceInKm(parseFloat((distanceInMeters / 1000).toFixed(3)))
        }
        if (selectedPosition && realPosition)
            computeDistanceInKm()
    }, [selectedPosition, realPosition])

    useEffect(() => {
        !!distanceInKm && computePoints(distanceInKm)
    }, [distanceInKm])

    useEffect(() => {
        if (!!gameId && !!db && !!points) {

            try {
                const updates: any = {}
                updates['users/' + user?.uid + '/games/' + gameId] = {
                    gameId: gameId,
                    score: points,
                }
                update(ref(db), updates)

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }, [gameId, db, points, user?.uid])

    const formatResult = (distance: number): string => {
        return distance < 0 ? `${distance * 100} m` : `${distance.toFixed(0)} km`
    }

    const getPolylineCords = () => {
        return [{
            lat: realPosition.lat,
            lng: realPosition.lng
        }, {
            lat: selectedPosition.lat(),
            lng: selectedPosition.lng()
        },]
    }

    const computePoints = (distance: number): void => {
        /*STRATEGIES
            * Use a switch/case or if and return a fixed number based on an interval
            * Use a base point and return this: Base point / km 
            * Use a base point and a timer and return this: ((base point-timer)/km)
        */
        // const scores = [
        //     [7000, 1], [2500, 10],
        //     [500, 20], [100, 35],
        //     [50, 50], [20, 70],
        //     [5, 85], [2, 90],]
        // for (let i = 0; i < scores.length; i++) {
        //     if (distance > scores[i][0]) {
        //         return scores[i][1]
        //     }
        // }
        // return 100
        const points = distance > 1 ? parseFloat((5000 / Math.log(distance)).toFixed(2)) : 5000
        setPoints(points ?? 0)
    }

    const getPolyLine = (): google.maps.Polyline => {
        return new google.maps.Polyline({
            path: getPolylineCords(),
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '10px'
            }],
            geodesic: false,
            strokeColor: "#000000",
            strokeOpacity: 0,
        });
    }

    // const svgMarker = {
    //     path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    //     fillColor: "blue",
    //     fillOpacity: 0.6,
    //     strokeWeight: 0,
    //     rotation: 0,
    //     scale: 2,
    //     anchor: new google.maps.Point(11, 21),
    // };

    const image = {
        url: '../../assets/images/markerFlag.png',
        //url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };

    return (
        <Container >
            <MapContainer>
                <Wrapper apiKey={''} render={render}>
                    <Map mapTypeControl={false} zoom={4} center={selectedPosition} polyLine={getPolyLine()}>
                        <Marker position={selectedPosition} icon={image} />
                        <Marker position={new google.maps.LatLng(realPosition)} />
                    </Map>
                </Wrapper>
            </MapContainer>
            <BottomContainer>
                <PointsContainer>
                    <Distance>
                        {`You guess was ${formatResult(distanceInKm)} from the correct location.`}
                    </Distance>
                    <Points>
                        {`You earned ${points} ${points !== 1 ? 'points' : 'point'}`}
                    </Points>
                    <BarContainer>
                        <EmptyBar>
                            <FillBar percent={(points! * 100) / 5000} />
                        </EmptyBar>
                    </BarContainer>
                    <ButtonContainer>
                        <Button onClick={() => restartGameCB()}> Next Round</Button>
                    </ButtonContainer>
                </PointsContainer>
            </BottomContainer>
        </Container>
    )
}

export default Result
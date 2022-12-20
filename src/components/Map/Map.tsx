import React, { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import { Container, GMap } from "./Styles";

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map

interface IMap {
    mapType?: google.maps.MapTypeId,
    mapTypeControl?: boolean,
    onClick?: (e: google.maps.MapMouseEvent) => void,
    onIdle?: (map: GoogleMap) => void,
    children?: React.ReactNode,
    center?: GoogleLatLng,
    zoom?: number,
    polyLine?: google.maps.Polyline
}



const Map: React.FC<IMap> = ({
    mapType = google.maps.MapTypeId.ROADMAP,
    mapTypeControl = false,
    onClick,
    onIdle,
    children,
    center = new google.maps.LatLng(0, 0),
    zoom = 1,
    polyLine,
    ...options
}) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<GoogleMap>()


    // const startMap = (): void => {
    //     if (!map) {
    //         defaultMapStart()
    //     }
    // }

    // const defaultMapStart = (): void => {
    //     // const defaultAddress = new google.maps.LatLng(0, 0)
    //     initMap(zoom, center)
    // }
    // const initMap = (zoomLevel: number, center: GoogleLatLng): void => {
    //     if (mapRef.current) {
    //         setMap(
    //             new google.maps.Map(mapRef.current,
    //                 {
    //                     zoom: zoomLevel,
    //                     center,
    //                     mapTypeControl,
    //                     streetViewControl: false,
    //                     zoomControl: true,
    //                     panControl: false,
    //                     fullscreenControl: false,
    //                 })
    //         )
    //     }
    // }

    const defaultMapStart = useCallback(() => {
        // const defaultAddress = new google.maps.LatLng(0, 0)
        const initMap = (zoomLevel: number, center: GoogleLatLng): void => {
            if (mapRef.current) {
                setMap(
                    new google.maps.Map(mapRef.current,
                        {
                            zoom: zoomLevel,
                            center,
                            mapTypeControl,
                            streetViewControl: false,
                            zoomControl: true,
                            panControl: false,
                            fullscreenControl: false,
                        })
                )
            }
        }
        initMap(zoom, center)
    }, [ zoom, center, mapTypeControl])

    const startMap = useCallback(() => {
        if (!map) {
            defaultMapStart()
        }
    }, [map, defaultMapStart])

    useEffect((): void => {
        startMap()
    }, [startMap])




    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    useEffect(() => {
        if (polyLine) {
            polyLine.setMap(map!)
        }
    })

    return (
        <Container>
            <GMap ref={mapRef} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return cloneElement(child, { map });
                }
            })}

        </Container>)
}


export default Map
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Panorama } from "./Styles";

interface IStreetView {
    lat: number,
    lng: number,
    restartGame: () => void;
}

type StreetViewPanorama = google.maps.StreetViewPanorama;
type GoogleLatLng = google.maps.LatLng;


const StreetView: React.FC<IStreetView> = ({ lat, lng, restartGame }) => {

    const panoramaRef = useRef<HTMLDivElement>(null)
    const [panorama, setPanorama] = useState<StreetViewPanorama>()

    google.maps.event.addDomListener(window, 'load', () => {
        setTimeout(() => {
            removeText()
        }, 2000)

    })

    const removeText = () => {
        const elems = Array.from(document.querySelectorAll('div')).filter(el => el.textContent === 'For development purposes only');
        elems.forEach((elem) => elem.style.display = 'none')
    }

   

    const defaultPanoramaStart = useCallback(() => {
        const initPanorama = (zoomLevel: number, address: GoogleLatLng): void => {
            if (panoramaRef.current) {
                setPanorama(
                    new google.maps.StreetViewPanorama(
                        panoramaRef.current,
                        {
                            position: address,
                            showRoadLabels: false,
                            addressControl: false,
                            linksControl: false,
                            panControl: false,
                            enableCloseButton: false,
                            fullscreenControl: false,
                        },
                    )
                )
            }
        }
        const defaultAddress = new google.maps.LatLng(lat, lng)

        initPanorama(1, defaultAddress)
    }, [lat, lng])


    useEffect((): void => {
        const startPanorama = (): void => {
            if (!panorama) {
                defaultPanoramaStart()
            }
        }
        startPanorama()
    }, [panorama, defaultPanoramaStart])

    return (
        <Container>
            <Panorama ref={panoramaRef}>
            </Panorama>
        </Container>)
}

export default StreetView
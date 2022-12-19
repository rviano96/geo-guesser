import { useEffect, useRef, useState } from "react";
import { Container, Panorama } from "./Styles";



interface IStreetView {
    lat: number,
    lng: number
}

type StreetViewPanorama = google.maps.StreetViewPanorama;
type GoogleLatLng = google.maps.LatLng;


const StreetView: React.FC<IStreetView> = ({ lat, lng }) => {

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

    const startPanorama = (): void => {
        if (!panorama) {
            defaultPanoramaStart()
        }
    }

    useEffect((): void => {
        startPanorama()

    }, [panorama])

    const defaultPanoramaStart = (): void => {
        const defaultAddress = new google.maps.LatLng(lat, lng)
        initPanorama(1, defaultAddress)
    }

    const initPanorama = (zoomLevel: number, address: GoogleLatLng): void => {
        if (panoramaRef.current) {
            setPanorama(
                new google.maps.StreetViewPanorama(
                    panoramaRef.current,
                    {
                        position: address,
                        //pov: { heading: 0, pitch: 0 },
                        //zoom: zoomLevel,
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

    return (
        <Container>
            <Panorama ref={panoramaRef}>
            </Panorama>
        </Container>)
}

export default StreetView
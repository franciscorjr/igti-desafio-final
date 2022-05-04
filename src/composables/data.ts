import ICountry from '@/interface/ICountry';
import axios from 'axios';
import { ref } from 'vue'
export default function useData() {
    const origingCountries = ref([]);
    const origingCities = ref([]);
    const destinyCountries = ref([]);
    const destinyCities = ref([]);

    const getCountries = async () => {
        const response = await axios.get('http://localhost:3000/countries')
        origingCountries.value = response.data;
    }

    const getCitiesFromSelectedCountry = async (country: ICountry) => {
        const response = await axios.get('http://localhost:3000/countries/?country=' + country)
        const c = response.data[0];
        origingCities.value = c.cities;
    }

    const getDestinyCountries = async () => {
        const response = await axios.get('http://localhost:3000/countries')
        destinyCountries.value = response.data;
    }

    const getDestinyCitiesFromSelectedCountry = async (country: ICountry, origingCity: any) => {
        const response = await axios.get('http://localhost:3000/countries/?country=' + country)
        const c = response.data[0];
        const result = c.cities.filter((city: any) => {
            return city.city !== origingCity.value
        });
        destinyCities.value = result;
    }

    const getOriginCityLatitude = async (originCountry: ICountry, originCity: any) => {
        const response = await axios.get('http://localhost:3000/countries/?country=' + originCountry)
        const c = response.data[0];

        const latitude = c.cities.filter((item: any) => {
            if (item.city === originCity.value) {
                return item.latitude;
            }
        })
        return latitude[0].latitude;
    }

    const getOriginCityLongitude = async (originCountry: ICountry, originCity: any) => {
        const response = await axios.get('http://localhost:3000/countries/?country=' + originCountry)
        const c = response.data[0];

        const longitude = c.cities.filter((item: any) => {
            if (item.city === originCity.value) {
                return item.longitude;
            }
        })
        return longitude[0].longitude;
    }

    const getDistance = async (origingCityLatitude: number, origingCityLongitude: number, destinyCityLatitude: number, destinyCityLongitude: number) => {

        function degreesToRadians(degrees: number) {
            const pi = Math.PI;
            return degrees * (pi / 180);
        }

        const EARTH_RADIUS = 6_371.071; // Earth
        const diffLatitudeRadians = degreesToRadians(
            destinyCityLatitude - origingCityLatitude
        );

        const diffLongitudeRadians = degreesToRadians(
            destinyCityLongitude - origingCityLongitude
        );

        const originLatitudeRadians = degreesToRadians(origingCityLatitude);
        const destinationLatitudeRadians = degreesToRadians(destinyCityLatitude);

        const kmDistance =
            2 *
            EARTH_RADIUS *
            Math.asin(
                Math.sqrt(
                    Math.sin(diffLatitudeRadians / 2) *
                    Math.sin(diffLatitudeRadians / 2) +
                    Math.cos(originLatitudeRadians) *
                    Math.cos(destinationLatitudeRadians) *
                    Math.sin(diffLongitudeRadians / 2) *
                    Math.sin(diffLongitudeRadians / 2)
                )
            );
        return kmDistance.toFixed(2);
    }

    const abatimentoPorMilhas = async (miles: number) => {
        if(miles){
            return (miles * 0.02).toFixed(2);            
        }
    }

    const calculatePrice = async (
        origingCoutry: ICountry,
        destinyCoutry: ICountry,
        distance: number,
        adultos: number,
        criancas: number,
        classe: string,
        totalAbatimento: number) => {

        let indiceAdulto: number;
        let indiceCrianca: number;
        let total: number;

        if (origingCoutry === destinyCoutry) {
            indiceAdulto = (adultos * 0.3);
            indiceCrianca = (criancas * 0.15);
        } else {
            indiceAdulto = (adultos * 0.5);
            indiceCrianca = (criancas * 0.25);
        }

        let adultBasePrice = (distance * indiceAdulto);
        let kidBasePrice = (distance * indiceCrianca);

        if(classe === 'executiva'){
            adultBasePrice = (adultBasePrice * 1.8);
            kidBasePrice   = (kidBasePrice   * 1.4);
        }

        if(totalAbatimento){
            total = ((adultBasePrice + kidBasePrice) - totalAbatimento);
        }else{
            total = (adultBasePrice + kidBasePrice);
        }

        return {
            'adultBasePrice': parseFloat(adultBasePrice.toFixed(2)),
            'kidBasePrice': parseFloat(kidBasePrice.toFixed(2)),
            'total': parseFloat(total.toFixed(2))
        }

    }

    return {
        origingCountries,
        origingCities,
        destinyCountries,
        destinyCities,
        getCountries,
        getCitiesFromSelectedCountry,
        getDestinyCountries,
        getDestinyCitiesFromSelectedCountry,
        getOriginCityLatitude,
        getOriginCityLongitude,
        getDistance,
        calculatePrice,
        abatimentoPorMilhas
    }
} 
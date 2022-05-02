import ICountry from '@/interface/ICountry';
import axios from 'axios';
import {ref} from 'vue'
export default function useData() {
    const origingCountries = ref([]);
    const origingCities = ref([]);
    const destinyCountries = ref([]);
    const destinyCities = ref([]);
    
    const getCountries = async() => {
        const response = await axios.get('http://localhost:3000/countries')
        origingCountries.value = response.data;
    }
    
    const getCitiesFromSelectedCountry = async(country: ICountry) => {        
        const response = await axios.get('http://localhost:3000/countries/?country=' + country)
        const c = response.data[0];       
        origingCities.value = c.cities;
    }

    const getDestinyCountries = async() => {
        const response = await axios.get('http://localhost:3000/countries')
        destinyCountries.value = response.data;
    }

    const getDestinyCitiesFromSelectedCountry = async(country: ICountry, origingCity: any) => {        
        const response = await axios.get('http://localhost:3000/countries/?country=' + country)
        const c = response.data[0];
        const result = c.cities.filter((city:any) => {
            return city.city !== origingCity.value
        });        
        destinyCities.value = result;
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
    }
} 
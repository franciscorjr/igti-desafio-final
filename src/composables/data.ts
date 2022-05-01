import ICountry from '@/interface/ICountry';
import axios from 'axios';
import {ref} from 'vue'
export default function useData() {
    const countries = ref([]);
    const cities = ref([]);
    
    const getCountries = async() => {
        const response = await axios.get('http://localhost:3000/countries')
        countries.value = response.data;
    }

    const getCitiesFromSelectedCountry = async(country: ICountry) => {
        const response = await axios.get('http://localhost:3000/countries/?country=' + country)
        cities.value = response.data;
    }

    return {
        countries,
        cities,
        getCountries,
        getCitiesFromSelectedCountry
    }
} 
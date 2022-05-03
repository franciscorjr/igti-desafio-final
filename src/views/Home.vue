<template>
<div class="container">
  <main>
    <div class="py-5 text-center">
      <h2>Faça a viagem dos seus sonhos!</h2>
      <p class="lead">Use milhas para ter os melhores pacotes de viagens e aproveite suas férias!</p>
    </div>

    <div class="row g-5">
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Defina sua Viagem</h4>
          <div class="row g-3">
            <div class="col-md-12">
              <label for="origingCountry" class="form-label">País de origem</label>
              <select class="form-select" id="origingCountry" v-model="origingCountry" required>
                <option disabled value="">Choose...</option>
                <option v-for="(item, index) in origingCountries" :key="index" >{{item.country}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="origingCity" class="form-label">Cidade de origem</label>
              <select class="form-select" id="origingCity" v-model="origingCity" required>
                <option disabled value="">Choose...</option>
                <option v-for="(item, index) in origingCities" :key="index" >{{item.city}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="destinyCountry" class="form-label">País de destino</label>
              <select class="form-select" id="destinyCountry" v-model="destinyCountry" required>
                <option disabled value="">Choose...</option>
                <option v-for="(item, index) in destinyCountries" :key="index" >{{item.country}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="destinyCity" class="form-label">Cidade de destino</label>
              <select class="form-select" id="destinyCity" v-model="destinyCity" required>
                <option disabled value="">Choose...</option>
                <option v-for="(item, index) in destinyCities" :key="index" >{{item.city}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="adulto" class="form-label">Adultos</label><br>
              <button type="button" class="btn btn-dark" @click="removeAdult">-</button>
              <input type="number" name="adulto" class="no-border" id="adulto" v-model="adultQuantity" required>
              <button type="button" class="btn btn-dark" @click="addAdult">+</button>
            </div>
            <div class="col-md-12">
              <label for="crianca" class="form-label">Crianças</label><br>
              <button type="button" class="btn btn-dark" @click="removeKid">-</button>
              <input type="number" name="crianca" class="no-border" id="crianca" v-model="kidQuantity" required>
              <button type="button" class="btn btn-dark" @click="addKid">+</button>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="economica" v-model="typeOfFlight" checked>
              <label class="form-check-label" for="flexRadioDefault1">
                Econômica
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="executiva" v-model="typeOfFlight">
              <label class="form-check-label" for="flexRadioDefault2">
                Executiva
              </label>
            </div>
            <label for="customRange1" class="form-label">Utilizar {{miles}} milhas </label>
            <input type="range" class="form-range" id="customRange1" v-model="miles">
          </div>
          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" @click="calculate">Calcular Valores</button>
      </div>

      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Resumo da Viagem</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Origem</h6>
              <small class="text-muted">{{origingCountry}} ({{origingCity}})</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Destino</h6>
              <small class="text-muted"> {{destinyCountry}} ({{destinyCity}})</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Distância</h6>
              <small class="text-muted"> KM</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div>
              <h6 class="my-0">Passageiros</h6>
              <small>{{adultQuantity}} Adulto(s) e {{kidQuantity}} Criança(s)</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div>
              <h6 class="my-0">Tipo de Vôo (Classe)</h6>
              <small>{{typeOfFlight}}</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div>
              <h6 class="my-0">Preços</h6>
              <div v-if="basePrice">
                <small>Valor total de adultos  R$: {{basePrice.adultBasePrice}}</small><br>
                <small>Valor total de crianças R$: {{basePrice.kidBasePrice}}</small>
              </div>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div>
              <h6 class="my-0">{{miles}} Milhas Utilizadas</h6>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Valor abatido por milhas</h6>
            </div>
            <span class="text-success">R$: 2.000,00</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Valor Total</span>
            <strong>R$: 2.000,00</strong>
          </li>
        </ul>
      </div>
    </div>
  </main>
</div>
</template>

<script lang="ts">
import useData from "@/composables/data";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const { origingCountries, origingCities, destinyCountries, destinyCities, getCountries, getDestinyCountries, getCitiesFromSelectedCountry, getDestinyCitiesFromSelectedCountry, getOriginCityLatitude, getOriginCityLongitude, getDistance, calculatePrice} = useData();    

    const origingCountry = ref();
    const origingCity = ref();
    let   origingCityLatitude: number;
    let   origingCityLongitude: number;
    const destinyCountry = ref();
    const destinyCity = ref();
    let   destinyCityLatitude: number;
    let   destinyCityLongitude: number;
    let   distance: number;
    //let   basePrice: any;
    const adultQuantity = ref(1);
    const kidQuantity = ref(0);
    const miles = ref(0);
    const typeOfFlight = ref('economica');
    const basePrice = ref();

  

    onMounted(() => {
      getCountries(),
      getDestinyCountries()
    });

    watch(origingCountry, (newValue) => {
      getCitiesFromSelectedCountry(newValue);
    });

    watch(origingCity, async () =>{
      destinyCity.value = '';
      getDestinyCitiesFromSelectedCountry(origingCountry.value, origingCity);
      origingCityLatitude = await getOriginCityLatitude(origingCountry.value, origingCity);
      origingCityLongitude = await getOriginCityLongitude(origingCountry.value, origingCity);
      destinyCountry.value = '';
    });

    watch(destinyCountry, (newValue) => {
      if(destinyCountry.value){
        getDestinyCitiesFromSelectedCountry(newValue, origingCity);
      }
    });

    
    watch(destinyCity, async () => {
      if(destinyCountry.value){
        if(destinyCity.value){
          destinyCityLatitude = await getOriginCityLatitude(destinyCountry.value, destinyCity);
          destinyCityLongitude = await getOriginCityLongitude(destinyCountry.value, destinyCity);
        }
      }
    });

    const addAdult = () => {
      adultQuantity.value++;
    }

    const removeAdult = () => {
      if( adultQuantity.value >= 1 ){
        adultQuantity.value--;
      }
    }

    const addKid = () => {
      kidQuantity.value++;
    }

    const removeKid = () => {
      if( kidQuantity.value >= 1 ){
        kidQuantity.value--;
      }
    }

    const calculate =  async () => {
      distance  = await getDistance(origingCityLatitude, origingCityLongitude, destinyCityLatitude, destinyCityLongitude);
      basePrice.value = await calculatePrice(origingCountry.value, destinyCountry.value, distance, adultQuantity.value, kidQuantity.value, typeOfFlight.value);
      console.log(basePrice.value);
    }

    return{
      origingCountry,
      origingCity,
      destinyCountry,
      destinyCity,
      origingCountries,
      origingCities,
      destinyCountries,
      destinyCities,
      adultQuantity,
      kidQuantity,
      miles,
      typeOfFlight,
      addAdult,
      removeAdult,
      addKid,
      removeKid,
      calculate,
      basePrice
    }
  }
});
</script>

<style scoped>
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

  .no-border {
      border: 0;
      box-shadow: none; /* You may want to include this as bootstrap applies these styles too */
      width: 40px;
      margin: 1em;
      text-align: right;
    }
</style>
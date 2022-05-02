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
              <label for="adulto" class="form-label">Adultos</label>
              <input type="number" name="adulto" id="adulto" required>
            </div>
            <div class="col-md-12">
              <label for="adulto" class="form-label">Crianças</label>
              <input type="number" name="adulto" id="adulto" required>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
              <label class="form-check-label" for="flexRadioDefault1">
                Default radio
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
              <label class="form-check-label" for="flexRadioDefault2">
                Default checked radio
              </label>
            </div>
            <label for="customRange1" class="form-label">Example range</label>
            <input type="range" class="form-range" id="customRange1">
          </div>
      </div>

      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Resumo da Viagem</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">País de Origem</h6>
              <small class="text-muted">{{origingCountry}}</small>
            </div>
            <span class="text-muted">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Cidade de Origem</h6>
              <small class="text-muted">{{origingCity}}</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">País de Destino</h6>
              <small class="text-muted">{{destinyCountry}}</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Cidade de Destino</h6>
              <small>{{destinyCity}}</small>
            </div>
            <span class="text-success">−$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
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
    const { origingCountries, origingCities, destinyCountries, destinyCities, getCountries, getDestinyCountries, getCitiesFromSelectedCountry, getDestinyCitiesFromSelectedCountry} = useData();    

    const origingCountry = ref();
    const origingCity = ref();
    const destinyCountry = ref();
    const destinyCity = ref();

    onMounted(() => {
      getCountries(),
      getDestinyCountries()
    });

    watch(origingCountry, (newValue, oldValue) => {
      getCitiesFromSelectedCountry(newValue);
    });

    watch(origingCity, (newValue,oldValue) =>{
      destinyCity.value = '';
      getDestinyCitiesFromSelectedCountry(origingCountry.value, origingCity);
    });

    watch(destinyCountry, (newValue, oldValue) => {
      getDestinyCitiesFromSelectedCountry(newValue, origingCity);
    });

    return{
      origingCountry,
      origingCity,
      destinyCountry,
      destinyCity,
      origingCountries,
      origingCities,
      destinyCountries,
      destinyCities
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
</style>
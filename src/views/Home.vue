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
                <option v-for="(item, index) in countries" :key="index" >{{item.country}}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="origingCity" class="form-label">Cidade de origem {{cities}}</label>
              <div v-for="(city, index) in cities" :key="index">
                <select class="form-select" id="origingCity" v-model="origingCity" required>
                  <option disabled value="">Choose...{{city}}</option>
                  <option v-for="(item, index) in city" :key="index" >{{city}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <label for="country" class="form-label">País de destino</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="country" class="form-label">Cidade de destino</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
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
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
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
    const { countries, cities, getCountries, getCitiesFromSelectedCountry} = useData();    

    const origingCountry = ref();
    const origingCity = ref();

    onMounted(getCountries)

    watch(origingCountry, (newValue, oldValue) => {
      console.log("old value: " + oldValue + " New value: " + newValue)
      getCitiesFromSelectedCountry(newValue);
    });

    return{
      origingCountry,
      origingCity,
      countries,
      cities
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
const app = Vue.createApp({
  data() {
    return {
      selected: 'Prodotti'
    }
  },
  template: `
  <div class="minor">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Prodotti'"
        :class="{active: this.selected=='Prodotti'}"
        :aria-current="{page: this.selected=='Prodotti'}"
        href="#">Prodotti</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Inventario'"
        :class="{active: this.selected=='Inventario'}"
        :aria-current="{page: this.selected=='Inventario'}"
        href="#">Inventario</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Clienti'"
        :class="{active: this.selected=='Clienti'}"
        :aria-current="{page: this.selected=='Clienti'}"
        href="#">Clienti</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Noleggi'"
        :class="{active: this.selected=='Noleggi'}"
        :aria-current="{page: this.selected=='Noleggi'}"
        href="#">Noleggi</a>
      </li>
    </ul>
    <ChartSection v-if="this.selected=='Prodotti'" :name="'Prodotti'"/>
    <ChartSection v-if="this.selected=='Inventario'" :name="'Inventario'"/>
    <ChartSection v-if="this.selected=='Noleggi'" :name="'Noleggi'"/>
    <ChartSection v-if="this.selected=='Clienti'" :name="'Clienti'"/>
  </div>
  `
});

app.component(
  'ChartSection',
  { 
    data () {
      return {
        stats : [
          {
            dataNolo : [0,0,0,0,3,2,1,0,0,0,0,0],
            type: 'line',
            axis: 'x',
            month : [
              'Gennaio',
              'Febbraio',
              'Marzo',
              'Aprile',
              'Maggio',
              'Giugno',
              'Luglio',
              'Agosto',
              'Settembre',
              'Ottobre',
              'Novembre',
              'Dicembre'
            ],
            label : 'Numero di noleggi',
          },
          {
            dataNolo : [0,0,0,0,3,2,1,0,0,0,0,0],
            type: 'pie',
            axis: 'x',
            month : [
              'Gennaio',
              'Febbraio',
              'Marzo',
              'Aprile',
              'Maggio',
              'Giugno',
              'Luglio',
              'Agosto',
              'Settembre',
              'Ottobre',
              'Novembre',
              'Dicembre'
            ],
            label : 'Numero di noleggi',
          },
          {
            dataNolo : [0,0,0,0,3,2,1,0,0,0,0,0],
            type: 'bar',
            axis: 'x',
            month : [
              'Gennaio',
              'Febbraio',
              'Marzo',
              'Aprile',
              'Maggio',
              'Giugno',
              'Luglio',
              'Agosto',
              'Settembre',
              'Ottobre',
              'Novembre',
              'Dicembre'
            ],
            label : 'Numero di noleggi',
          },
        ]
      }
    },
    props: {
      name: String
    },
    template: `
    <div class="p-5 pt-3">
      <h2>{{name}}</h2>
      <div class="row" style="overflow: auto;">
        <div class="col" v-for="s in this.stats">
            <Chart :id_div="'chart_' + name + stats.indexOf(s)"
              :axis="s.axis"
              :type="s.type"
              :labels_x="s.month"
              :labeltotal="s.label"
              :data="s.dataNolo"/>
        </div>
      </div>
    </div>
    `
  }
);

app.component(
  'Chart',
  {
    props: {
      id_div: String,
      type: String,
      labels_x: Array,
      labeltotal: String,
      data: Array,
      axis: String
    },
    mounted () {
      var myChart = new Chart(
        document.getElementById(this.id_div), {
          type: this.type,
          data: {
            labels: this.labels_x,
            datasets: [{
              label: this.labeltotal,
              data: this.data,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: this.axis
          }
        });
    },
    template: `
    <canvas :id="this.id_div"></canvas>
    `
  }
);

app.mount('#app');

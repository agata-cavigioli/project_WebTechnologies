const app = Vue.createApp({
  data() {
    return {
      selected: 'Prodotti',
      filosofi : [],
      clients: [],
      nolos: []
    }
  },
  async mounted() {
    this.filosofi = await $.get('http://site202123.tw.cs.unibo.it/products');
    this.clients = await $.get('http://site202123.tw.cs.unibo.it/clients');
    this.nolos = await $.get('http://site202123.tw.cs.unibo.it/nolos');
  },
  methods: {
    arrayColumn : function(arr, n) {
      return arr.map(x => x[n])
    }, 
    doProds : function() {
      var prod_stats = [];
      var dictNumNolos = []; // create an empty array
      for (i in this.filosofi){
        dictNumNolos.push({
          id : this.filosofi[i].id,
          valore:   [this.filosofi[i].name, 0]

        });
      }

      for (j in this.nolos){
        for (id in dictNumNolos){
          if(this.nolos[j].product_id == dictNumNolos[id].id)
            dictNumNolos[id].valore[1]++;
        }
      }

      var filNumClassified = [];
      for (id in dictNumNolos){
        filNumClassified.push([dictNumNolos[id].valore[1],dictNumNolos[id].valore[0]]);
      }
      filNumClassified = filNumClassified.sort(function(a, b){return b[0]-a[0]});
      filNumClassified = filNumClassified.slice(0, 9);
      var filNumName = this.arrayColumn(filNumClassified, 1);
      filNumClassified = this.arrayColumn(filNumClassified, 0);

      prod_stats.push({
        dataNolo : filNumClassified,
        type: 'bar',
        axis: 'y',
        label_x: filNumName,
        label : 'Classifica del numero di noleggi'
      });



      var conditionPhil = [0,0,0]
      var conditions = ['Entusiasta','Stanco','Riflessivo']
      for (fil in this.filosofi){
        var s = this.filosofi[fil].nolo_data.condition;
        if (s == 'Entusiasta') conditionPhil[0]++;
        else if (s == 'Stanco') conditionPhil[1]++;
        else if (s == 'Riflessivo') conditionPhil[2]++;
      }

      prod_stats.push({
        dataNolo : conditionPhil,
        type: 'pie',
        axis: 'x',
        label_x: conditions,
        label : 'Condizione dei filosofi'
      });

      console.log(prod_stats);

      return prod_stats;
    }
  },
  template: `
  <div class="minor">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Prodotti'"
        :class="{active: this.selected=='Prodotti'}"
        :aria-current="page = this.selected=='Prodotti'"
        href="#">Prodotti</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Inventario'"
        :class="{active: this.selected=='Inventario'}"
        :aria-current="page = this.selected=='Inventario'"
        href="#">Inventario</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Clienti'"
        :class="{active: this.selected=='Clienti'}"
        :aria-current="page = this.selected=='Clienti'"
        href="#">Clienti</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"
        v-on:click="this.selected='Noleggi'"
        :class="{active: this.selected=='Noleggi'}"
        :aria-current="page = this.selected=='Noleggi'"
        href="#">Noleggi</a>
      </li>
    </ul>
    <ChartSection v-if="this.selected=='Prodotti'" :name="'Prodotti'" :stats="this.doProds()"/>
    <ChartSection v-if="this.selected=='Inventario'" :name="'Inventario'" :stats="this.inv_stats"/>
    <ChartSection v-if="this.selected=='Noleggi'" :name="'Noleggi'" :stats="this.nolo_stats"/>
    <ChartSection v-if="this.selected=='Clienti'" :name="'Clienti'" :stats="this.client_stats"/>
  </div>
  `
});

app.component(
  'ChartSection',
  { 
    data () {
      return {
        statas : [
          {
            dataNolo : [0,0,0,0,3,2,1,0,0,0,0,0],
            type: 'line',
            axis: 'x',
            label_x : [
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
            label_x : [
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
            label_x : [
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
      name: String,
      stats: Array
    },
    template: `
    <div class="p-5 pt-3">
      <h2>{{name}}</h2>
      <div class="row" style="overflow: auto;">
        <div class="col" v-for="s in this.stats">
            <Chart :id_div="'chart_' + name + this.stats.indexOf(s)"
              :axis="s.axis"
              :type="s.type"
              :labels_x="s.label_x"
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

var products;
var nols;
var clts;
$.get('//site202123.tw.cs.unibo.it/products', async function(data1){
  products = await data1;
  $.get('//site202123.tw.cs.unibo.it/clients', async function(data2){
    clts = await data2;

    $.get('//site202123.tw.cs.unibo.it/nolos', async function(data3){
      nols = await data3;

      const app = Vue.createApp({
        data() {
          return {
            selected: 'Prodotti',
            filosofi : products,
            clients: clts,
            nolos: nols
          }
        },
        methods: {
          arrayColumn : function(arr, n) {
            return arr.map(x => x[n])
          }, 
          sortObj: function(obj){
            var sort = [];
            for(name in obj){
              sort.push([name, obj[name]]);
            }

            sort.sort(function(a, b) {
              return b[1] - a[1];
            });

            var new_obj = {};
            sort.forEach(function(item){
              new_obj[item[0]] = item[1];
            })

            return new_obj;
          },
          calculateCost: function(nolo) {
            const date1 = new Date(nolo.date_from);
            const date2 = new Date(nolo.date_to);
            const diffTime = Math.abs(date2 - date1);
            const diffdate = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            var cost = (diffdate*nolo.nolo_data.daily_cost)-((diffdate*nolo.nolo_data.daily_cost*nolo.nolo_data.discount)/100)+nolo.nolo_data.other_fees;
            return cost;
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
            filNumClassified = filNumClassified.slice(0, 10);
            var filNumName = this.arrayColumn(filNumClassified, 1);
            filNumClassified = this.arrayColumn(filNumClassified, 0);

            prod_stats.push({
              dataNolo : filNumClassified,
              type: 'bar',
              axis: 'y',
              label_x: filNumName,
              label : 'Classifica del numero di noleggi'
            });

            /*******************************************************************/

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

            /*******************************************************************/

            var dictFactNolos = []; // create an empty array
            for (i in this.filosofi){
              dictFactNolos.push({
                id : this.filosofi[i].id,
                valore:   [this.filosofi[i].name,0]

              });
            }

            for (j in this.nolos){
              for (id in dictFactNolos){
                if(this.nolos[j].product_id == dictFactNolos[id].id){
                  var cost = this.calculateCost(this.nolos[j])
                  dictFactNolos[id].valore[1]+=cost;
                }
              }
            }

            var filFactClassified = [];
            for (id in dictFactNolos){
              filFactClassified.push(
                [dictFactNolos[id].valore[1],dictFactNolos[id].valore[0]]);
            }
            filFactClassified = filFactClassified.sort(function(a, b){return b[0]-a[0]});
            filFactClassified = filFactClassified.slice(0, 10);
            var filFactName = this.arrayColumn(filFactClassified, 1);
            filFactClassified = this.arrayColumn(filFactClassified, 0);

            prod_stats.push({
              dataNolo : filFactClassified,
              type: 'bar',
              axis: 'y',
              label_x: filFactName,
              label : 'Classifica dei filosofi per fatturato'
            });

            return prod_stats;
          },
          doNolos : function() {
            var nolo_stats = [];

            var dataNolo = [0,0,0,0,0,0,0,0,0,0,0,0];
            var month = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre','Ottobre', 'Novembre','Dicembre'];
            var label = 'Numero di noleggi';
            for (nol in this.nolos){
              var d1 = new Date(this.nolos[nol].date_from);
              var d2 = new Date(this.nolos[nol].date_to);
              dataNolo[d1.getMonth()]++;
              dataNolo[d2.getMonth()]++;
            }

            nolo_stats.push({
              dataNolo : dataNolo,
              type: 'bar',
              axis: 'x',
              label_x: month,
              label : 'Numero di noleggi'
            });

            /*************************************************************/

            var nolosClassified = [];
            for (nol in this.nolos){
              nolosClassified.push(
                [this.calculateCost(this.nolos[nol]),this.nolos[nol].id]);
            }
            nolosClassified = nolosClassified.sort(function(a, b){return b[0]-a[0]});
            nolosClassified = nolosClassified.slice(0, 10);
            var nolosClassifyName = this.arrayColumn(nolosClassified, 1);
            nolosClassified = this.arrayColumn(nolosClassified, 0);

            for (i in nolosClassifyName){
              nolosClassifyName[i] = "Id del noleggio: " +  nolosClassifyName[i];
            }

            nolo_stats.push({
              dataNolo : nolosClassified,
              type: 'bar',
              axis: 'y',
              label_x: nolosClassifyName,
              label : 'Classifica noleggi per fatturato'
            });


            /*************************************************************/

            var stateNolo = [0,0,0,0]
            var states = ['Prenotato', 'Iniziato', 'Concluso', 'In ritardo'];
            for (nol in this.nolos){
              var st = this.nolos[nol].status;
              if (st == 'Prenotato') stateNolo[0]++;
              else if (st == 'Iniziato') stateNolo[1]++;
              else if (st == 'Concluso') stateNolo[2]++;
              else if (st == 'In ritardo') stateNolo[3]++;
            }

            nolo_stats.push({
              dataNolo : stateNolo,
              type: 'pie',
              axis: 'y',
              label_x: states,
              label : 'Stato dei noleggi'
            });

            return nolo_stats;

          },
          doInv : function () {
            var inv_stats = [];

            var timeLivedPhil = [0,0,0,0]
            var times =
              ['Epoca Antica','Epoca Medievale','Epoca Moderna', 'Epoca Contemporanea']

            for (fil in this.filosofi){
              var s = this.filosofi[fil].birth;
              var d = this.filosofi[fil].death;
              if (s<=476 || s>d ) timeLivedPhil[0]++;
              else if (s<=1492) timeLivedPhil[1]++;
              else if (s<=1815) timeLivedPhil[2]++;
              else if (s<=2022) timeLivedPhil[3]++;
              else console.log("error");
            }

            inv_stats.push({
              dataNolo : timeLivedPhil,
              type: 'bar',
              axis: 'x',
              label_x: times,
              label : 'Numero filosofi per epoca'
            });

            /***************************************************************/

            var origins = {};

            for(f in this.filosofi){
              var fil = this.filosofi[f];

              if(fil.birth_p in origins) origins[fil.birth_p] += 1;
              else origins[fil.birth_p] = 1;

            }


            inv_stats.push({
              dataNolo : Object.values(origins),
              type: 'pie',
              axis: 'x',
              label_x: Object.keys(origins),
              label : 'Provenienza dei filosofi'
            });


            /***************************************************************/

            var subjs = {};

            for(f in this.filosofi){
              var fil = this.filosofi[f];

              var topics = fil.subjects.split(',');

              for (t in topics){
                var name = topics[t].trim();

                if(name in subjs) subjs[name]++;
                else subjs[name] = 1;
              }

            }

            inv_stats.push({
              dataNolo : Object.values(subjs),
              type: 'pie',
              axis: 'y',
              label_x: Object.keys(subjs),
              label : 'Tematiche'
            });


            return inv_stats;
          },
          doClients : function () {
            var cl_stats = [];

            var totals = {};
            var nolo_num = {};

            for(n in this.nolos){
              var nol = this.nolos[n];
              var id = nol.client_id

              var person = this.clients.find(el => el.id == id);
              var name;
              name = person ? person.name + ' ' + person.surname : 'Non in elenco';

              if (name in totals) totals[name] += this.calculateCost(nol);
              else totals[name] = this.calculateCost(nol);

              if (name in nolo_num) nolo_num[name] += 1;
              else nolo_num[name] = 1;
            }

            totals = this.sortObj(totals);
            nolo_num = this.sortObj(nolo_num);

            cl_stats.push({
              dataNolo : Object.values(totals).slice(0, 10),
              type: 'bar',
              axis: 'y',
              label_x: Object.keys(totals).slice(0, 10),
              label : 'Totale spesa per cliente'
            });

          cl_stats.push({
              dataNolo : Object.values(nolo_num).slice(0, 10),
              type: 'bar',
              axis: 'x',
              label_x: Object.keys(nolo_num).slice(0, 10),
              label : 'Numero di noleggi per cliente'
            });

            var avg = {};

            for(name in totals){
              avg[name] = Math.round(100*totals[name] / nolo_num[name])/100;
            }

            avg = this.sortObj(avg);

            cl_stats.push({
              dataNolo : Object.values(avg).slice(0, 10),
              type: 'bar',
              axis: 'x',
              label_x: Object.keys(avg).slice(0, 10),
              label : 'Spesa media per cliente'
            });


            return cl_stats;
          }

        },
        template: `
  <div class="minor">
  <nav id="the_nav">
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
  </nav>
  <div class="border rounded">
    <ChartSection tabindex=0 v-if="this.selected=='Prodotti'" :name="'Prodotti'" :stats="this.doProds()"/>
    <ChartSection tabindex=0 v-if="this.selected=='Inventario'" :name="'Inventario'" :stats="this.doInv()"/>
    <ChartSection tabindex=0 v-if="this.selected=='Noleggi'" :name="'Noleggi'" :stats="this.doNolos()"/>
    <ChartSection tabindex=0 v-if="this.selected=='Clienti'" :name="'Clienti'" :stats="this.doClients()"/>
  </div>
  </div>
  `
      });

      app.component(
        'ChartSection',
        { 
          props: {
            name: String,
            stats: Array
          },
          template: `
    <div class="p-2 p-lg-5 pt-lg-3">
      <h2>{{name}}</h2>
      <div class="row" style="overflow: auto;">
        <div class="col-12 col-lg-4" v-for="s in this.stats">
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
          <div class="card p-3" tabindex=0 style="overflow-y: scroll;">
          <h3 class="h4">{{this.labeltotal}}</h3>
            <canvas class="w-100" :id="this.id_div" :aria-label="this.labeltotal"
                    role="img"><p>{{this.labeltotal}}</p></canvas>
            <table class="mt-5 table">
              <caption>{{this.labeltotal}}</caption>
              <tr v-for="l in this.labels_x">
                <th scope="row">{{l}}</th>
                <td>{{this.data[this.labels_x.indexOf(l)]}}</td>
              </tr>
            </table>
          </div>
    `
        }
      );

      app.mount('#app');
    });
  });
});

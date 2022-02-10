<template>
  <div class="bg-white p-3 row">
    <div class="table-responsive col-lg-8 col-12">
      <table id="twrap" class="text-start
      table table-striped table-hover 
      ">
        <thead id="header" >
          <tr>
            <th scope="col">
              Nome
              <form class="d-flex">
                <input
                  v-model="name"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Nascita
              <form class="d-flex">
                <input
                  v-model="birth"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Luogo Nascita
              <form class="d-flex">
                <input
                  v-model="birth_place"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Morte
              <form class="d-flex">
                <input
                  v-model="death"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Luogo Morte
              <form class="d-flex">
                <input
                  v-model="death_place"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
            <th scope="col">
              Tematiche
              <form class="d-flex">
                <input
                  v-model="subject"
                  class="form-control me-2"
                  type="search"
                  placeholder="..."
                  aria-label="Search">
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="philosopher in this.prods">
            <td href="card" v-if="philosopher['Philosophers'].includes(this.name) &&
            philosopher['Born'].includes(this.birth) &&
            philosopher['Birth place'].includes(this.birth_place) &&
            philosopher['Died'].includes(this.death) && 
            philosopher['Place of Death'].includes(this.death_place) &&
            philosopher['Subjects Of Study'].includes(this.subject)"
                            v-on:click="this.selectedProduct = philosopher"
                            v-for="field in philosopher">
              {{field}}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row justify-content-start g-3">
        <div class="col col-lg-2">
          <button class="w-100 btn btn-primary mb-2"
                  href="#header"
                  type="">
            Nuovo 
          </button>
        </div>
        <div class="col col-lg-2">
          <a class="w-100 btn btn-primary mb-2"
             v-on:click="this.name='';
             this.birth='';
             this.birth_place='';
             this.death='';
             this.death_place='';
             this.subject='';" 
             href="#header"
             role="button"
             type="reset">
            Reset
          </a>
        </div>
        <div class="col col-lg-2">
          <a class="w-100 btn btn-primary mb-2"
             href="#header"
             v-on:click="this.prods = this.test()"
             role="button">
            Top
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-12 ">
      <ProductCard id="card"
                   v-if="this.selectedProduct != undefined"
                   :product="this.selectedProduct"/>
      <h4 v-else> No product selected.</h4>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProductCard from './ProductCard.vue'

export default {

  name: 'TheInventory',
  props: ['products', 'test'],
  components: {
    ProductCard
  },
  data () {
    return {
      selectedProduct: undefined,
      name: '',
      birth: '',
      birth_place: '',
      death: '',
      death_place: '',
      subject: '',
      fields : ['Nome', 'Nascita', 'Luogo Nascita', 'Morte', 'Luogo Morte', 'Tematiche'],
      prods : this.products(),
      prod : [
        {
          "Philosophers": "Aaron David Gordon",
          "Born": "1856",
          "Birth place": "Ukraine",
          "Died": "1922",
          "Place of Death": "Palestine",
          "Subjects Of Study": "Agriculture, Zionism"
        },
        {
          "Philosophers": "Abraham Joshua Heschel",
          "Born": "1907",
          "Birth place": "Poland",
          "Died": "1972",
          "Place of Death": "York",
          "Subjects Of Study": "Judaism, Philosophy Of Religion"
        },
        {
          "Philosophers": "Albert of Saxony",
          "Born": "1316",
          "Birth place": "Germany",
          "Died": "1390",
          "Place of Death": "Germany",
          "Subjects Of Study": "Gravity"
        },
        {
          "Philosophers": "Alessandro Achillini",
          "Born": "1463",
          "Birth place": "Italy",
          "Died": "1512",
          "Place of Death": "Bologna",
          "Subjects Of Study": "William Of Ockham"
        },
        {
          "Philosophers": "Alexander Gottlieb Baumgarten",
          "Born": "1714",
          "Birth place": "Germany",
          "Died": "1762",
          "Place of Death": "Germany",
          "Subjects Of Study": "Aesthetics, Gottfried Wilhelm Leibniz, Feeling, Christian, Baron Von Wolff"
        },
        {
          "Philosophers": "Alexius Meinong",
          "Born": "1853",
          "Birth place": "Ukraine",
          "Died": "1920",
          "Place of Death": "Austria",
          "Subjects Of Study": "Objectivism, Intentionality"
        },
        {
          "Philosophers": "Alfred Firmin Loisy",
          "Born": "1857",
          "Birth place": "France",
          "Died": "1940",
          "Place of Death": "France",
          "Subjects Of Study": "Philosophy Of Religion, Modernism"
        },
        {
          "Philosophers": "Alfred Korzybski",
          "Born": "1879",
          "Birth place": "Poland",
          "Died": "1950",
          "Place of Death": "Connecticut",
          "Subjects Of Study": "Semantics, General Semantics"
        },
        {
          "Philosophers": "Alfred North Whitehead",
          "Born": "1861",
          "Birth place": "England",
          "Died": "1947",
          "Place of Death": "Massachusetts",
          "Subjects Of Study": "Education, Mathematics, Philosophy Of Science, Formal Logic, Materialism"
        },
        {
          "Philosophers": "Allan Bloom",
          "Born": "1930",
          "Birth place": "Indiana",
          "Died": "1992",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Higher Education"
        },
        {
          "Philosophers": "Anaxagoras",
          "Born": "500",
          "Birth place": "Clazomenae",
          "Died": "428",
          "Place of Death": "Lampsacus",
          "Subjects Of Study": "Eclipse, Cosmology, Nous"
        },
        {
          "Philosophers": "Anicius Manlius Severinus Boethius",
          "Born": "475",
          "Birth place": "Italy",
          "Died": "524",
          "Place of Death": "Italy",
          "Subjects Of Study": "Aristotelianism, Universal, Trinity, Porphyry, Free Will"
        },
        {
          "Philosophers": "Antonio Labriola",
          "Born": "1843",
          "Birth place": "Sicilies",
          "Died": "1904",
          "Place of Death": "Italy",
          "Subjects Of Study": "Socialism, Historical Materialism"
        },
        {
          "Philosophers": "Antonio Rosmini-Serbati",
          "Born": "1797",
          "Birth place": "Italy",
          "Died": "1855",
          "Place of Death": "Italy",
          "Subjects Of Study": "Philosophy Of Religion"
        },
        {
          "Philosophers": "Antony Flew",
          "Born": "1923",
          "Birth place": "England",
          "Died": "2010",
          "Place of Death": "England",
          "Subjects Of Study": "Atheism, Philosophy Of Religion, Theology"
        },
        {
          "Philosophers": "Aristotle",
          "Born": "384",
          "Birth place": "Greece",
          "Died": "322",
          "Place of Death": "Greece",
          "Subjects Of Study": "Biology, Rhetoric, Aristotelianism, Zoology, Universal"
        },
        {
          "Philosophers": "Armando Carlini",
          "Born": "1878",
          "Birth place": "Italy",
          "Died": "1959",
          "Place of Death": "Italy",
          "Subjects Of Study": "Phenomenon"
        },
        {
          "Philosophers": "Arthur O. Lovejoy",
          "Born": "1873",
          "Birth place": "Germany",
          "Died": "1962",
          "Place of Death": "Maryland",
          "Subjects Of Study": "Great Chain Of Being"
        },
        {
          "Philosophers": "Arthur Schopenhauer",
          "Born": "1788",
          "Birth place": "Poland",
          "Died": "1860",
          "Place of Death": "Germany",
          "Subjects Of Study": "Philosophy Of Art, Panpsychism"
        },
        {
          "Philosophers": "Arthur Stanley Eddington",
          "Born": "1882",
          "Birth place": "England",
          "Died": "1944",
          "Place of Death": "England",
          "Subjects Of Study": "Star, Relativity, Globular Cluster, Physical Constant, Special Relativity"
        },
        {
          "Philosophers": "Ashvaghosha",
          "Born": "80",
          "Birth place": "India",
          "Died": "150",
          "Place of Death": "Pakistan",
          "Subjects Of Study": "Mahayana"
        },
        {
          "Philosophers": "Auguste Comte",
          "Born": "1798",
          "Birth place": "France",
          "Died": "1857",
          "Place of Death": "France",
          "Subjects Of Study": "Sociology, Social Evolution"
        },
        {
          "Philosophers": "Averroes",
          "Born": "1126",
          "Birth place": "Spain",
          "Died": "1198",
          "Place of Death": "Marrakech",
          "Subjects Of Study": "Islam, Platonism, Aristotelianism, Greek Philosophy"
        },
        {
          "Philosophers": "Avicenna",
          "Born": "980",
          "Birth place": "Uzbekistan",
          "Died": "1037",
          "Place of Death": "Iran",
          "Subjects Of Study": "Islam, History Of Medicine, Aristotelianism, Greek Philosophy"
        },
        {
          "Philosophers": "Bartolome de Medina",
          "Born": "1528",
          "Birth place": "Spain",
          "Died": "1580",
          "Place of Death": "Spain",
          "Subjects Of Study": "Casuistry, Probabilism"
        },
        {
          "Philosophers": "Benedetto Croce",
          "Born": "1866",
          "Birth place": "Italy",
          "Died": "1952",
          "Place of Death": "Italy",
          "Subjects Of Study": "Political Philosophy, Philosophy Of History, Spiritualism"
        },
        {
          "Philosophers": "Benedict de Spinoza",
          "Born": "1632",
          "Birth place": "Netherlands",
          "Died": "1677",
          "Place of Death": "Netherlands",
          "Subjects Of Study": "Pantheism, Mind-Body Dualism"
        },
        {
          "Philosophers": "Bernard Bosanquet",
          "Born": "1848",
          "Birth place": "England",
          "Died": "1923",
          "Place of Death": "England",
          "Subjects Of Study": "Ethics, Metaphysics, Aesthetics, Political Philosophy, Logic"
        },
        {
          "Philosophers": "Bernard de Mandeville",
          "Born": "1670",
          "Birth place": "Netherlands",
          "Died": "1733",
          "Place of Death": "England",
          "Subjects Of Study": "Virtue"
        },
        {
          "Philosophers": "Bertrand Russell",
          "Born": "1872",
          "Birth place": "Wales",
          "Died": "1970",
          "Place of Death": "Wales",
          "Subjects Of Study": "Formal Logic, Nuclear Weapon, Russell\u2019S Paradox, Disarmament, Axiomatic Method"
        },
        {
          "Philosophers": "Bessarion",
          "Born": "1403",
          "Birth place": "Turkey",
          "Died": "1472",
          "Place of Death": "Italy",
          "Subjects Of Study": "Greek Literature, Platonism"
        },
        {
          "Philosophers": "Bhartrihari",
          "Born": "570",
          "Birth place": "India",
          "Died": "651",
          "Place of Death": "India",
          "Subjects Of Study": "Philosophy Of Language, Shabdadvaita"
        },
        {
          "Philosophers": "Blaise Pascal",
          "Born": "1623",
          "Birth place": "France",
          "Died": "1662",
          "Place of Death": "France",
          "Subjects Of Study": "Probability, Conic Section, Pascal\u2019S Triangle, Cycloid, Pascal\u2019S Principle"
        },
        {
          "Philosophers": "Blessed John Duns Scotus",
          "Born": "1266",
          "Birth place": "Scotland",
          "Died": "1308",
          "Place of Death": "Germany",
          "Subjects Of Study": "Scholasticism, Realism, Incarnation, Immaculate Conception, Divine Union"
        },
        {
          "Philosophers": "Carl Gustav Hempel",
          "Born": "1905",
          "Birth place": "Germany",
          "Died": "1997",
          "Place of Death": "Jersey",
          "Subjects Of Study": "Philosophy Of Science, Scientific Theory, Covering-Law Model"
        },
        {
          "Philosophers": "Charles Sanders Peirce",
          "Born": "1839",
          "Birth place": "Massachusetts",
          "Died": "1914",
          "Place of Death": "Pennsylvania",
          "Subjects Of Study": "Category, Induction, Abduction"
        },
        {
          "Philosophers": "Cheng Hao",
          "Born": "1032",
          "Birth place": "China",
          "Died": "1085",
          "Place of Death": "China",
          "Subjects Of Study": "Li, Neo-Confucianism"
        },
        {
          "Philosophers": "Cheng Yi",
          "Born": "1033",
          "Birth place": "China",
          "Died": "1107",
          "Place of Death": "China",
          "Subjects Of Study": "Li, Neo-Confucianism, Lixue"
        },
        {
          "Philosophers": "Claude-Adrien Helvetius",
          "Born": "1715",
          "Birth place": "France",
          "Died": "1771",
          "Place of Death": "France",
          "Subjects Of Study": "Education"
        },
        {
          "Philosophers": "Confucius",
          "Born": "551",
          "Birth place": "China",
          "Died": "479",
          "Place of Death": "China",
          "Subjects Of Study": "Ren, Junzi, Xiao, Li, 'Shijing'"
        },
        {
          "Philosophers": "David Friedrich Strauss",
          "Born": "1808",
          "Birth place": "Germany",
          "Died": "1874",
          "Place of Death": "Germany",
          "Subjects Of Study": "Rationalism, Religion, Dialectic"
        },
        {
          "Philosophers": "David Hartley",
          "Born": "1705",
          "Birth place": "England",
          "Died": "1757",
          "Place of Death": "England",
          "Subjects Of Study": "Associationism"
        },
        {
          "Philosophers": "David Hume",
          "Born": "1711",
          "Birth place": "Scotland",
          "Died": "1776",
          "Place of Death": "Scotland",
          "Subjects Of Study": "England, Miracle, Idea, Neutral Monism, Causation"
        },
        {
          "Philosophers": "Denis Diderot",
          "Born": "1713",
          "Birth place": "France",
          "Died": "1784",
          "Place of Death": "France",
          "Subjects Of Study": "Dramatic Literature"
        },
        {
          "Philosophers": "Derek Parfit",
          "Born": "1942",
          "Birth place": "China",
          "Died": "2017",
          "Place of Death": "England",
          "Subjects Of Study": "Personal Identity, Triple Theory"
        },
        {
          "Philosophers": "Dong Zhongshu",
          "Born": "179",
          "Birth place": "China",
          "Died": "104",
          "Place of Death": "China",
          "Subjects Of Study": "Yinyang"
        },
        {
          "Philosophers": "Edith Stein",
          "Born": "1891",
          "Birth place": "Poland",
          "Died": "1942",
          "Place of Death": "Poland",
          "Subjects Of Study": "Phenomenology, Thomism"
        },
        {
          "Philosophers": "Edmund Husserl",
          "Born": "1859",
          "Birth place": "Czechoslovakia",
          "Died": "1938",
          "Place of Death": "Germany",
          "Subjects Of Study": "Consciousness, Eidetic Reduction, Phenomenological Reduction"
        },
        {
          "Philosophers": "Eduard von Hartmann",
          "Born": "1842",
          "Birth place": "Germany",
          "Died": "1906",
          "Place of Death": "Germany",
          "Subjects Of Study": "Rationalism, Irrationalism, Unconscious"
        },
        {
          "Philosophers": "Edward Caird",
          "Born": "1835",
          "Birth place": "Scotland",
          "Died": "1908",
          "Place of Death": "England",
          "Subjects Of Study": "Immanuel Kant, Theology"
        },
        {
          "Philosophers": "Edward Westermarck",
          "Born": "1862",
          "Birth place": "Finland",
          "Died": "1939",
          "Place of Death": "Finland",
          "Subjects Of Study": "Primitive Culture, Marriage, Ethical Relativism, Morality"
        },
        {
          "Philosophers": "Emmanuel Levinas",
          "Born": "1906",
          "Birth place": "Lithuania",
          "Died": "1995",
          "Place of Death": "France",
          "Subjects Of Study": "Judaism"
        },
        {
          "Philosophers": "Empedocles",
          "Born": "490",
          "Birth place": "Italy",
          "Died": "430",
          "Place of Death": "Greece",
          "Subjects Of Study": "Cosmology, Reincarnation, Strife, Element"
        },
        {
          "Philosophers": "Erich Frank",
          "Born": "1883",
          "Birth place": "Republic",
          "Died": "1949",
          "Place of Death": "Netherlands",
          "Subjects Of Study": "Faith"
        },
        {
          "Philosophers": "Erich Fromm",
          "Born": "1900",
          "Birth place": "Germany",
          "Died": "1980",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Self-Image"
        },
        {
          "Philosophers": "Ernest Nagel",
          "Born": "1901",
          "Birth place": "Czechoslovakia",
          "Died": "1985",
          "Place of Death": "York",
          "Subjects Of Study": "Logic, Scientific Method"
        },
        {
          "Philosophers": "Ernest Renan",
          "Born": "1823",
          "Birth place": "France",
          "Died": "1892",
          "Place of Death": "France",
          "Subjects Of Study": "Judaism, Jesus, Rationalism, Religion, Early Church"
        },
        {
          "Philosophers": "Ernst Mach",
          "Born": "1838",
          "Birth place": "Austria",
          "Died": "1916",
          "Place of Death": "Germany",
          "Subjects Of Study": "Measurement, Wave, Sensation, Mach Number, Mach\u2019S Principle"
        },
        {
          "Philosophers": "Ernst Troeltsch",
          "Born": "1865",
          "Birth place": "Germany",
          "Died": "1923",
          "Place of Death": "Germany",
          "Subjects Of Study": "Christianity, Philosophy Of Religion, Historicism, Society, Relativism"
        },
        {
          "Philosophers": "Erwin Schrodinger",
          "Born": "1887",
          "Birth place": "Austria",
          "Died": "1961",
          "Place of Death": "Austria",
          "Subjects Of Study": "Quantum, Schr\u00f6dinger Equation"
        },
        {
          "Philosophers": "Etienne Bonnot de Condillac",
          "Born": "1715",
          "Birth place": "France",
          "Died": "1780",
          "Place of Death": "France",
          "Subjects Of Study": "John Locke, Sensation"
        },
        {
          "Philosophers": "Etienne Gilson",
          "Born": "1884",
          "Birth place": "France",
          "Died": "1978",
          "Place of Death": "France",
          "Subjects Of Study": "Middle Ages"
        },
        {
          "Philosophers": "Ferdinand Christian Baur",
          "Born": "1792",
          "Birth place": "Germany",
          "Died": "1860",
          "Place of Death": "Germany",
          "Subjects Of Study": "Christianity, Hegelianism"
        },
        {
          "Philosophers": "Francisco Suarez",
          "Born": "1548",
          "Birth place": "Spain",
          "Died": "1617",
          "Place of Death": "Lisbon",
          "Subjects Of Study": "Church And State, Theocracy"
        },
        {
          "Philosophers": "Franciscus Hemsterhuis",
          "Born": "1721",
          "Birth place": "Netherlands",
          "Died": "1790",
          "Place of Death": "Netherlands",
          "Subjects Of Study": "Aesthetics, Rationalism, Sensationalism"
        },
        {
          "Philosophers": "Franz Brentano",
          "Born": "1838",
          "Birth place": "Germany",
          "Died": "1917",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Intentionality, Intentionalism"
        },
        {
          "Philosophers": "Franz Rosenzweig",
          "Born": "1886",
          "Birth place": "Germany",
          "Died": "1929",
          "Place of Death": "Germany",
          "Subjects Of Study": "Judaism, Existentialism"
        },
        {
          "Philosophers": "Frederick Robert Tennant",
          "Born": "1866",
          "Birth place": "England",
          "Died": "1957",
          "Place of Death": "England",
          "Subjects Of Study": "Theism, Argument From Design"
        },
        {
          "Philosophers": "Friedrich Nietzsche",
          "Born": "1844",
          "Birth place": "Germany",
          "Died": "1900",
          "Place of Death": "Germany",
          "Subjects Of Study": "Philosophy Of Art"
        },
        {
          "Philosophers": "Friedrich Schleiermacher",
          "Born": "1768",
          "Birth place": "Poland",
          "Died": "1834",
          "Place of Death": "Germany",
          "Subjects Of Study": "Protestantism"
        },
        {
          "Philosophers": "Friedrich Theodor von Vischer",
          "Born": "1807",
          "Birth place": "Germany",
          "Died": "1887",
          "Place of Death": "Austria",
          "Subjects Of Study": "Literature, Realism"
        },
        {
          "Philosophers": "Friedrich Wilhelm Joseph von Schelling",
          "Born": "1775",
          "Birth place": "Germany",
          "Died": "1854",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Ego, Consciousness, Free Will, Absolute"
        },
        {
          "Philosophers": "Fritz Mauthner",
          "Born": "1849",
          "Birth place": "Bohemia",
          "Died": "1923",
          "Place of Death": "Germany",
          "Subjects Of Study": "Language, Epistemology"
        },
        {
          "Philosophers": "Fyodor Ippolitovich Shcherbatskoy",
          "Born": "1866",
          "Birth place": "Poland",
          "Died": "1942",
          "Place of Death": "Union",
          "Subjects Of Study": "Buddhism, Indian Philosophy, Logic"
        },
        {
          "Philosophers": "Gabriel Biel",
          "Born": "1420",
          "Birth place": "Speyer",
          "Died": "1495",
          "Place of Death": "W\u00fcrttemberg",
          "Subjects Of Study": "Scholasticism, Political Economy, William Of Ockham, Economic Theory"
        },
        {
          "Philosophers": "Gaston Frommel",
          "Born": "1862",
          "Birth place": "Switzerland",
          "Died": "1906",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Theism"
        },
        {
          "Philosophers": "Ge Hong",
          "Born": "283",
          "Birth place": "China",
          "Died": "343",
          "Place of Death": "China",
          "Subjects Of Study": "Ethics, Daoism, Confucianism, Alchemy"
        },
        {
          "Philosophers": "Georg Bernhard Bilfinger",
          "Born": "1693",
          "Birth place": "Germany",
          "Died": "1750",
          "Place of Death": "Germany",
          "Subjects Of Study": "Gottfried Wilhelm Leibniz, Christian, Baron Von Wolff, Possibility, Monad"
        },
        {
          "Philosophers": "Georg Brandes",
          "Born": "1842",
          "Birth place": "Denmark",
          "Died": "1927",
          "Place of Death": "Denmark",
          "Subjects Of Study": "Literature, Michelangelo, Julius Caesar, Voltaire, Naturalism"
        },
        {
          "Philosophers": "Georg Simmel",
          "Born": "1858",
          "Birth place": "Germany",
          "Died": "1918",
          "Place of Death": "Germany",
          "Subjects Of Study": "Economics, Money, Human Being, Social Interaction"
        },
        {
          "Philosophers": "Georg Wilhelm Friedrich Hegel",
          "Born": "1770",
          "Birth place": "Germany",
          "Died": "1831",
          "Place of Death": "Germany",
          "Subjects Of Study": "Rationalism, Absolute Idealism, Dialectic, Absolute Spirit, Geist"
        },
        {
          "Philosophers": "George Gemistus Plethon",
          "Born": "1355",
          "Birth place": "Turkey",
          "Died": "1452",
          "Place of Death": "Greece",
          "Subjects Of Study": "Aristotelianism, Neoplatonism"
        },
        {
          "Philosophers": "George Grant",
          "Born": "1918",
          "Birth place": "Canada",
          "Died": "1988",
          "Place of Death": "Canada",
          "Subjects Of Study": "Canada, Nationalism"
        },
        {
          "Philosophers": "George Henry Lewes",
          "Born": "1817",
          "Birth place": "England",
          "Died": "1878",
          "Place of Death": "England",
          "Subjects Of Study": "Science"
        },
        {
          "Philosophers": "George Herbert Mead",
          "Born": "1863",
          "Birth place": "Massachusetts",
          "Died": "1931",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Language, Social Interaction"
        },
        {
          "Philosophers": "George Santayana",
          "Born": "1863",
          "Birth place": "Spain",
          "Died": "1952",
          "Place of Death": "Italy",
          "Subjects Of Study": "Skepticism, Poetry, Faith, Reason, Essence"
        },
        {
          "Philosophers": "George Trumbull Ladd",
          "Born": "1842",
          "Birth place": "Ohio",
          "Died": "1921",
          "Place of Death": "Connecticut",
          "Subjects Of Study": "Biological Psychology, Functionalism, Experimental Psychology"
        },
        {
          "Philosophers": "George Tyrrell",
          "Born": "1861",
          "Birth place": "Ireland",
          "Died": "1909",
          "Place of Death": "England",
          "Subjects Of Study": "Theological Liberalism, Modernism"
        },
        {
          "Philosophers": "Geraud de Cordemoy",
          "Born": "1620",
          "Birth place": "France",
          "Died": "1684",
          "Place of Death": "France",
          "Subjects Of Study": "Animal Magnetism, Matter"
        },
        {
          "Philosophers": "Giambattista Vico",
          "Born": "1668",
          "Birth place": "Italy",
          "Died": "1744",
          "Place of Death": "Italy",
          "Subjects Of Study": "Philosophical Anthropology, Providence, Social Evolution"
        },
        {
          "Philosophers": "Giles of Rome",
          "Born": "1243",
          "Birth place": "Italy",
          "Died": "1316",
          "Place of Death": "France",
          "Subjects Of Study": "Aristotelianism, Scholasticism, Papacy, Thomism, Authority"
        },
        {
          "Philosophers": "Gilles Deleuze",
          "Born": "1925",
          "Birth place": "France",
          "Died": "1995",
          "Place of Death": "France",
          "Subjects Of Study": "Metaphysics"
        },
        {
          "Philosophers": "Gottfried Wilhelm Leibniz",
          "Born": "1646",
          "Birth place": "Germany",
          "Died": "1716",
          "Place of Death": "Germany",
          "Subjects Of Study": "Problem Of Evil, Personalism, Differentiation, Best Of All Possible Worlds, Integration"
        },
        {
          "Philosophers": "Gotthold Ephraim Lessing",
          "Born": "1729",
          "Birth place": "Germany",
          "Died": "1781",
          "Place of Death": "Germany",
          "Subjects Of Study": "Dramatic Literature"
        },
        {
          "Philosophers": "Gottlob Frege",
          "Born": "1848",
          "Birth place": "Germany",
          "Died": "1925",
          "Place of Death": "Germany",
          "Subjects Of Study": "Variable, Quantifier"
        },
        {
          "Philosophers": "Gregory of Rimini",
          "Born": "1300",
          "Birth place": "Italy",
          "Died": "1358",
          "Place of Death": "Austria",
          "Subjects Of Study": "Grace"
        },
        {
          "Philosophers": "Gu Yanwu",
          "Born": "1613",
          "Birth place": "China",
          "Died": "1682",
          "Place of Death": "China",
          "Subjects Of Study": "Confucianism"
        },
        {
          "Philosophers": "Gustav Theodor Fechner",
          "Born": "1801",
          "Birth place": "Germany",
          "Died": "1887",
          "Place of Death": "Germany",
          "Subjects Of Study": "Perception, Sensation, Weber\u2019S Law"
        },
        {
          "Philosophers": "Hajji Hadi Sabzevari",
          "Born": "1798",
          "Birth place": "Iran",
          "Died": "1878",
          "Place of Death": "Iran",
          "Subjects Of Study": "\u1e24ikmah"
        },
        {
          "Philosophers": "Hannah Arendt",
          "Born": "1906",
          "Birth place": "Germany",
          "Died": "1975",
          "Place of Death": "York",
          "Subjects Of Study": "Anti-Semitism, Adolf Eichmann, Totalitarianism, Trial"
        },
        {
          "Philosophers": "Hans Reichenbach",
          "Born": "1891",
          "Birth place": "Germany",
          "Died": "1953",
          "Place of Death": "California",
          "Subjects Of Study": "Probability Theory, Induction"
        },
        {
          "Philosophers": "Hans-Georg Gadamer",
          "Born": "1900",
          "Birth place": "Germany",
          "Died": "2002",
          "Place of Death": "Germany",
          "Subjects Of Study": "Hermeneutics"
        },
        {
          "Philosophers": "Harry S. Broudy",
          "Born": "1905",
          "Birth place": "Poland",
          "Died": "1998",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Education, Philosophy Of Education, Psychology"
        },
        {
          "Philosophers": "Hatano Seiichi",
          "Born": "1877",
          "Birth place": "Japan",
          "Died": "1950",
          "Place of Death": "Japan",
          "Subjects Of Study": "Christianity"
        },
        {
          "Philosophers": "Hayashi Razan",
          "Born": "1583",
          "Birth place": "Japan",
          "Died": "1657",
          "Place of Death": "Japan",
          "Subjects Of Study": "Shint\u014d, Zhu Xi, Neo-Confucianism"
        },
        {
          "Philosophers": "He Yan",
          "Born": "193",
          "Birth place": "China",
          "Died": "249",
          "Place of Death": "China",
          "Subjects Of Study": "Daoism, Confucianism, Wuwei, Wu, Qingtan"
        },
        {
          "Philosophers": "Hemachandra",
          "Born": "1088",
          "Birth place": "India",
          "Died": "1172",
          "Place of Death": "India",
          "Subjects Of Study": "Jainism"
        },
        {
          "Philosophers": "Henri Bergson",
          "Born": "1859",
          "Birth place": "France",
          "Died": "1941",
          "Place of Death": "France",
          "Subjects Of Study": "Evolution, Time, Human Intelligence, Memory, Instinct"
        },
        {
          "Philosophers": "Henri Berr",
          "Born": "1863",
          "Birth place": "France",
          "Died": "1954",
          "Place of Death": "France",
          "Subjects Of Study": "Philosophy Of History"
        },
        {
          "Philosophers": "Henri Poincare",
          "Born": "1854",
          "Birth place": "France",
          "Died": "1912",
          "Place of Death": "France",
          "Subjects Of Study": "Relativity, Fuchsian Function, Automorphic Function, N-Body Problem"
        },
        {
          "Philosophers": "Henry Longueville Mansel",
          "Born": "1820",
          "Birth place": "England",
          "Died": "1871",
          "Place of Death": "England",
          "Subjects Of Study": "Philosophy, Sir William Hamilton, 9Th Baronet, Knowledge"
        },
        {
          "Philosophers": "Henry Sidgwick",
          "Born": "1838",
          "Birth place": "England",
          "Died": "1900",
          "Place of Death": "England",
          "Subjects Of Study": "Ethics, Utilitarianism, Egoism, Categorical Imperative, Intuitionism"
        },
        {
          "Philosophers": "Herbert Spencer",
          "Born": "1820",
          "Birth place": "England",
          "Died": "1903",
          "Place of Death": "England",
          "Subjects Of Study": "Evolution, Social Change, Social Structure, Cultural Evolution, Survival Of The Fittest"
        },
        {
          "Philosophers": "Hermann Cohen",
          "Born": "1842",
          "Birth place": "Germany",
          "Died": "1918",
          "Place of Death": "Germany",
          "Subjects Of Study": "Judaism"
        },
        {
          "Philosophers": "Hermann von Helmholtz",
          "Born": "1821",
          "Birth place": "Germany",
          "Died": "1894",
          "Place of Death": "Germany",
          "Subjects Of Study": "Electricity, Sound, Wave, Non-Euclidean Geometry, Conservation Of Energy"
        },
        {
          "Philosophers": "Ibn Gabirol",
          "Born": "1022",
          "Birth place": "Spain",
          "Died": "1070",
          "Place of Death": "Spain",
          "Subjects Of Study": "Neoplatonism"
        },
        {
          "Philosophers": "Immanuel Kant",
          "Born": "1724",
          "Birth place": "Prussia",
          "Died": "1804",
          "Place of Death": "Prussia",
          "Subjects Of Study": "Political Philosophy, Immortality, Existence Of God, Teleology, Category"
        },
        {
          "Philosophers": "Isaak August Dorner",
          "Born": "1809",
          "Birth place": "Germany",
          "Died": "1884",
          "Place of Death": "Germany",
          "Subjects Of Study": "Protestantism, Kantianism"
        },
        {
          "Philosophers": "Ito Jinsai",
          "Born": "1627",
          "Birth place": "Japan",
          "Died": "1705",
          "Place of Death": "Japan",
          "Subjects Of Study": "Kogaku"
        },
        {
          "Philosophers": "Jacob Moleschott",
          "Born": "1822",
          "Birth place": "Netherlands",
          "Died": "1893",
          "Place of Death": "Italy",
          "Subjects Of Study": "Thought, Emotion"
        },
        {
          "Philosophers": "Jacques Derrida",
          "Born": "1930",
          "Birth place": "Algeria",
          "Died": "2004",
          "Place of Death": "France",
          "Subjects Of Study": "Metaphysics, Deconstruction, Philosophy"
        },
        {
          "Philosophers": "Jacques Maritain",
          "Born": "1882",
          "Birth place": "France",
          "Died": "1973",
          "Place of Death": "France",
          "Subjects Of Study": "Thomas Aquinas, Saint"
        },
        {
          "Philosophers": "Jaime Luciano Balmes",
          "Born": "1810",
          "Birth place": "Spain",
          "Died": "1848",
          "Place of Death": "Spain",
          "Subjects Of Study": "Roman Catholicism"
        },
        {
          "Philosophers": "Jakob Bohme",
          "Born": "1575",
          "Birth place": "Germany",
          "Died": "1624",
          "Place of Death": "Germany",
          "Subjects Of Study": "Mysticism, Alchemy, Paracelsus, Dialectic, Free Will"
        },
        {
          "Philosophers": "James Frederick Ferrier",
          "Born": "1808",
          "Birth place": "Scotland",
          "Died": "1864",
          "Place of Death": "Scotland",
          "Subjects Of Study": "Agnoiology"
        },
        {
          "Philosophers": "James J. Gibson",
          "Born": "1904",
          "Birth place": "Ithaca",
          "Died": "1979",
          "Place of Death": "York",
          "Subjects Of Study": "Perception, 'The Perception Of The Visual World'"
        },
        {
          "Philosophers": "James Mark Baldwin",
          "Born": "1861",
          "Birth place": "Carolina",
          "Died": "1934",
          "Place of Death": "France",
          "Subjects Of Study": "Individual Difference"
        },
        {
          "Philosophers": "James Martineau",
          "Born": "1805",
          "Birth place": "England",
          "Died": "1900",
          "Place of Death": "England",
          "Subjects Of Study": "Unitarianism, Authority, Religion, Conscience"
        },
        {
          "Philosophers": "Jean Baudrillard",
          "Born": "1929",
          "Birth place": "France",
          "Died": "2007",
          "Place of Death": "France",
          "Subjects Of Study": "Simulacrum, Hyperreality"
        },
        {
          "Philosophers": "Jean-Jacques Rousseau",
          "Born": "1712",
          "Birth place": "Switzerland",
          "Died": "1778",
          "Place of Death": "France",
          "Subjects Of Study": "Cultural Evolution, General Will"
        },
        {
          "Philosophers": "Jean-Paul Sartre",
          "Born": "1905",
          "Birth place": "France",
          "Died": "1980",
          "Place of Death": "France",
          "Subjects Of Study": "Marxism, Existentialism, Phenomenology, Gustave Flaubert, Litt\u00e9rature Engag\u00e9e"
        },
        {
          "Philosophers": "Jeremy Bentham",
          "Born": "1748",
          "Birth place": "England",
          "Died": "1832",
          "Place of Death": "England",
          "Subjects Of Study": "Utility, Law"
        },
        {
          "Philosophers": "Joachim Wach",
          "Born": "1898",
          "Birth place": "Germany",
          "Died": "1955",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Sociology, Phenomenology Of Religion, Religion, Comparative Religion"
        },
        {
          "Philosophers": "Johann Gottlieb Fichte",
          "Born": "1762",
          "Birth place": "Germany",
          "Died": "1814",
          "Place of Death": "Germany",
          "Subjects Of Study": "Germany, Secondary Education, Elementary Education, Ego, Practical Reason"
        },
        {
          "Philosophers": "Johann Heinrich Lambert",
          "Born": "1728",
          "Birth place": "Alsace",
          "Died": "1777",
          "Place of Death": "Germany",
          "Subjects Of Study": "Light, Measurement, Pi, Hyperbolic Functions, Irrational Number"
        },
        {
          "Philosophers": "John Baconthorpe",
          "Born": "1290",
          "Birth place": "England",
          "Died": "1346",
          "Place of Death": "England",
          "Subjects Of Study": "Aristotelianism, Latin Averroism"
        },
        {
          "Philosophers": "John Dewey",
          "Born": "1859",
          "Birth place": "Vermont",
          "Died": "1952",
          "Place of Death": "York",
          "Subjects Of Study": "Philosophy Of Education, Progressive Education"
        },
        {
          "Philosophers": "John Fiske",
          "Born": "1842",
          "Birth place": "Connecticut",
          "Died": "1901",
          "Place of Death": "Massachusetts",
          "Subjects Of Study": "Evolution"
        },
        {
          "Philosophers": "John Langshaw Austin",
          "Born": "1911",
          "Birth place": "England",
          "Died": "1960",
          "Place of Death": "England",
          "Subjects Of Study": "Linguistics"
        },
        {
          "Philosophers": "John Locke",
          "Born": "1632",
          "Birth place": "England",
          "Died": "1704",
          "Place of Death": "England",
          "Subjects Of Study": "Christianity, Language, Government, Universal, Personal Identity"
        },
        {
          "Philosophers": "John Neville Keynes",
          "Born": "1852",
          "Birth place": "England",
          "Died": "1949",
          "Place of Death": "England",
          "Subjects Of Study": "Economics, Deduction, Induction, Methodology"
        },
        {
          "Philosophers": "John Scott Haldane",
          "Born": "1860",
          "Birth place": "Scotland",
          "Died": "1936",
          "Place of Death": "England",
          "Subjects Of Study": "Coal Mining, Safety, Mine Gas, Gas Exchange"
        },
        {
          "Philosophers": "John Stuart Mill",
          "Born": "1806",
          "Birth place": "England",
          "Died": "1873",
          "Place of Death": "France",
          "Subjects Of Study": "Utilitarianism, Induction"
        },
        {
          "Philosophers": "John Venn",
          "Born": "1834",
          "Birth place": "England",
          "Died": "1923",
          "Place of Death": "England",
          "Subjects Of Study": "Probability Theory, Venn Diagram, Categorical Proposition, Syllogism"
        },
        {
          "Philosophers": "John Wycliffe",
          "Born": "1330",
          "Birth place": "England",
          "Died": "1384",
          "Place of Death": "England",
          "Subjects Of Study": "Lollards, Predestination, Transubstantiation"
        },
        {
          "Philosophers": "John of Paris",
          "Born": "1255",
          "Birth place": "France",
          "Died": "1306",
          "Place of Death": "France",
          "Subjects Of Study": "Papacy, Thomism, Authority, Church And State, Eucharist"
        },
        {
          "Philosophers": "John of Salisbury",
          "Born": "1120",
          "Birth place": "England",
          "Died": "1180",
          "Place of Death": "France",
          "Subjects Of Study": "Political Philosophy"
        },
        {
          "Philosophers": "Jonathan Edwards",
          "Born": "1703",
          "Birth place": "Connecticut",
          "Died": "1758",
          "Place of Death": "Jersey",
          "Subjects Of Study": "Puritanism, Revivalism"
        },
        {
          "Philosophers": "Jose Ortega y Gasset",
          "Born": "1883",
          "Birth place": "Spain",
          "Died": "1955",
          "Place of Death": "Spain",
          "Subjects Of Study": "Mass Society"
        },
        {
          "Philosophers": "Jose Vasconcelos",
          "Born": "1882",
          "Birth place": "Mexico",
          "Died": "1959",
          "Place of Death": "Mexico",
          "Subjects Of Study": "Monism"
        },
        {
          "Philosophers": "Joseph Butler",
          "Born": "1692",
          "Birth place": "England",
          "Died": "1752",
          "Place of Death": "England",
          "Subjects Of Study": "Ethics, Revelation, Religion"
        },
        {
          "Philosophers": "Joseph Priestley",
          "Born": "1733",
          "Birth place": "England",
          "Died": "1804",
          "Place of Death": "Pennsylvania",
          "Subjects Of Study": "Electricity, Gas, Atmosphere, Photosynthesis, Oxide"
        },
        {
          "Philosophers": "Josiah Royce",
          "Born": "1855",
          "Birth place": "California",
          "Died": "1916",
          "Place of Death": "Massachusetts",
          "Subjects Of Study": "Truth, Will"
        },
        {
          "Philosophers": "Julian Huxley",
          "Born": "1887",
          "Birth place": "England",
          "Died": "1975",
          "Place of Death": "England",
          "Subjects Of Study": "Evolution, Taxonomy, Embryo, Behaviour"
        },
        {
          "Philosophers": "Justus Lipsius",
          "Born": "1547",
          "Birth place": "Belgium",
          "Died": "1606",
          "Place of Death": "Belgium",
          "Subjects Of Study": "Stoicism"
        },
        {
          "Philosophers": "Karl Jaspers",
          "Born": "1883",
          "Birth place": "Germany",
          "Died": "1969",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Psychopathology"
        },
        {
          "Philosophers": "Karl Marx",
          "Born": "1818",
          "Birth place": "Germany",
          "Died": "1883",
          "Place of Death": "England",
          "Subjects Of Study": "Philosophy Of History, Capitalism, Use Value, Exchange Value"
        },
        {
          "Philosophers": "Karl Popper",
          "Born": "1902",
          "Birth place": "Austria",
          "Died": "1994",
          "Place of Death": "England",
          "Subjects Of Study": "Scientific Method, Criterion Of Falsifiability, Induction"
        },
        {
          "Philosophers": "Kumazawa Banzan",
          "Born": "1619",
          "Birth place": "Japan",
          "Died": "1691",
          "Place of Death": "Japan",
          "Subjects Of Study": "Wang Yangming, Neo-Confucianism"
        },
        {
          "Philosophers": "Leopold Kronecker",
          "Born": "1823",
          "Birth place": "Poland",
          "Died": "1891",
          "Place of Death": "Germany",
          "Subjects Of Study": "Algebraic Equation, Algebraic Number, Elliptic Function"
        },
        {
          "Philosophers": "Li Ao",
          "Born": "772",
          "Birth place": "China",
          "Died": "841",
          "Place of Death": "China",
          "Subjects Of Study": "Confucianism"
        },
        {
          "Philosophers": "Liang Shuming",
          "Born": "1893",
          "Birth place": "China",
          "Died": "1988",
          "Place of Death": "China",
          "Subjects Of Study": "China, Peasantry, Neo-Confucianism"
        },
        {
          "Philosophers": "Lorenzo Valla",
          "Born": "1407",
          "Birth place": "Italy",
          "Died": "1457",
          "Place of Death": "Italy",
          "Subjects Of Study": "Latin Language, Grammar, Donation Of Constantine"
        },
        {
          "Philosophers": "Louis Althusser",
          "Born": "1918",
          "Birth place": "Algeria",
          "Died": "1990",
          "Place of Death": "France",
          "Subjects Of Study": "Marxism, Structuralism"
        },
        {
          "Philosophers": "Louis Lavelle",
          "Born": "1883",
          "Birth place": "France",
          "Died": "1951",
          "Place of Death": "France",
          "Subjects Of Study": "Ontology"
        },
        {
          "Philosophers": "Louis-Alexandre Couturat",
          "Born": "1868",
          "Birth place": "France",
          "Died": "1914",
          "Place of Death": "France",
          "Subjects Of Study": "Logic, Gottfried Wilhelm Leibniz, Formal System, International Language"
        },
        {
          "Philosophers": "Lu Jiuyuan",
          "Born": "1139",
          "Birth place": "China",
          "Died": "1193",
          "Place of Death": "China",
          "Subjects Of Study": "Xinxue, Neo-Confucianism"
        },
        {
          "Philosophers": "Lucien Levy-Bruhl",
          "Born": "1857",
          "Birth place": "France",
          "Died": "1939",
          "Place of Death": "France",
          "Subjects Of Study": "Primitive Culture"
        },
        {
          "Philosophers": "Ludwig Klages",
          "Born": "1872",
          "Birth place": "Germany",
          "Died": "1956",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Geist"
        },
        {
          "Philosophers": "Ludwig Wittgenstein",
          "Born": "1889",
          "Birth place": "Austria",
          "Died": "1951",
          "Place of Death": "England",
          "Subjects Of Study": "Picture Theory Of Meaning, Proposition, Language Game, Certainty"
        },
        {
          "Philosophers": "Madhva",
          "Born": "1238",
          "Birth place": "India",
          "Died": "1317",
          "Place of Death": "India",
          "Subjects Of Study": "Hell, Heaven, Dvaita"
        },
        {
          "Philosophers": "Maria Gaetana Agnesi",
          "Born": "1718",
          "Birth place": "Italy",
          "Died": "1799",
          "Place of Death": "Italy",
          "Subjects Of Study": "Witch Of Agnesi"
        },
        {
          "Philosophers": "Marie-Francois-Pierre Maine de Biran",
          "Born": "1766",
          "Birth place": "France",
          "Died": "1824",
          "Place of Death": "France",
          "Subjects Of Study": "Will"
        },
        {
          "Philosophers": "Marin Mersenne",
          "Born": "1588",
          "Birth place": "France",
          "Died": "1648",
          "Place of Death": "France",
          "Subjects Of Study": "Vibration, Pendulum, Mersenne Prime, Cycloid, Prime"
        },
        {
          "Philosophers": "Marjorie Grene",
          "Born": "1910",
          "Birth place": "Wisconsin",
          "Died": "2009",
          "Place of Death": "Virginia",
          "Subjects Of Study": "Evolution, Philosophy Of Biology, Existentialism, Martin Heidegger, Karl Jaspers"
        },
        {
          "Philosophers": "Marko Marulic",
          "Born": "1450",
          "Birth place": "Split",
          "Died": "1524",
          "Place of Death": "Split",
          "Subjects Of Study": "Ethics"
        },
        {
          "Philosophers": "Marsilio Ficino",
          "Born": "1433",
          "Birth place": "Italy",
          "Died": "1499",
          "Place of Death": "Italy",
          "Subjects Of Study": "Plato, Plotinus, Soul"
        },
        {
          "Philosophers": "Maurice Blondel",
          "Born": "1861",
          "Birth place": "France",
          "Died": "1949",
          "Place of Death": "France",
          "Subjects Of Study": "Dialectic"
        },
        {
          "Philosophers": "Maurice Merleau-Ponty",
          "Born": "1908",
          "Birth place": "France",
          "Died": "1961",
          "Place of Death": "France",
          "Subjects Of Study": "Marxism"
        },
        {
          "Philosophers": "Max Black",
          "Born": "1909",
          "Birth place": "Azerbaijan",
          "Died": "1988",
          "Place of Death": "York",
          "Subjects Of Study": "Mathematics, Ludwig Wittgenstein"
        },
        {
          "Philosophers": "Max Scheler",
          "Born": "1874",
          "Birth place": "Germany",
          "Died": "1928",
          "Place of Death": "Germany",
          "Subjects Of Study": "Ethics, Value"
        },
        {
          "Philosophers": "Max Stirner",
          "Born": "1806",
          "Birth place": "Germany",
          "Died": "1856",
          "Place of Death": "Germany",
          "Subjects Of Study": "Ego"
        },
        {
          "Philosophers": "Michel Foucault",
          "Born": "1926",
          "Birth place": "France",
          "Died": "1984",
          "Place of Death": "France",
          "Subjects Of Study": "Mental Disorder, Prison, Sexuality, Society"
        },
        {
          "Philosophers": "Moritz Lazarus",
          "Born": "1824",
          "Birth place": "Germany",
          "Died": "1903",
          "Place of Death": "Italy",
          "Subjects Of Study": "Judaism, Anti-Semitism, Comparative Psychology"
        },
        {
          "Philosophers": "Mortimer J. Adler",
          "Born": "1902",
          "Birth place": "York",
          "Died": "2001",
          "Place of Death": "California",
          "Subjects Of Study": "Secondary Education, Adult Education, Elementary Education, Liberal Arts, Paideia"
        },
        {
          "Philosophers": "Moses Maimonides",
          "Born": "1135",
          "Birth place": "Spain",
          "Died": "1204",
          "Place of Death": "Egypt",
          "Subjects Of Study": "Judaism, Medicine, Philosophy Of Religion, Hebraic Law, Thirteen Articles Of Faith"
        },
        {
          "Philosophers": "Moses Mendelssohn",
          "Born": "1729",
          "Birth place": "Germany",
          "Died": "1786",
          "Place of Death": "Germany",
          "Subjects Of Study": "Judaism, Immortality, Soul, Religious Toleration"
        },
        {
          "Philosophers": "Mulla Sadra",
          "Born": "1571",
          "Birth place": "Iran",
          "Died": "1640",
          "Place of Death": "Iraq",
          "Subjects Of Study": "Mysticism, Ishr\u0101q\u012byah, Philosophy Of Nature"
        },
        {
          "Philosophers": "Muro Kyuso",
          "Born": "1658",
          "Birth place": "Japan",
          "Died": "1734",
          "Place of Death": "Japan",
          "Subjects Of Study": "Confucianism, Zhu Xi"
        },
        {
          "Philosophers": "Nicholas of Cusa",
          "Born": "1401",
          "Birth place": "Germany",
          "Died": "1464",
          "Place of Death": "States",
          "Subjects Of Study": "Conciliarism, Papal Primacy"
        },
        {
          "Philosophers": "Nikolay Yakovlevich Danilevsky",
          "Born": "1822",
          "Birth place": "Russia",
          "Died": "1885",
          "Place of Death": "Georgia",
          "Subjects Of Study": "Philosophy Of History, Civilization"
        },
        {
          "Philosophers": "Nishida Kitaro",
          "Born": "1870",
          "Birth place": "Japan",
          "Died": "1945",
          "Place of Death": "Japan",
          "Subjects Of Study": "Nothingness, Experience"
        },
        {
          "Philosophers": "Norman Robert Campbell",
          "Born": "1880",
          "Birth place": "England",
          "Died": "1949",
          "Place of Death": "England",
          "Subjects Of Study": "X-Ray, Measurement, Ionization"
        },
        {
          "Philosophers": "Oswald Kulpe",
          "Born": "1862",
          "Birth place": "Russia",
          "Died": "1915",
          "Place of Death": "Germany",
          "Subjects Of Study": "Thought"
        },
        {
          "Philosophers": "Oswald Spengler",
          "Born": "1880",
          "Birth place": "Germany",
          "Died": "1936",
          "Place of Death": "Germany",
          "Subjects Of Study": "Culture"
        },
        {
          "Philosophers": "Otto Friedrich von Gierke",
          "Born": "1841",
          "Birth place": "Prussia",
          "Died": "1921",
          "Place of Death": "Germany",
          "Subjects Of Study": "Devolution, Pluralism, Historical Jurisprudence"
        },
        {
          "Philosophers": "Otto Neurath",
          "Born": "1882",
          "Birth place": "Austria",
          "Died": "1945",
          "Place of Death": "England",
          "Subjects Of Study": "Logical Positivism"
        },
        {
          "Philosophers": "Paul Shorey",
          "Born": "1857",
          "Birth place": "Iowa",
          "Died": "1934",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Plato, Platonism"
        },
        {
          "Philosophers": "Paul Tillich",
          "Born": "1886",
          "Birth place": "Germany",
          "Died": "1965",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Faith, Justification, Theonomy"
        },
        {
          "Philosophers": "Paul of Venice",
          "Born": "1372",
          "Birth place": "Udine",
          "Died": "1429",
          "Place of Death": "Padua",
          "Subjects Of Study": "Logic"
        },
        {
          "Philosophers": "Pierre Bayle",
          "Born": "1647",
          "Birth place": "France",
          "Died": "1706",
          "Place of Death": "Netherlands",
          "Subjects Of Study": "Christianity, Heterodoxy"
        },
        {
          "Philosophers": "Pierre Gassendi",
          "Born": "1592",
          "Birth place": "France",
          "Died": "1655",
          "Place of Death": "France",
          "Subjects Of Study": "Epicurus"
        },
        {
          "Philosophers": "Pierre Laromiguiere",
          "Born": "1756",
          "Birth place": "France",
          "Died": "1837",
          "Place of Death": "France",
          "Subjects Of Study": "\u00c9tienne Bonnot De Condillac"
        },
        {
          "Philosophers": "Pierre Leroux",
          "Born": "1797",
          "Birth place": "France",
          "Died": "1871",
          "Place of Death": "France",
          "Subjects Of Study": "Pantheism"
        },
        {
          "Philosophers": "Pierre Nicole",
          "Born": "1625",
          "Birth place": "France",
          "Died": "1695",
          "Place of Death": "France",
          "Subjects Of Study": "Jansenism"
        },
        {
          "Philosophers": "Pierre Teilhard de Chardin",
          "Born": "1881",
          "Birth place": "France",
          "Died": "1955",
          "Place of Death": "York",
          "Subjects Of Study": "Evolution, Peking Man, No\u00f6sphere"
        },
        {
          "Philosophers": "Pierre-Felix Guattari",
          "Born": "1930",
          "Birth place": "France",
          "Died": "1992",
          "Place of Death": "France",
          "Subjects Of Study": "Psychiatry, Philosophy"
        },
        {
          "Philosophers": "Pietro Pomponazzi",
          "Born": "1462",
          "Birth place": "Mantua",
          "Died": "1525",
          "Place of Death": "Bologna",
          "Subjects Of Study": "Immortality"
        },
        {
          "Philosophers": "Plato",
          "Born": "428",
          "Birth place": "Greece",
          "Died": "348",
          "Place of Death": "Greece",
          "Subjects Of Study": "Socrates, Immortality, Philosopher King, Soul, A Priori Knowledge"
        },
        {
          "Philosophers": "Pythagoras",
          "Born": "570",
          "Birth place": "Greece",
          "Died": "490",
          "Place of Death": "Italy",
          "Subjects Of Study": "Interval, Number"
        },
        {
          "Philosophers": "Ramana Maharshi",
          "Born": "1879",
          "Birth place": "India",
          "Died": "1950",
          "Place of Death": "India",
          "Subjects Of Study": "Maya, Vichara, Monism"
        },
        {
          "Philosophers": "Ramanuja",
          "Born": "1017",
          "Birth place": "India",
          "Died": "1137",
          "Place of Death": "India",
          "Subjects Of Study": "Hinduism, Bhakti, Vishishtadvaita, Vedanta, Vishnu"
        },
        {
          "Philosophers": "Ramon Llull",
          "Born": "1233",
          "Birth place": "Spain",
          "Died": "1316",
          "Place of Death": "Spain",
          "Subjects Of Study": "Mysticism, Neoplatonism"
        },
        {
          "Philosophers": "Reinhold Niebuhr",
          "Born": "1892",
          "Birth place": "Missouri",
          "Died": "1971",
          "Place of Death": "Massachusetts",
          "Subjects Of Study": "Protestantism, Socialism, Pacifism, Neoorthodoxy"
        },
        {
          "Philosophers": "Rene Descartes",
          "Born": "1596",
          "Birth place": "France",
          "Died": "1650",
          "Place of Death": "Sweden",
          "Subjects Of Study": "A Priori Knowledge, Mind-Body Dualism, Philosophy, Methodic Doubt, Innate Idea"
        },
        {
          "Philosophers": "Richard Hooker",
          "Born": "1554",
          "Birth place": "England",
          "Died": "1600",
          "Place of Death": "England",
          "Subjects Of Study": "Church Of England"
        },
        {
          "Philosophers": "Richard Price",
          "Born": "1723",
          "Birth place": "Wales",
          "Died": "1791",
          "Place of Death": "England",
          "Subjects Of Study": "American Revolution, French Revolution, National Economy"
        },
        {
          "Philosophers": "Robert Boyle",
          "Born": "1627",
          "Birth place": "Ireland",
          "Died": "1691",
          "Place of Death": "England",
          "Subjects Of Study": "Gas, Pressure, Air, Boyle\u2019S Law, Vacuum"
        },
        {
          "Philosophers": "Robert Grosseteste",
          "Born": "1175",
          "Birth place": "England",
          "Died": "1253",
          "Place of Death": "England",
          "Subjects Of Study": "Aristotle"
        },
        {
          "Philosophers": "Roger Bacon",
          "Born": "1220",
          "Birth place": "England",
          "Died": "1292",
          "Place of Death": "England",
          "Subjects Of Study": "Light, Gunpowder, Eyeglasses, Rainbow, Empirical Method"
        },
        {
          "Philosophers": "Rudolf Bultmann",
          "Born": "1884",
          "Birth place": "Germany",
          "Died": "1976",
          "Place of Death": "Germany",
          "Subjects Of Study": "Theological Existentialism"
        },
        {
          "Philosophers": "Rudolf Carnap",
          "Born": "1891",
          "Birth place": "Germany",
          "Died": "1970",
          "Place of Death": "California",
          "Subjects Of Study": "Formal Logic, Probability Theory, A Priori Knowledge, Verifiability Principle, Analytic Proposition"
        },
        {
          "Philosophers": "Rudolf Otto",
          "Born": "1869",
          "Birth place": "Germany",
          "Died": "1937",
          "Place of Death": "Germany",
          "Subjects Of Study": "Sacred, Religion, Mysterium Tremendum Et Fascinans, Numinous"
        },
        {
          "Philosophers": "Salomon Maimon",
          "Born": "1754",
          "Birth place": "Lithuania",
          "Died": "1800",
          "Place of Death": "Poland",
          "Subjects Of Study": "Skepticism, Moses Maimonides, Philosophy"
        },
        {
          "Philosophers": "Samuel Alexander",
          "Born": "1859",
          "Birth place": "Australia",
          "Died": "1938",
          "Place of Death": "England",
          "Subjects Of Study": "Ethics, Evolution, Space-Time"
        },
        {
          "Philosophers": "Samuel Bailey",
          "Born": "1791",
          "Birth place": "England",
          "Died": "1870",
          "Place of Death": "England",
          "Subjects Of Study": "Value"
        },
        {
          "Philosophers": "Samuel Hirsch",
          "Born": "1815",
          "Birth place": "Germany",
          "Died": "1889",
          "Place of Death": "Illinois",
          "Subjects Of Study": "Judaism, Philosophy Of Religion, Reform Judaism"
        },
        {
          "Philosophers": "Shankara",
          "Born": "700",
          "Birth place": "India",
          "Died": "750",
          "Place of Death": "India",
          "Subjects Of Study": "Upanishad, 'Brahma-Sutra-Bhashya'"
        },
        {
          "Philosophers": "Shao Yong",
          "Born": "1011",
          "Birth place": "China",
          "Died": "1077",
          "Place of Death": "China",
          "Subjects Of Study": "'Yijing', Numerology, Cyclicism, Neo-Confucianism"
        },
        {
          "Philosophers": "Shri Aurobindo",
          "Born": "1872",
          "Birth place": "India",
          "Died": "1950",
          "Place of Death": "India",
          "Subjects Of Study": "Yoga, Moksha, Enlightenment"
        },
        {
          "Philosophers": "Sidney Hook",
          "Born": "1902",
          "Birth place": "York",
          "Died": "1989",
          "Place of Death": "California",
          "Subjects Of Study": "Marxism"
        },
        {
          "Philosophers": "Simon Foucher",
          "Born": "1644",
          "Birth place": "France",
          "Died": "1696",
          "Place of Death": "France",
          "Subjects Of Study": "Truth"
        },
        {
          "Philosophers": "Simone Weil",
          "Born": "1909",
          "Birth place": "France",
          "Died": "1943",
          "Place of Death": "England",
          "Subjects Of Study": "Religion"
        },
        {
          "Philosophers": "Socrates",
          "Born": "470",
          "Birth place": "Greece",
          "Died": "399",
          "Place of Death": "Greece",
          "Subjects Of Study": "Universal, Soul, Idea, Definition, Induction"
        },
        {
          "Philosophers": "Solomon Formstecher",
          "Born": "1808",
          "Birth place": "Germany",
          "Died": "1889",
          "Place of Death": "Germany",
          "Subjects Of Study": "Judaism, Idealism"
        },
        {
          "Philosophers": "Soren Kierkegaard",
          "Born": "1813",
          "Birth place": "Denmark",
          "Died": "1855",
          "Place of Death": "Denmark",
          "Subjects Of Study": "Christianity, Rationalism, Free Will, Dread, Leap Of Faith"
        },
        {
          "Philosophers": "Stanislaw Lesniewski",
          "Born": "1886",
          "Birth place": "Russia",
          "Died": "1939",
          "Place of Death": "Poland",
          "Subjects Of Study": "Foundations Of Mathematics, Formal System, Mereology, Protothetic"
        },
        {
          "Philosophers": "Stephen Edelston Toulmin",
          "Born": "1922",
          "Birth place": "England",
          "Died": "2009",
          "Place of Death": "California",
          "Subjects Of Study": "Ethics, Prescriptive Grammar"
        },
        {
          "Philosophers": "Susanne K. Langer",
          "Born": "1895",
          "Birth place": "York",
          "Died": "1985",
          "Place of Death": "Connecticut",
          "Subjects Of Study": "Semiotics, The Arts, Sign, Symbolism"
        },
        {
          "Philosophers": "Taixu",
          "Born": "1890",
          "Birth place": "China",
          "Died": "1947",
          "Place of Death": "China",
          "Subjects Of Study": "Buddhism"
        },
        {
          "Philosophers": "Theodor Gomperz",
          "Born": "1832",
          "Birth place": "Republic",
          "Died": "1912",
          "Place of Death": "Austria",
          "Subjects Of Study": "Greek Philosophy"
        },
        {
          "Philosophers": "Theodor Wiesengrund Adorno",
          "Born": "1903",
          "Birth place": "Germany",
          "Died": "1969",
          "Place of Death": "Switzerland",
          "Subjects Of Study": "Philosophy Of Art, Music"
        },
        {
          "Philosophers": "Theodosius Dobzhansky",
          "Born": "1900",
          "Birth place": "Ukraine",
          "Died": "1975",
          "Place of Death": "California",
          "Subjects Of Study": "Evolution, Speciation, Drosophila, Synthetic Theory Of Evolution"
        },
        {
          "Philosophers": "Thomas Henry Huxley",
          "Born": "1825",
          "Birth place": "England",
          "Died": "1895",
          "Place of Death": "England",
          "Subjects Of Study": "Evolution, Taxonomy, Agnosticism, Religion, Darwinism"
        },
        {
          "Philosophers": "Thomas Hobbes",
          "Born": "1588",
          "Birth place": "England",
          "Died": "1679",
          "Place of Death": "England",
          "Subjects Of Study": "Sovereignty, Natural Law, Church And State, Absolutism, Social Contract"
        },
        {
          "Philosophers": "Thomas Reid",
          "Born": "1710",
          "Birth place": "Scotland",
          "Died": "1796",
          "Place of Death": "Scotland",
          "Subjects Of Study": "Intuitionism"
        },
        {
          "Philosophers": "Tommaso Campanella",
          "Born": "1568",
          "Birth place": "Naples",
          "Died": "1639",
          "Place of Death": "France",
          "Subjects Of Study": "Roman Catholicism, Metaphysics, Humanism, Pragmatism"
        },
        {
          "Philosophers": "Uriel Acosta",
          "Born": "1585",
          "Birth place": "Portugal",
          "Died": "1640",
          "Place of Death": "Netherlands",
          "Subjects Of Study": "Rationalism, Religion"
        },
        {
          "Philosophers": "Vallabha",
          "Born": "1479",
          "Birth place": "India",
          "Died": "1531",
          "Place of Death": "India",
          "Subjects Of Study": "Suddhadvaita"
        },
        {
          "Philosophers": "Vladimir Sergeyevich Solovyov",
          "Born": "1853",
          "Birth place": "Russia",
          "Died": "1900",
          "Place of Death": "Russia",
          "Subjects Of Study": "Mysticism"
        },
  {
    "Philosophers": "Walter Benjamin",
    "Born": "1892",
    "Birth place": "Germany",
    "Died": "1940",
    "Place of Death": "Spain",
    "Subjects Of Study": "Aesthetics, Literature"
  },
  {
    "Philosophers": "Wang Bi",
    "Born": "226",
    "Birth place": "China",
    "Died": "249",
    "Place of Death": "China",
    "Subjects Of Study": "Emotion, 'Yijing', 'Tao-Te Ching', Dark Learning"
  },
  {
    "Philosophers": "Wang Chong",
    "Born": "27",
    "Birth place": "China",
    "Died": "100",
    "Place of Death": "China",
    "Subjects Of Study": "Confucianism, Rationalism, Naturalism"
  },
  {
    "Philosophers": "Wang Yangming",
    "Born": "1472",
    "Birth place": "China",
    "Died": "1529",
    "Place of Death": "China",
    "Subjects Of Study": "Xinxue, Neo-Confucianism"
  },
  {
    "Philosophers": "Watsuji Tetsuro",
    "Born": "1889",
    "Birth place": "Japan",
    "Died": "1960",
    "Place of Death": "Japan",
    "Subjects Of Study": "Ethics, Buddhism, Existentialism"
  },
  {
    "Philosophers": "Werner Heisenberg",
    "Born": "1901",
    "Birth place": "Germany",
    "Died": "1976",
    "Place of Death": "Germany",
    "Subjects Of Study": "Uncertainty Principle, Complementarity Principle, Matrix Mechanics, Spinor Equation"
  },
  {
    "Philosophers": "Wilfrid Sellars",
    "Born": "1912",
    "Birth place": "Michigan",
    "Died": "1989",
    "Place of Death": "Pennsylvania",
    "Subjects Of Study": "Philosophy Of Mind"
  },
  {
    "Philosophers": "Wilhelm Dilthey",
    "Born": "1833",
    "Birth place": "Germany",
    "Died": "1911",
    "Place of Death": "Austria",
    "Subjects Of Study": "Social Science, Humanities, Methodology"
  },
  {
    "Philosophers": "Willard Van Orman Quine",
    "Born": "1908",
    "Birth place": "Ohio",
    "Died": "2000",
    "Place of Death": "Massachusetts",
    "Subjects Of Study": "Formal Logic, Meaning"
  },
  {
    "Philosophers": "William Godwin",
    "Born": "1756",
    "Birth place": "England",
    "Died": "1836",
    "Place of Death": "England",
    "Subjects Of Study": "Individualism, Cultural Determinism"
  },
  {
    "Philosophers": "William James",
    "Born": "1842",
    "Birth place": "York",
    "Died": "1910",
    "Place of Death": "Hampshire",
    "Subjects Of Study": "Religious Experience, Psychology, Neutral Monism, Free Will, Religious Belief"
  },
  {
    "Philosophers": "William Kingdon Clifford",
    "Born": "1845",
    "Birth place": "England",
    "Died": "1879",
    "Place of Death": "Portugal",
    "Subjects Of Study": "Tribal Self, Biquaternion"
  },
  {
    "Philosophers": "William Paley",
    "Born": "1743",
    "Birth place": "England",
    "Died": "1805",
    "Place of Death": "England",
    "Subjects Of Study": "Ethics, Utilitarianism, Argument From Design"
  },
  {
    "Philosophers": "William Ralph Inge",
    "Born": "1860",
    "Birth place": "England",
    "Died": "1954",
    "Place of Death": "England",
    "Subjects Of Study": "Platonism"
  },
  {
    "Philosophers": "William Whewell",
    "Born": "1794",
    "Birth place": "England",
    "Died": "1866",
    "Place of Death": "England",
    "Subjects Of Study": "Induction"
  },
  {
    "Philosophers": "William of Auxerre",
    "Born": "1150",
    "Birth place": "France",
    "Died": "1231",
    "Place of Death": "Italy",
    "Subjects Of Study": "Theology, Natural Law, Free Will, Liturgy"
  },
  {
    "Philosophers": "William of Champeaux",
    "Born": "1070",
    "Birth place": "France",
    "Died": "1121",
    "Place of Death": "France",
    "Subjects Of Study": "Universal"
  },
  {
    "Philosophers": "William of Ockham",
    "Born": "1285",
    "Birth place": "England",
    "Died": "1349",
    "Place of Death": "Germany",
    "Subjects Of Study": "Roman Catholicism, Occam\u2019S Razor, Heterodoxy"
  },
  {
    "Philosophers": "Xiong Shili",
    "Born": "1885",
    "Birth place": "China",
    "Died": "1968",
    "Place of Death": "China",
    "Subjects Of Study": "Ren"
  },
  {
    "Philosophers": "Xunzi",
    "Born": "300",
    "Birth place": "China",
    "Died": "230",
    "Place of Death": "China",
    "Subjects Of Study": "Confucianism, Human Nature, Li, Good And Evil"
  },
  {
    "Philosophers": "Yan Yuan",
    "Born": "1635",
    "Birth place": "China",
    "Died": "1704",
    "Place of Death": "China",
    "Subjects Of Study": "Confucianism"
  },
  {
    "Philosophers": "Zhang Zai",
    "Born": "1020",
    "Birth place": "China",
    "Died": "1077",
    "Place of Death": "China",
    "Subjects Of Study": "Ren, Qi"
  },
  {
    "Philosophers": "Zhou Dunyi",
    "Born": "1017",
    "Birth place": "China",
    "Died": "1073",
    "Place of Death": "China",
    "Subjects Of Study": "Confucianism, Dark Learning"
  },
  {
    "Philosophers": "Zhu Xi",
    "Born": "1130",
    "Birth place": "China",
    "Died": "1200",
    "Place of Death": "China",
    "Subjects Of Study": "Qi, Li"
  },
  {
    "Philosophers": "al-Farabi",
    "Born": "878",
    "Birth place": "Turkistan",
    "Died": "950",
    "Place of Death": "Syria",
    "Subjects Of Study": "Political Philosophy, Greek Philosophy"
  },
  {
    "Philosophers": "al-Ghazali",
    "Born": "1058",
    "Birth place": "Iran",
    "Died": "1111",
    "Place of Death": "Iran",
    "Subjects Of Study": "Islam, Sufism, Sharif"
  }
],
  methods : {
    doMongo : function() {
      this.products = [];
    },
  }
}
}
}
</script>

<style>
#twrap {
  max-height: 60vh;
  overflow: auto;
  display:inline-block;
  -ms-overflow-style: none;
  scrollbar-width: none;  
}

#twrap::-webkit-scrollbar {
  display: none;
}

th, td {
  width: 16.6%;
}

</style>

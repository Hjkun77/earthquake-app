import React, {Component} from 'react';
import Cards from './components/Cards/Cards';
import loading from './assets/loading.gif';
import './style.css'

class App extends Component {
  constructor() {
    super();
    this.handleAll = this.handleAll.bind(this);
    this.handleMagOne = this.handleMagOne.bind(this);
    this.handleMagTwo = this.handleMagTwo.bind(this);
    this.handleMagThree = this.handleMagThree.bind(this);
    this.state = {
      searchfield: 'Philippines',
      earthquakes: [],
      all: true,
      magOne: false,
      magTwo: false,
      magThree: false,
      // starttime: new Date() - 1
    }
  }

  componentDidMount() {
    async function getEarthquake() {
      let response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson`)
      let data = await response.json()
      return data;
    }

    getEarthquake()
      .then(data => {
        this.setState({earthquakes: [...data.features]})
        // console.log(this.state.earthquakes)
      })
  }

  onSearchChange = e => {
    this.setState({ searchfield: e.target.value })
  }

  formatDate = date => {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
  }

  onDateChange = e => {
    this.setState({ starttime: this.formatDate(e.target.value) })
  }

  handleAll() {
    this.setState({
      all: true,
      magOne: false,
      magTwo: false,
      magThree: false
    })
  }

  handleMagOne() {
    this.setState({
      all: false,
      magOne: true,
      magTwo: false,
      magThree: false
    })
  }

  handleMagTwo() {
    this.setState({
      all: false,
      magOne: false,
      magTwo: true,
      magThree: false
    })
  }

  handleMagThree() {
    this.setState({
      all: false,
      magOne: false,
      magTwo: false,
      magThree: true
    })
  }


  renderEarthquakeCards = earthquakes =>  {
    return earthquakes.map((earthquake, index) => {
      const {mag, place, time} = earthquake.properties;
      return (
        <Cards
          key={index}
          mag={mag}
          place={place}
          time={time} />
      )
    })
  }


  render() {
    const { earthquakes, searchfield, magOne, magTwo, magThree } = this.state;

    const filteredShakes = earthquakes.filter(earthquake => {
      const {place, mag} = earthquake.properties;
      if (magOne) {
        return place.toLowerCase().includes(searchfield.toLowerCase()) && mag <3;
      } else if (magTwo) {
        return place.toLowerCase().includes(searchfield.toLowerCase()) && mag <6 && mag >= 3;
      } else if (magThree) {
        return place.toLowerCase().includes(searchfield.toLowerCase()) && mag <=9 && mag >= 6;
      } else {
        return place.toLowerCase().includes(searchfield.toLowerCase())
      }

    })

      return (!earthquakes.length) ? (
        <div className="loading flex justifyCenter alignCenter">
          <img src={loading} alt="loading"/>
        </div>
      ) :
      (
        <div className="App">
          <div className="header">
            <div className="header-wrapper">
              <h1>ShakePH</h1>
              {/* <input type="date" onChange={this.onDateChange}/> */}
            </div>
          </div>
          <div className="container">
            <div className="navigation">
              <ul className="flex">
                <li onClick={this.handleAll}>All</li>
                <li onClick={this.handleMagOne}>Magnitude 1-2.9</li>
                <li onClick={this.handleMagTwo}>Magnitude 3-5.9</li>
                <li onClick={this.handleMagThree}>Magnitude 6-9</li>
              </ul>
            </div>
            <div className="body">
              {this.renderEarthquakeCards(filteredShakes)}
            </div>
          </div>
        </div>
      );
  }
}


export default App;

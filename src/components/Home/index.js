import {Component} from 'react'


import Navbar from '../Navbar'
import EachElement from '../EachElement'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    data: [],
    filter: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProjectsLists()
  }

  getProjectsLists = async () => {
    const {filter} = this.state
    const capFilter = filter.toUpperCase()
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const api = `https://apis.ccbp.in/ps/projects?category=${capFilter}`
    const response = await fetch(api)
    const data = await response.json()
    if (response.ok === true) {
      const finalData = data.projects.map(eachEl => ({
        id: eachEl.id,
        imageUrl: eachEl.image_url,
        name: eachEl.name,
      }))
      this.setState({data: finalData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSelect = event => {
    this.setState({filter: event.target.value}, this.getProjectsLists)
  }

  renderSuccess = () => {
    const {data} = this.state
    console.log(data)

    return (
      <div>
        <ul className="all-data-container">
          {data.map(each => (
            <EachElement each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  Retry = () => {
    this.getProjectsLists()
  }

  renderFailure = () => (
    <div className="card">
      <img
        className="image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.Retry}>
        Retry
      </button>
    </div>
  )

 // renderProgress = () => (
  //  <div className="products-loader-container" data-testid="loader">
  //    <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
  //  </div>
  //)

  renderPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Navbar />
        <div className="data-container">
          <div className="select-container">
            <select onChange={this.onChangeSelect}>
              {categoriesList.map(each => (
                <option key={each.id} value={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          {this.renderPageView()}
        </div>
      </div>
    )
  }
}

export default Home

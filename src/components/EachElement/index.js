import './index.css'

const EachElement = props => {
  const {each} = props
  const {imageUrl, name} = each

  return (
    <li className="eachElement">
      <div>
        <img src={imageUrl} alt={name} className="each-el-img" />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default EachElement

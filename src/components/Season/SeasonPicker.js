import React from 'react'
import { Link } from 'react-router-dom'

const SeasonPicker = ({ seasons, currentSeasonName }) => (
  <div
    style={{
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#333',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}
  >
    { seasons.map((season) => {
      const color = currentSeasonName && season.name === currentSeasonName ? '#3FB4CF' : '#ccc'
      return (
        <Link
          to={`/${season.name}`}
          style={{ flex: 1, padding: 5, color }}
          key={`SeasonPicker_${season.id}`}
        >
          {season.name}
        </Link>
      )
    })}
  </div>
)


const { arrayOf, shape, string } = React.PropTypes

SeasonPicker.propTypes = {
  seasons: arrayOf(shape().isRequired).isRequired,
  currentSeasonName: string.isRequired
}

export default SeasonPicker

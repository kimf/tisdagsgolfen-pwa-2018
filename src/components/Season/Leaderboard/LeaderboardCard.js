import React from 'react'

const LeaderboardCard = ({ data, currentUserId, sorting }) => {
  let pointspan
  let pointValue = ''
  let upOrDown
  let position

  if (sorting === 'beers') {
    pointValue = data.totalBeers
    pointspan = '🍺'
    position = data.beerPos
  } else if (sorting === 'kr') {
    pointValue = data.totalKr
    pointspan = 'kr'
    position = data.krPos
  } else {
    pointValue = data.totalPoints
    position = data.position
    pointspan = 'p'
    if (data.position < data.previousPosition) {
      upOrDown = <span style={{ flex: 1, color: 'green' }}>↥{data.previousPosition - data.position}</span>
    } else if (data.position > data.previousPosition) {
      upOrDown = <span style={{ flex: 1, color: 'red' }}>↧{data.position - data.previousPosition}</span>
    }
  }

  const player = data.user
  const averagePoints = data.averagePoints.toLocaleString(
    'sv', { maximumFractionDigits: 1, useGrouping: false }
  )

  const currentUserStyle = player.id === currentUserId ? { backgroundColor: '#feb' } : null

  if (data.eventCount < 1) {
    return null
  }

  return (
    <div className="row">
      <div key={data.id} style={currentUserStyle}>
        <div>
          <span style={{ flex: 1, fontWeight: '800', color: '#000', fontSize: 16 }}>{position}</span>
          { upOrDown }
        </div>
        <div>
          <span>{player.firstName} {player.lastName}</span>
          { sorting === 'totalPoints'
            ?
              <span>
                {data.eventCount} Rundor.
                Snitt: {averagePoints}p
              </span>
            : null
          }
        </div>
        <strong>{`${pointValue} ${pointspan}`}</strong>
      </div>
    </div>
  )
}

const { shape, string } = React.PropTypes

LeaderboardCard.propTypes = {
  data: shape().isRequired,
  currentUserId: string.isRequired,
  sorting: string.isRequired
}

export default LeaderboardCard

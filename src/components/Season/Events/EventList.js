import React from 'react'
import { View, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import Loading from '../../Shared/Loading'
import Button from '../../Shared/Button'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const EventList = ({ data, gotoEvent, openNewRoundModal }) => {
  if (data.loading) {
    return <Loading text="Laddar rundor..." />
  }

  if (data.events.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <EmptyState text="Inga rundor :(" />
        <Button text="+ Lägg till ny runda" onClick={openNewRoundModal} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <ListView
        initialListSize={100}
        dataSource={ds.cloneWithRows(data.events)}
        renderRow={rowData => <EventCard event={rowData} gotoEvent={gotoEvent} />}
        enableEmptySections
      />
      <Button text="+ Lägg till ny runda" onClick={openNewRoundModal} />
    </View>
  )
}

const { arrayOf, bool, string, shape, func } = React.PropTypes

EventList.propTypes = {
  data: shape({
    loading: bool,
    events: arrayOf(shape())
  }),
  gotoEvent: func.isRequired,
  openNewRoundModal: func.isRequired
}

EventList.defaultProps = {
  data: {
    loading: true,
    events: []
  }
}


const eventsForSeasonQuery = gql`
  query eventsForSeasonQuery($seasonId: ID!) {
    events: allEvents (
      orderBy: startsAt_DESC,
      filter: { season: { id: $seasonId } }
    ) {
      id
      status
      startsAt
      course
      courseId
      scoringType
      teamEvent
      oldId
    }
  }
`

const EventListWithData = graphql(eventsForSeasonQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})(EventList)

EventListWithData.propTypes = {
  seasonId: string.isRequired
}

export default EventListWithData

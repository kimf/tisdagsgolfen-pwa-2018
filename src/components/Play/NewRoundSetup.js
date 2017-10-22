import React from 'react'
import { bool, string, shape, func } from 'prop-types'
import Switch from 'rc-switch'

import SetupIndividual from './SetupIndividual'
import SetupTeam from './SetupTeam'

const NewRoundSetup = ({ setValue, course, teamEvent, isStrokes }) => (
  <div className="form">
    <h4>
      {course.club}: {course.name}
      <button onClick={() => setValue('course', null)}>
        Byt bana
      </button>
    </h4>

    <h5>Slaggolf?</h5>
    <Switch
      onChange={isS => setValue('isStrokes', isS)}
      checkedChildren={'SLAG'}
      unCheckedChildren={'POÄNG'}
      checked={isStrokes}
    />

    <h5>Lagtävling?</h5>
    <Switch
      onChange={te => setValue('teamEvent', te)}
      checkedChildren={'LAG'}
      unCheckedChildren={'INDIVIDUELL'}
      checked={teamEvent}
    />

    {teamEvent ? <SetupTeam {...this.props} /> : <SetupIndividual {...this.props} />}
  </div>
)

NewRoundSetup.propTypes = {
  course: shape({
    id: string.isRequired,
    club: string.isRequired,
    name: string.isRequired
  }).isRequired,
  teamEvent: bool.isRequired,
  isStrokes: bool.isRequired,
  setValue: func.isRequired
}

export default NewRoundSetup

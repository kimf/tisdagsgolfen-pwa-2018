export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length
// avg.toLocaleString('sv', {maximumFractionDigits: 1, useGrouping:false})

export const sorted = (array, attribute) => array.sort((a, b) => b[attribute] - a[attribute])

export const sortedByParsedDate = (array, attribute) => sorted(
  array.map((item) => {
    const date = new Date(item[attribute])
    const newItem = Object.assign({}, item)
    newItem[attribute] = date
    return newItem
  }),
  attribute
)

// ranked :: Array -> String -> Array
export const ranked = (array, attribute, rankingAttribute, reversed) => {
  const scores = array.map(x => x[rankingAttribute])
  const rankedArr = array.map((item) => {
    const newItem = Object.assign({}, item)
    newItem[attribute] = scores.indexOf(newItem[rankingAttribute]) + 1
    return newItem
  })

  return reversed ? rankedArr.reverse() : rankedArr
}

const cmp = (a, b) => {
  if (a > b) return +1
  if (a < b) return -1
  return 0
}

export const rankedUsers = (realUsers) => {
  const rankings = []
  const users = realUsers.slice()
  users.sort((a, b) => cmp(a.totalPoints, b.totalPoints) || cmp(a.average, b.average))

  users.reverse().forEach((user, i) => {
    const rankedUser = Object.assign({}, user)
    if (i === 0) {
      rankedUser.position = 1
    } else if (rankedUser.totalPoints === users[i - 1].totalPoints) {
      if (rankedUser.average === users[i - 1].average) {
        rankedUser.position = rankings[i - 1].position
      } else {
        rankedUser.position = i + 1
        rankings[i] = rankedUser
      }
    } else {
      rankedUser.position = i + 1
    }
    rankings[i] = rankedUser
  })
  return rankings
}


export const setCache = async (key, val) => {
  try {
    const item = JSON.stringify(val)
    const value = await window.localStorage.setItem(key, item)
    if (value === null) { return false }
    return value
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in setCache', e)
    return false
  }
}

export const getCache = async (key) => {
  try {
    const value = await window.localStorage.getItem(key)
    return JSON.parse(value)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}

export const removeCache = async (key) => {
  try {
    await window.localStorage.removeItem(key)
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}

import axios from 'axios'

// const id = 'YOUR_CLIENT_ID'
// const sec = 'YOUR_SECRET_ID'
// const params = `?client_id=${id}&client_secret=${sec}`

const getProfile = username => (
  // axios.get(`https://api.github.com/users/${username}${params}`)
  axios.get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data)
)

const getRepos = username => (
  // axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(({ data }) => data)
)

const getStarCount = repos => (
  repos.reduce((count, { stargazers_count }) => (
    count + stargazers_count
  ), 0)
)

const calculateScore = ({ followers }, repos) => (
  followers * 3 + getStarCount(repos)
)

const getUserData = player => (
  Promise.all([ getProfile(player), getRepos(player)])
    .then(([ profile, repos ]) => ({
      profile,
      score: calculateScore(profile, repos)
    }))
)

const sortPlayers = players => (
  players.sort((a, b) => b.score - a.score)
)

const handleError = error => {
  console.warn(error)
  return null
}

export const battle = players => (
  Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
)

export const fetchPopularRepos = language => (
  axios.get(window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`))
    .then(({ data }) => data.items)
)

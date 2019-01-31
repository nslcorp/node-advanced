fetch('/api/blogs', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title: 'My Title1', content: 'My Content'})
})

fetch('/api/blogs', {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
})
const query = `
  {
    __schema {
      queryType {
        fields {
          name
        }
      }
    }
  }
`;

fetch('http://127.0.0.1:1337/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.dir(data.data.__schema.queryType.fields.map(f => f.name), { maxArrayLength: null }))
.catch(console.error);

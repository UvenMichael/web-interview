export const fetchData = async () => {
    const response = await fetch('http://localhost:3001/');
    if (response.ok) {
      return response.json();
    } else {
      console.error('Error:', response);
    }
}

export const saveData = async (listId,todos) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listId: listId, todos: todos })
};
fetch('http://localhost:3001/', requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        if (response.ok) {
          return data;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
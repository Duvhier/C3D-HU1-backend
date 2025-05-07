const apiUrl = 'http://localhost:3000/api/books';

document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
  document.getElementById('bookForm').addEventListener('submit', handleFormSubmit);
});

async function loadBooks() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const books = await response.json();
      console.log('Books loaded:', books); // Verifica los libros cargados
  
      const bookList = document.getElementById('bookList');
      bookList.innerHTML = '';
  
      books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.publishedDate}) - Genre: ${book.genre}`;
        li.appendChild(createEditButton(book.id));
        li.appendChild(createDeleteButton(book.id));
        bookList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }
function createEditButton(bookId) {
  const button = document.createElement('button');
  button.textContent = 'Edit';
  button.onclick = () => editBook(bookId);
  return button;
}

function createDeleteButton(bookId) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.onclick = () => deleteBook(bookId);
  return button;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
      title: formData.get('title'),
      author: formData.get('author'),
      publishedDate: formData.get('publishedDate'),
      genre: formData.get('genre'),
    };
  
    console.log('Book to save:', book); // Verifica los datos del libro
  
    if (formData.get('id')) {
      await updateBook(formData.get('id'), book);
    } else {
      await createBook(book);
    }
  
    event.target.reset();
    loadBooks();
  }

  async function createBook(book) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
  
    console.log('Create response:', response); // Verifica la respuesta del servidor
  
    if (!response.ok) {
      console.error('Error creating book:', await response.text());
    }
  }

async function updateBook(id, book) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
}

async function deleteBook(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
  loadBooks();
}

function editBook(id) {
  // Fetch the book details and populate the form for editing
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(book => {
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('publishedDate').value = book.publishedDate;
      document.getElementById('genre').value = book.genre;
      document.getElementById('id').value = id;
    });
}
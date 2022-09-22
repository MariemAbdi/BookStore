let books=[{}]

let form = document.getElementById("form")
let title = document.getElementById("booktitle")
let author = document.getElementById("bookauthor")
let price = document.getElementById("bookprice")
let add = document.getElementById("add")

// event launched whenever the submit button in the form (in modal) is clicked
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation()

})

// form validation => all the forms are filled
let formValidation = () =>{
   if (title.value === "") {
        document.getElementById('titleerror').innerHTML = "Title can't be empty"
    }
    else if (author.value === "") {
        document.getElementById('titleerror').innerHTML = ""
        document.getElementById('authorerror').innerHTML = "Author can't be empty"
    }
    else if (price.value === "") {
        document.getElementById('titleerror').innerHTML = ""
        document.getElementById('authorerror').innerHTML = ""
        document.getElementById('priceerror').innerHTML = "Price can't be empty"
    }
    else {
        document.getElementById('titleerror').innerHTML = ""
        document.getElementById('authorerror').innerHTML = ""
        document.getElementById('priceerror').innerHTML = ""
        console.log("success")
        AddBook()
        }
}   

//to add a book to the list of books
let AddBook = () =>{

    var val = localStorage.getItem('books')
    var object= JSON.parse(val)
    var count = JSON.parse(val).length

    books.push({
    id: count==0? count+1 : object[count-1].id+1,
    title: title.value,
    author: author.value,
    price: Number(price.value),
    });

    localStorage.setItem("books", JSON.stringify(books));

    console.log(books)
    createBook()
}

//to display a book in the table of books
let createBook = () =>{
document.getElementById('mybooks').innerHTML= '<tbody class="table-group-divider">';
books.map((x, y) => {
    return (document.getElementById('mybooks').innerHTML += `
    <tr id=${y}><td class="text-primary">${x.id}</td>
    <td>${x.title}</td>
    <td>${x.author}</td>
    <td>${x.price}</td>
    <td><i onClick ="updateBook(this)" class="fa-solid fa-pen-to-square text-warning" data-bs-toggle="modal" data-bs-target="#form"></i></td>
    <td><i onClick ="deleteBook(this)" class="fa-sharp fa-solid fa-trash text-danger"></i></td></tr></tbody>
    `)
    })
    resetForm()
}

//to reset the form after submission
let resetForm = () => {
title.value = ""
author.value = ""
price.value = ""
}

//deleting a book
let deleteBook = (e) => {

    if (confirm("Delete Book ?") == true) {

    //remove the parent of the parent of the parameter
    //the direct parent would be the table cell
    e.parentElement.parentElement.remove()

    books.splice(e.parentElement.parentElement.id, 1);
    //deleting it from the local storage too
    localStorage.setItem("books", JSON.stringify(books));

    } else {
        console.log("Delete canceled!")
      }


      console.log(books);

}

//editing a book
let updateBook = (e) => {
    
    //we save the row's data in an object
    let selectedBook = e.parentElement.parentElement
    
    //setting the data in the fields
    title.value = selectedBook.children[1].innerHTML
    author.value = selectedBook.children[2].innerHTML
    price.value = selectedBook.children[3].innerHTML

    //we remove the existing row
    deleteBook(e)
}

// To fill the data in the table initially from the browser's local storage
//IIFE = Immediately Invoked Functional Expression
(() => {
books = JSON.parse(localStorage.getItem("books")) || []
console.log(books)
createBook()
})()


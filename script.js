let books=[{}]

let addBook = document.getElementById("addBook")
let upBook = document.getElementById("updateBook")

let title = document.getElementById("booktitle")
let author = document.getElementById("bookauthor")
let price = document.getElementById("bookprice")

let titleup = document.getElementById("booktitleup")
let authorup = document.getElementById("bookauthorup")
let priceup = document.getElementById("bookpriceup")

let update=false
var selectedBook= null
// event launched whenever the submit button in the addbook form (in modal) is clicked
addBook.addEventListener("submit", (e)=>{
    e.preventDefault()
    update=false
    formValidation()
})

// event launched whenever the submit button in the updatebook form (in modal) is clicked
upBook.addEventListener("submit", (e)=>{
    e.preventDefault()
    update=true
    formValidation()
})


// form validation => all the forms are filled
let formValidation = () =>{

    if(update==false)
    {if (title.value === "") {
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
        }}
    

    else{
        if (titleup.value === "") {
        document.getElementById('titleerrorup').innerHTML = "Title can't be empty"
    }
    else if (authorup.value === "") {
        document.getElementById('titleerrorup').innerHTML = ""
        document.getElementById('authorerrorup').innerHTML = "Author can't be empty"
    }
    else if (priceup.value === "") {
        document.getElementById('titleerrorup').innerHTML = ""
        document.getElementById('authorerrorup').innerHTML = ""
        document.getElementById('priceerrorup').innerHTML = "Price can't be empty"
    }
    else {
        document.getElementById('titleerrorup').innerHTML = ""
        document.getElementById('authorerrorup').innerHTML = ""
        document.getElementById('priceerrorup').innerHTML = ""
        console.log("success")
        updateBook()
    }
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
    })

    localStorage.setItem("books", JSON.stringify(books))

    console.log(books)
    createBook()
}

//to display a book in the table of books
let createBook = () =>{
document.getElementById('mybooks').innerHTML= '<tbody class="table-group-divider">'
books.map((x, y) => {
    return (document.getElementById('mybooks').innerHTML += `
    <tr id=${y}><td class="text-primary">${x.id}</td>
    <td>${x.title}</td>
    <td>${x.author}</td>
    <td>${x.price}</td>
    <td><i onClick ="editBook(this)" class="fa-solid fa-pen-to-square text-warning" data-bs-toggle="modal" data-bs-target="#updateBook"></i></td>
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

    books.splice(e.parentElement.parentElement.id, 1)
    //deleting it from the local storage too
    localStorage.setItem("books", JSON.stringify(books))

    } else {
        console.log("Delete canceled!")
      }


      console.log(books)

}

//editing a book
let editBook = (e) => {
    //we save the row's data in an object
    selectedBook = e.parentElement.parentElement
        
    //setting the data in the fields in modal
    titleup.value = selectedBook.children[1].innerHTML
    authorup.value = selectedBook.children[2].innerHTML
    priceup.value = selectedBook.children[3].innerHTML

}

let updateBook = () => {

   //update data in table
    selectedBook.cells[0].innerHTML = selectedBook.children[0].innerHTML
    selectedBook.cells[1].innerHTML = titleup.value
    selectedBook.cells[2].innerHTML = authorup.value
    selectedBook.cells[3].innerHTML = priceup.value


     //Find index of specific object using findIndex method.    
    objIndex = books.findIndex((obj => obj.id == selectedBook.children[0].innerHTML))

    //Update object
    books[objIndex].title = titleup.value
    books[objIndex].author = authorup.value
    books[objIndex].price = priceup.value

    //update it locally
    localStorage.setItem("books", JSON.stringify(books))
    console.log(books)

   
}

// To fill the data in the table initially from the browser's local storage
//IIFE = Immediately Invoked Functional Expression
(() => {
books = JSON.parse(localStorage.getItem("books")) || []
console.log(books)
createBook()
})()


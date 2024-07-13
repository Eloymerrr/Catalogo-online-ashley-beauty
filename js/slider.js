const products = document.querySelectorAll(".slider .product")
let counter = 0

function left() {

    if(counter == 0){
        counter = products.length  / 3 - 5
    }else{ 

    counter--
    
    }

    scroll()  


}

function right() {

    if(counter == products.length  / 3 - 5){
        counter =  0 
    }else{
    counter++
    }
    scroll()
}

    


function scroll() {
    products.forEach(function(item){
        item.style.transform =  `translateX(-${counter * 305}px)`
    })
}

document.getElementById("left").addEventListener('click', left)
document.getElementById("right").addEventListener('click', right)


async function GetProducts(){
    const url = "http://localhost:3000/products"
    const responce = await fetch(url,{
        method:"Get",
    })
    data = await responce.json()
    return data 
}
// 
function calculatetotal(products){
    let tottal = 0
    products.forEach(element => {
        tottal+= element["price"]
    });
    return tottal
}

function removeproduct(id,product){
    return product["id"] !== id
}


function Basket(){
    this.products = []
    this.total = ()=>calculatetotal(this.products)
    this.remove = (id)=>{this.products = this.products.filter(product => removeproduct(id, product))}
    this.ids = []
    this.add = (product)=>{
        this.products.push(product)
        
        const temp = this.ids.map((obj)=> obj.id === product.id)
        
        if (temp[0] === false | this.ids.length==0) {
            this.ids.push({id:parseInt(product.id),quantity:1})
        }
        else{
            this.ids.filter(obj =>{if(obj.id == product.id) obj.quantity+=1;})
        }
        
    }
}

// and this {this one maybe in cash or as a cookie}
const BASKET = new Basket()
//export {Basket}

function UpdateBasket(BASKET){
    const basketui = document.getElementById("total")
    basketui.innerText = BASKET.total() + "DT"
}

function AddToBasket(id,data,BASKET){

    const product = data.find((element)=> element["id"] == id)
    
    if(!isNaN(product["quantity"]) && product["quantity"]>0){
        BASKET.add(product)
        UpdateBasket(BASKET)
    }
}

function CreateFooter(element){
    const div2 = document.createElement("div")
    div2.className = "Details"
    const price = document.createElement("span")
    price.innerText = element["price"] + " DT"

    const stock = document.createElement("span")
    
    // add the state of the element
    

    if (element["quantity"]>0){
        stock.style.color = "green"
        stock.innerText = "On Stock"
    }else{
        stock.style.color = "red"
        stock.innerText = "Not in Stock"
    }

    // apend elements
    div2.append(price)
    div2.append(stock)
    return div2
}

function CreateBtn(element){
    const button = document.createElement("button")
    button.id = element["id"]
    button.className = "btns"
    button.innerHTML = '<i class="fa fa-solid fa-plus"></i>'
    return button
}

function CreateFigure(element){
    const fig = document.createElement("figure")
    fig.className = "image-hover"
    const img = document.createElement("img")
    img.src = "static/images/"+element["img"]
    img.alt = element["name"]
    const p2 = document.createElement("p")
    p2.innerText = element["name"]

    
    fig.append(img)
    fig.append(p2)
    return fig
}

function CreateDiscription(element){
    const section = document.createElement("section")
    const p = document.createElement("p")
    section.className = "Description"
    p.innerText = element["description"]
    section.append(p)
    return section
}

function sortfunc(p1,p2){
    return p1.price - p2.price 
}


function build(products,listOfproducts){
    products.forEach((element)=>{
        const div = document.createElement("div")
        div.className = "product"
        const fig = CreateFigure(element)
        div.append(fig)
    
        const div2 = CreateFooter(element)
        div.append(div2)
    
        const secondDiv = document.createElement("div")
        secondDiv.className = "containerbd"
        const section = CreateDiscription(element)
        const btn = CreateBtn(element)
        btn.addEventListener("click",()=>{AddToBasket(btn.id,products,BASKET)})
    
        secondDiv.append(section)
        secondDiv.append(btn)
        div.append(secondDiv)
    
    
        listOfproducts.append(div)
    
    })

}

async function main(){
    
    UpdateBasket(BASKET)
    const products = await GetProducts() 
    
    build(products,listOfproducts)
    const sortButton = document.getElementById("sort")
    const threshButton = document.getElementById("ths")
    const categoryButton = document.getElementById("ctg")

    sortButton.onclick = ()=>{
        products.sort(sortfunc)
        listOfproducts.innerHTML = ""
        build(products,listOfproducts)
    }
    threshButton.onclick = ()=>{
        const thresh = document.getElementById("threshhold").value
        if (thresh.length!==0){
            const result = []
            products.map((element)=> {if(element["price"]<thresh)result.push(element)})
            if(result.length !==0){
                listOfproducts.innerHTML = ""
                build(result,listOfproducts)
            }else{
                listOfproducts.innerHTML = ""
            }

        }else{
            
            listOfproducts.innerHTML = ""
            build(products,listOfproducts)
        }
        
    }
    categoryButton.onclick = ()=>{
        const cat = document.getElementById("category").value
        if (cat.length===0){
            listOfproducts.innerHTML = ""
            build(products,listOfproducts)
        }else{
            const result = []
            products.map((element)=> {if(element["category"]===cat){result.push(element)}})
            if (result.length !==0){
                listOfproducts.innerHTML = ""
                build(result,listOfproducts)
            }else{
                listOfproducts.innerHTML = ""
            }
        }


    }
    
    

}
const listOfproducts = document.getElementById("Pd")
main()


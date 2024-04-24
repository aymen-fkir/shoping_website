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
    button.innerHTML = "<span class='material-symbols-outlined'>remove</span>"
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

// function remove(id,data){
//     data.map((el)=>{if(el.id==id){
//         el.quantity -= 1;
//     }})
// }


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
        secondDiv.append(section)
        secondDiv.append(btn)
        div.append(secondDiv)
    
    
        listOfproducts.append(div)
    
    })

}

async function Getpackages(BASKET){
    try {
      const basketData = BASKET
  
      const response = await fetch("http://localhost:3000/packages/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basketData),
      });
  
      const data = await response.json();
      return data 
    } catch (error) {
      console.error(error.message); 
    }
  
}

async function main(){

    const cookie = document.cookie.replace(" ","")
    const BASKET = JSON.parse(cookie.split(";").find((row) => row.startsWith("ids="))?.split("=")[1])  
    const data = await Getpackages(BASKET)
    
    document.cookie = `infos=${JSON.stringify(data[1])}`
    const listOfproducts = document.getElementById("Pd")
    const products = data[0].map(element=>element["product"])
    build(products,listOfproducts)
}


main()
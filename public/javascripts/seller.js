// create 3 pages 
// 1 - list products - give the option of adding / deleting
const container = document.getElementById("container")




async function fetching(data,url){
    try{
        const responce = await fetch(url,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const res = await responce.json()
        return res
    }catch(err){
        return {}
    }
}


function create(element){
    const row =  document.createElement("tr")
    row.className = "item"
    for (const [key, value] of Object.entries(element)) {
        const th = document.createElement("th")
        th.innerText = value 
        row.append(th)
    }
    const btn = document.createElement("th")
    btn.dataset.name = "delete"
    btn.innerHTML = "<span class='material-symbols-outlined'>delete</span>"
    
    btn.id = element["id"]
    row.append(btn)
    container.appendChild(row)
    
}

function eventmaker(element,url){
    element.addEventListener("click",async function(){
        const data = await fetching({"id":this.id},url+"/delete")
        if(data["status"]==200){
            alert("Product is deleted")
            location.reload()
        }else{
            alert("Error while deleting")
        }
    })
}

async function build(container,url){
    const cookieValue = document.cookie.split('; ').find(c => c.startsWith('id='))?.split('=')[1];
    const data = await fetching({"id":cookieValue},url)

    if (data["status"] == 200){
        const obj = data["data"]
        obj.map((Element,)=>create(Element,container))
    }
    const c = document.getElementsByTagName("th")
    Array.from(c).map(element=>{if(element.dataset.name=="delete"){
        eventmaker(element,url)
    }})
    
}
const url = "http://localhost:3000/seller"
build(container,url)
const btn = document.getElementById("add")
btn.addEventListener("click",(event)=>{window.location.replace(url+"/addproduct")})
//insert into products (name,description,quantity,price,img,seller_id,category) values ("computer","new computer",10,200,'cp.jpeg',1,'Tec');








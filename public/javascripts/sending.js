const btn = document.getElementById("btn")


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

btn.addEventListener('click',async function(){
    const cookieValue = document.cookie.split('; ').find(c => c.startsWith('id='))?.split('=')[1];
    const inputs = document.getElementsByTagName("input")
    const data = {}
    Array.from(inputs).map((Element)=>{data[Element.name] = Element.value})
    data["seller_id"] = cookieValue;
    const url = "http://localhost:3000/seller"
    const responce = await fetching(data,url+"/recieveproducts")
    if(responce["status"]==200){
        alert("product is added")
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
    }else{
        alert("error while adding this error")
    }

})
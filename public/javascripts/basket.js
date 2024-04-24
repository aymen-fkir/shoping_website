const btn = document.getElementById("verify")

btn.onclick = ()=>{
    
    document.cookie = `ids=${JSON.stringify(BASKET.ids)}`
    console.log(JSON.stringify(BASKET.ids))
}

  
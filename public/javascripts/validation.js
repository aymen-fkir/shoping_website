const btn = document.getElementById("btn")


async function Sendbasket(data){
    try{
        const url = "http://localhost:3000/packages/orders"
        const responce = await fetch(url,{
            method:"Post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const res = await responce.json()
        return res
    }catch(error){
        return {status:400}
    }

}

function validate(data){
    const validation = {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data["email"]),
        phone_number: /^([0-9]{8})$/.test(data["phone_number"]),
        address: data["address"].trim() !== "",
        reduction_code: data["reduction_code"]===""?"_":data["reduction_code"],
        name: data["name"],
        lastname: data["lastname"],
        payment_method: data["payment_method"].toLowerCase() === "credit" || data["payment_method"].toLowerCase() === "cash"
      };
    const failedValidation = Object.entries(validation).find(([key, isValid]) => !isValid);
    if (failedValidation) {
        return {result:false,error: failedValidation[0] }; // Return error with key of the first invalid element
    }else{
        return {result:true};
    }   
}

btn.onclick = async ()=>{
    const values = document.getElementsByTagName("input")
    var data = {}
    Array.from(values).map((element)=>{
        data[element.name]=element.value
        element.value = ""
    })
    const result = validate(data)
    if (result["result"]==false){
        alert(`Error in ${result["error"]}`)
    }else{
        const cookie = document.cookie.replace(" ","")
        const infos = JSON.parse(cookie.split(";").find((row) => row.startsWith("infos="))?.split("=")[1])
        data["reduction_code"] = data["reduction_code"]===""?"_":data["reduction_code"]
        data["products"] = infos
        const responce = await Sendbasket(data)
        console.log(responce)
        if (responce.status ==200){
            alert("You will recieve your package in couple of days")
        }else{
            alert("there was been an error please try again")
        }

    }

    
    
}
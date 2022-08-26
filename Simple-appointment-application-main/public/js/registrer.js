function enviar(){
    const name=document.getElementById("name").value
    const lastname=document.getElementById("lastname").value
    const nit=document.getElementById("nit").value
    const username=document.getElementById("username").value
    const password=document.getElementById("password").value

    fetch("http://localhost:8080/registrer/",{

        method: 'POST',
        body: JSON.stringify({name:name,lastname:lastname,nit:nit,username:username,password:password}),
        headers:{
                 'Content-Type': 'application/json'
             }
        
        })
        .then(respuesta => respuesta.json() )
        .then(respuesta =>{

            
         
        }
        )

        window.location.href="http://localhost:8080/"

    
}
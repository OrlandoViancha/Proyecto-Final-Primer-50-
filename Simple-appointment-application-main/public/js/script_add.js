document.getElementById("department").addEventListener('change',()=>{
            
    var departmentcode = document.getElementById("department").value;
    document.getElementById("doctor").innerHTML=""

    var doctor = document.getElementById("doctor");

    doctor.append(new Option("Seleccione el doctor.."))

    const result=datadoctor.filter(value=>value.dept==departmentcode).forEach(reg => {
       
        doctor.append(new Option(`${reg.Name} ${reg.LastName}`,reg._id))
            
        
    });

})

document.getElementById("doctor").addEventListener('change',()=>{
    let html=""

    doctorcode=document.getElementById("doctor").value
    console.log(doctorcode)

    const result=datadoctor.filter(value=>value._id==doctorcode).forEach(doc => {

        doc.schedule.forEach(sch=>{

            if(sch.state==true){

                const date= dataschedule.filter(value=>value._id==sch.id).forEach(data=>{

                            html+=`<tr>
                                <td><button type="button" class="btn btn-primary" onclick="enviar('${data.date}','${data.hour}','${doctorcode}','${sch.id}')">A</button></td>
                                <td> ${data.date} </td>
                                <td> ${data.hour} </td>
                                </tr>`
                            })

            }

            
        })
    })
    document.getElementById("tbodycitas").innerHTML=html


})




function enviar(date,hour,doctorid,schedule){

    fetch("http://localhost:8080/appointment/add/",{

        method: 'POST',
        body: JSON.stringify({date:date,hour:hour,doctorcode:doctorid,scheduleid:schedule}),
        headers:{
                 'Content-Type': 'application/json'
             }
        
        })
        .then(respuesta => respuesta.json() )
        .then(respuesta =>{

            if(respuesta.result==true){
                window.location.href="http://localhost:8080/appointment/"
            }
            else{
                alert("USTED YA TIENE UNA CITA REGISTRADA PARA ESA FECHA")
            }
        }
        )
}
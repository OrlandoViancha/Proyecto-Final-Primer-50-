
              let html=""

              appoinment.forEach(data=>{

                  html+=`<tr>
                                  <td><button type="submit" class="btn btn-primary" onclick="enviar('${data._id}','${data.scheduleID}','${data.doctorID}')">E</button></td>
                                  <td> ${data.date} </td>
                                  <td> ${data.time} </td>
                                  <td> ${data.doctorAppo.Name} ${data.doctorAppo.LastName} </td>
                                  </tr>`

              })

              document.getElementById("tbodyhistorial").innerHTML=html

              function enviar(id,schedule,doctor){

                fetch("http://localhost:8080/appointment/",{

                    method: 'DELETE',
                    body: JSON.stringify({_id:id,schedule:schedule,doctorcode:doctor}),
                    headers:{
                            'Content-Type': 'application/json'
                        }

                    })
                    .then(respuesta => respuesta.json() )
                    .then(respuesta =>{

                      if(respuesta.result==true){
                        alert("Tu cita ha sido eliminada correctamente")
                        window.location.href="http://localhost:8080/appointment/"
                        
                        }
                    }
                    )


              }
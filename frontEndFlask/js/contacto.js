const { createApp } = Vue
  createApp({
    data() {
      return {
        contactos:[],
        url:'http://victorpython28.pythonanywhere.com/contactos',   
        error:false,
        cargando:true,
        id:0,
        nombre:"", 
        correo:"",
        mensaje:"",
       
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.contactos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
                
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let contacto = {
                nombre:this.nombre,
                correo: this.correo,
                mensaje: this.mensaje,      
            }
            var options = {
                body:JSON.stringify(contacto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            } 
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "productos.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        },
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
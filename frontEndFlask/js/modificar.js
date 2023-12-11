console.log(location.search)     
var id=location.search.substr(4)  
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        stock:0,
        precio:0,
        marca:"",
        categoria:"",
        url:'http://victorpython28.pythonanywhere.com/productos'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.imagen=data.imagen
                    this.stock=data.stock
                    this.precio=data.precio
                    this.marca=data.marca
                    this.categoria=data.categoria                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                marca: this.marca,
                categoria: this.categoria
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
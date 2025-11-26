class Alcancia {
    constructor(t, c) {
        this.tipo = t; 
        this.cantidad = c; 
    }

    calcularMovimiento() {
        if (this.tipo == "ahorro") {
            return this.cantidad;
        } else {
            return -this.cantidad;
        }
    }
}

document.getElementById('formaDepositar').addEventListener('submit', function (e) {
    e.preventDefault();

    const cantidad = parseFloat(document.getElementById('montoDeposito').value);
    const tipo = 'ahorro';

    const objetoAlcancia = new Alcancia(tipo, cantidad);

    guardarMovimiento(objetoAlcancia);
    mostrarMovimientos();
    mostrarTotalSaldo();
});

document.getElementById('formaRetirar').addEventListener('submit', function (e) {
    e.preventDefault();

    const cantidad = parseFloat(document.getElementById('cantidadRetiro').value); 
    const tipo = 'retiro'; 
    if(cantidad <= 0){
        alert("Ingresa una cantidad que no sea negativa o igual a 0")
        return;
    }

    const saldoActual = obtenerSaldoActual(); 

    if (cantidad > saldoActual) {
        alert("Saldo insuficiente."); 
        return;
    }

    const objetoAlcancia = new Alcancia(tipo, cantidad);

    guardarMovimiento(objetoAlcancia);
    mostrarMovimientos();
    mostrarTotalSaldo();
});

function guardarMovimiento(movimiento) {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimiento.id = movimientos.length + 1;

    movimientos.push(movimiento);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
    alert("Movimiento guardado");
}

function mostrarMovimientos() {
    const lista = document.getElementById('listaMovimientos');
    
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || []; 
    lista.innerHTML = "";

    movimientos.forEach(m => {
        lista.innerHTML += `
            <p><b>Número de movimiento:</b> ${m.id}</p>
            <p>Tipo: ${m.tipo}</p>
            <p>Cantidad: $${m.cantidad}</p>
            <hr>
        `;
    });
}

function obtenerSaldoActual() {
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    let saldo = 0;

    movimientos.forEach(m => {
        const movimientoObj = new Alcancia(m.tipo, m.cantidad);
        saldo += movimientoObj.calcularMovimiento(); 
    });


    return saldo;
}

function mostrarTotalSaldo() {
    const saldoTotal = obtenerSaldoActual();
    document.getElementById('saldo').innerHTML = `Saldo total: $${saldoTotal}`;
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarMovimientos();
    mostrarTotalSaldo();
});
import { useState, useEffect } from "react";
import axios from "axios";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);

    const suma = data.reduce((acc, item) => acc + item.precio, 0);
    setTotal(suma);
  }, []);

  const eliminarItem = (id) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
    setCarrito(nuevo);

    const suma = nuevo.reduce((acc, item) => acc + item.precio, 0);
    setTotal(suma);
  };

  async function finalizarCompra() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }

    const compra = {
      usuarioEmail: user.email,
      productos: JSON.stringify(carrito),
      total: total
    };

    try {
      await axios.post("http://localhost:8080/compras/guardar", compra);
      setModalVisible(true); // MOSTRAR MODAL ANIMADO

      // limpiar carrito
      localStorage.setItem("carrito", JSON.stringify([]));
      setCarrito([]);
      setTotal(0);

    } catch (e) {
      alert("Error al procesar la compra");
    }
  }

  return (
    <div className="container py-5">
      <h1 className="section-title">Carrito de Compras 🛒</h1>

      {carrito.length === 0 ? (
        <p className="text-light mt-4">Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="info-card p-3 mb-3 rounded-4 text-light d-flex justify-content-between">
              <div>
                <strong>{item.nombre}</strong>
                <p>${item.precio.toLocaleString("es-CL")}</p>
              </div>
              <button className="btn btn-danger" onClick={() => eliminarItem(item.id)}>X</button>
            </div>
          ))}

          <h3 className="text-neon mt-4">Total: ${total.toLocaleString("es-CL")}</h3>

          <button className="btn btn-neon w-100 mt-3" onClick={finalizarCompra}>
            Finalizar compra 💳
          </button>
        </>
      )}

      {/* ========================== */}
      {/* MODAL NEÓN DE COMPRA EXITOSA */}
      {/* ========================== */}
      {modalVisible && (
        <div className="modal-compra show" onClick={() => setModalVisible(false)}>
          <div className="modal-content-neon" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-neon">¡Compra exitosa! 🎉</h2>
            <p className="text-light mt-3">
              Gracias por tu compra en <strong>LevelUp</strong>.  
              Revisa tu historial en tu perfil.
            </p>

            <button className="btn btn-success w-100 mt-3" onClick={() => setModalVisible(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
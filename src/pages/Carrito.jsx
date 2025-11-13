import { useState, useMemo } from "react";
import { calcularSubtotal, calcularDescuento, calcularTotal } from "../utils/cart.js";

export default function Carrito(){ 
  
  const [items, setItems] = useState([
    { id: 1, title: "Dragon Ball: Sparking Zero", price: 59990, qty: 1 },
    { id: 2, title: "Zelda: Tears of the Kingdom", price: 49990, qty: 2 }
  ]);

  const [esDuoc, setEsDuoc] = useState(true);

  // useMemo para evitar cálculos innecesarios en cada render 
  const subtotal = useMemo(() => calcularSubtotal(items), [items]);
  const descuento = useMemo(() => calcularDescuento(subtotal, esDuoc), [subtotal, esDuoc]);
  const total = useMemo(() => calcularTotal(items, esDuoc), [items, esDuoc]);

  function cambiarCantidad(id, nuevaCantidad) {
    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, qty: nuevaCantidad } : it
      )
    );
  }
  
  return (

    <main className="container py-4">
      <h1 className="section-title mb-3">Tu Carrito</h1>

      <div className="row g-3">
        {items.map(it => (
          <div key={it.id} className="col-12">
            <div className="p-3 rounded-4 bg-dark text-light d-flex justify-content-between align-items-center">
              <div>
                <strong>{it.title}</strong><br />
                <small>${it.price.toLocaleString("es-CL")} c/u</small>
              </div>

              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className="form-control form-control-sm"
                  style={{width: "70px"}}
                  value={it.qty}
                  onChange={e => cambiarCantidad(it.id, Number(e.target.value))}
                />
                <span className="fw-bold">
                  ${(it.price * it.qty).toLocaleString("es-CL")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="bg-secondary text-light rounded-4 p-3">
        <p className="mb-1 d-flex justify-content-between">
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString("es-CL")}</span>
        </p>
        <p className="mb-1 d-flex justify-content-between">
          <span>Descuento DUOC:</span>
          <span>- ${descuento.toLocaleString("es-CL")}</span>
        </p>
        <p className="fs-5 fw-bold d-flex justify-content-between">
          <span>Total a pagar:</span>
          <span>${total.toLocaleString("es-CL")}</span>
        </p>

        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="duocCheck"
            checked={esDuoc}
            onChange={e => setEsDuoc(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="duocCheck">
            Soy estudiante DUOC (20% OFF)
          </label>
        </div>
      </div>
    </main>
); 
}
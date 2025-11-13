import { calcularSubtotal, calcularDescuento, calcularTotal } from "./cart.js";

describe("Lógica del carrito", () => {

  it("calcularSubtotal suma precio * cantidad de todos los items", () => {
    console.log("Ejecutando test de calcularSubtotal con items de prueba...");
    console.log("Items de prueba: ", [
      { price: 10000, qty: 2 },
      { price: 5000, qty: 1 }
    ]);
    const items = [
      { price: 10000, qty: 2 },
      { price: 5000, qty: 1 }
    ]; 
    console.log("Subtotal calculado: ", calcularSubtotal(items));
    console.log("Subtotal esperado: 25000");
    expect(calcularSubtotal(items)).toBe(25000);
  });

  it("calcularDescuento aplica 20% solo si esDuoc = true", () => {
    expect(calcularDescuento(10000, true)).toBe(2000);
    expect(calcularDescuento(10000, false)).toBe(0);
  });

  it("calcularTotal descuenta el beneficio DUOC correctamente", () => {
    const items = [
      { price: 10000, qty: 1 }
    ];
    expect(calcularTotal(items, true)).toBe(8000);
  });

  it("si el carrito está vacío el total es 0 aunque esDuoc sea true", () => {
    const items = [];
    const total = calcularTotal(items, true);
    expect(total).toBe(0);
  });

  it("ignora productos con cantidad 0 en el subtotal", () => {
    const items = [
      { id: 1, price: 10000, qty: 0 },
      { id: 2, price: 5000, qty: 2 }
    ];
    const subtotal = calcularSubtotal(items);
    expect(subtotal).toBe(10000); 
  });

  it("no aplica descuento si subtotal es 0, aunque esDuoc sea true", () => {
    const subtotal = 0;
    const descuento = calcularDescuento(subtotal, true);
    expect(descuento).toBe(0);
  });

});

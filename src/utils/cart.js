export function calcularSubtotal(items) {
  return items.reduce((acc, it) => acc + it.price * it.qty, 0);
}

export function calcularDescuento(subtotal, esDuoc) {
  return esDuoc ? subtotal * 0.2 : 0;
}

export function calcularTotal(items, esDuoc) {
  const sub = calcularSubtotal(items);
  const desc = calcularDescuento(sub, esDuoc);
  return sub - desc;
}

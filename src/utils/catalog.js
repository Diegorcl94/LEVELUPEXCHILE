export function filtrarProductos(products, query) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.tag.toLowerCase().includes(q)
  );
}
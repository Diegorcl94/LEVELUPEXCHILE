import { filtrarProductos } from "./catalog.js";

describe("Filtrado de catálogo", () => {
  const base = [
    { title: "Dragon Ball: Sparking Zero", tag: "PS5" },
    { title: "Zelda: Tears of the Kingdom", tag: "Switch" },
    { title: "Mario 64", tag: "N64" },
  ];

  it("encuentra por título parcial", () => {             
    const res = filtrarProductos(base, "dragon");
    expect(res.length).toBe(1);
    expect(res[0].title).toBe("Dragon Ball: Sparking Zero");
  });

  it("encuentra por tag/consola", () => {                  
    const res = filtrarProductos(base, "switch");
    expect(res.length).toBe(1);
    expect(res[0].tag).toBe("Switch");
  });

  it("si no coincide nada, retorna arreglo vacío", () => { 
    const res = filtrarProductos(base, "xbox");
    expect(res.length).toBe(0);
  });

  it("no distingue mayúsculas o minúsculas en la búsqueda", () => {
  const base = [
    { title: "Dragon Ball: Sparking Zero", tag: "PS5" },
    { title: "Zelda: Tears of the Kingdom", tag: "Switch" },
  ];

  const res = filtrarProductos(base, "zelDA");
  expect(res.length).toBe(1);
  expect(res[0].title).toBe("Zelda: Tears of the Kingdom");
});

});

import type { Producto } from '../../schemas/productoSchema'

export const productosFixture = [
  {
    id: 1,
    tipo: 'expreso',
    nombre: 'Expreso Pocillo Brasil',
    tamanio: 'Pocillo',
    gramosCafe: 18,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 5020,
  },
  {
    id: 2,
    tipo: 'expreso',
    nombre: 'Expreso Pocillo Colombia',
    tamanio: 'Pocillo',
    gramosCafe: 18,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 5740,
  },
  {
    id: 3,
    tipo: 'expreso',
    nombre: 'Expreso Pocillo Etiopia',
    tamanio: 'Pocillo',
    gramosCafe: 18,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 6820,
  },
  {
    id: 4,
    tipo: 'expreso',
    nombre: 'Expreso Mediano Brasil',
    tamanio: 'Mediano',
    gramosCafe: 27,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 6280,
  },
  {
    id: 5,
    tipo: 'expreso',
    nombre: 'Expreso Mediano Colombia',
    tamanio: 'Mediano',
    gramosCafe: 27,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 7360,
  },
  {
    id: 6,
    tipo: 'expreso',
    nombre: 'Expreso Mediano Etiopia',
    tamanio: 'Mediano',
    gramosCafe: 27,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 8980,
  },
  {
    id: 7,
    tipo: 'expreso',
    nombre: 'Expreso Taza grande Brasil',
    tamanio: 'Taza grande',
    gramosCafe: 36,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 7540,
  },
  {
    id: 8,
    tipo: 'expreso',
    nombre: 'Expreso Taza grande Colombia',
    tamanio: 'Taza grande',
    gramosCafe: 36,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 8980,
  },
  {
    id: 9,
    tipo: 'expreso',
    nombre: 'Expreso Taza grande Etiopia',
    tamanio: 'Taza grande',
    gramosCafe: 36,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 11140,
  },
  {
    id: 10,
    tipo: 'filtrado',
    nombre: 'Filtrado Pocillo Brasil',
    tamanio: 'Pocillo',
    gramosCafe: 6,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 4040,
  },
  {
    id: 11,
    tipo: 'filtrado',
    nombre: 'Filtrado Pocillo Colombia',
    tamanio: 'Pocillo',
    gramosCafe: 6,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 4280,
  },
  {
    id: 12,
    tipo: 'filtrado',
    nombre: 'Filtrado Pocillo Etiopia',
    tamanio: 'Pocillo',
    gramosCafe: 6,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 4640,
  },
  {
    id: 13,
    tipo: 'filtrado',
    nombre: 'Filtrado Mediano Brasil',
    tamanio: 'Mediano',
    gramosCafe: 15,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 5300,
  },
  {
    id: 14,
    tipo: 'filtrado',
    nombre: 'Filtrado Mediano Colombia',
    tamanio: 'Mediano',
    gramosCafe: 15,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 5900,
  },
  {
    id: 15,
    tipo: 'filtrado',
    nombre: 'Filtrado Mediano Etiopia',
    tamanio: 'Mediano',
    gramosCafe: 15,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 6800,
  },
  {
    id: 16,
    tipo: 'filtrado',
    nombre: 'Filtrado Taza grande Brasil',
    tamanio: 'Taza grande',
    gramosCafe: 25,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 6700,
  },
  {
    id: 17,
    tipo: 'filtrado',
    nombre: 'Filtrado Taza grande Colombia',
    tamanio: 'Taza grande',
    gramosCafe: 25,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 7700,
  },
  {
    id: 18,
    tipo: 'filtrado',
    nombre: 'Filtrado Taza grande Etiopia',
    tamanio: 'Taza grande',
    gramosCafe: 25,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 9200,
  },
  {
    id: 19,
    tipo: 'pasteleria',
    nombre: 'Muffin de chocolate',
    precio: 2500,
  },
  {
    id: 20,
    tipo: 'pasteleria',
    nombre: 'Torta selva negra',
    precio: 4200,
  },
] satisfies Producto[]

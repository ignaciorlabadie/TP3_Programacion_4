import { useEffect, useState } from 'react'
import { MenuProductos } from './components/MenuProductos'
import { Carrito } from './components/Carrito'
import { EncabezadoMesa } from './components/EncabezadoMesa'
import { leerMesa } from '../domain/mesa'
import { useCarrito } from './context/CarritoContext'

function App() {
  const [mesa, setMesa] = useState<number | null>(null)
  const { agregar, items, sumar, restar, quitar, total, estaVacío } = useCarrito()

  useEffect(() => {
    setMesa(leerMesa(window.location.search))
  }, [])

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">Cafetería Origen</h1>
        <EncabezadoMesa mesa={mesa} />
      </header>
      <MenuProductos onAgregar={agregar} />
      <Carrito
        items={items}
        onSumar={sumar}
        onRestar={restar}
        onQuitar={quitar}
        total={total}
        estaVacío={estaVacío}
        onConfirmar={() => undefined}
      />
    </main>
  )
}

export default App

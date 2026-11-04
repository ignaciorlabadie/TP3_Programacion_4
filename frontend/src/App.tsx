import { useEffect, useState } from 'react'
import { MenuProductos } from './components/MenuProductos'
import { EncabezadoMesa } from './components/EncabezadoMesa'
import { leerMesa } from '../domain/mesa'

function App() {
  const [mesa, setMesa] = useState<number | null>(null)

  useEffect(() => {
    setMesa(leerMesa(window.location.search))
  }, [])

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">Cafetería Origen</h1>
        <EncabezadoMesa mesa={mesa} />
      </header>
      <MenuProductos onAgregar={() => undefined} />
    </main>
  )
}

export default App

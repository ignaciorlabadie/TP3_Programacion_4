import { MenuProductos } from './components/MenuProductos'

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">Cafetería Origen</h1>
        <p className="text-body-secondary mb-0">Menú de mesa</p>
      </header>
      <MenuProductos onAgregar={() => undefined} />
    </main>
  )
}

export default App

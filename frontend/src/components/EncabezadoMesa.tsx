type Props = {
  mesa: number | null
}

export function EncabezadoMesa({ mesa }: Props) {
  return (
    <p className="text-body-secondary mb-0">
      {mesa === null ? 'Retirar en la barra' : `Mesa ${mesa}`}
    </p>
  )
}

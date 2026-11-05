import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmacionPedido } from '../../components/ConfirmacionPedido';
import { pedidoFixture } from '../fixtures/pedidoFixture';



it('muestra número, estado y total del pedido', () => {
  render(<ConfirmacionPedido pedido={pedidoFixture} />);
  expect(screen.getByText('42')).toBeInTheDocument();
  expect(screen.getByText('pendiente')).toBeInTheDocument();
  expect(screen.getByText('$17.220')).toBeInTheDocument();
});

it('actualiza el estado sin recargar', async () => {
  const user = userEvent.setup();
  // MSW devuelve primero pendiente, luego entregado para GET /pedidos/42
  render(<ConfirmacionPedido pedido={pedidoFixture} />);

  await user.click(screen.getByRole('button', { name: 'Actualizar estado' }));
  expect(await screen.findByText('entregado')).toBeInTheDocument();
  expect(screen.getByText('$17.220')).toBeInTheDocument(); // total se conserva del nuevo GET
});

it('muestra error y conserva datos anteriores si falla la consulta', async () => {
  const user = userEvent.setup();
  // MSW devuelve 500 para GET /pedidos/42
  render(<ConfirmacionPedido pedido={pedidoFixture} />);

  await user.click(screen.getByRole('button', { name: 'Actualizar estado' }));
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
  expect(screen.getByText('pendiente')).toBeInTheDocument(); // conserva estado anterior
  expect(screen.getByText('$17.220')).toBeInTheDocument();   // conserva total anterior
});
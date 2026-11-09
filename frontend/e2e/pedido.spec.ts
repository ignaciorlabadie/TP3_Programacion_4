import { expect, test } from '@playwright/test'
import { reiniciarPedidos } from './helpers.ts'

test.describe('Pedidos', () => {
  test.beforeEach(async ({ request }) => {
    await reiniciarPedidos(request)
  })

  test('confirma un pedido en la mesa 4 y actualiza su estado', async ({
    page,
  }) => {
    // 2 expresos medianos de Colombia ($7.360 c/u) + muffin ($2.500)
    const totalEsperado = '$17.220'

    await page.goto('/?mesa=4')

    await expect(page.getByText('Mesa 4')).toBeVisible()
    await page.getByRole('radio', { name: 'Expreso' }).check()
    await page.getByRole('radio', { name: 'Mediano' }).check()
    await page.getByRole('radio', { name: 'Colombia' }).check()

    const agregarCafe = page.getByRole('button', {
      name: 'Agregar',
      exact: true,
    })
    await agregarCafe.click()
    await agregarCafe.click()

    await page
      .getByRole('button', { name: 'Agregar Muffin de chocolate' })
      .click()

    const carrito = page.getByRole('region', { name: 'Carrito de pedidos' })
    await expect(carrito.getByText(totalEsperado)).toBeVisible()

    await page.getByRole('button', { name: 'Confirmar pedido' }).click()

    const confirmacion = page.getByRole('region', {
      name: 'Confirmación de pedido',
    })
    await expect(confirmacion).toBeVisible()
    await expect(confirmacion.getByText('Número:')).toBeVisible()
    await expect(confirmacion.getByText('pendiente')).toBeVisible()
    await expect(confirmacion.getByText(totalEsperado)).toBeVisible()
    await expect(page.getByText('El carrito está vacío')).toBeVisible()

    await confirmacion
      .getByRole('button', { name: 'Actualizar estado' })
      .click()

    await expect(confirmacion.getByText('pendiente')).toBeVisible()
    await expect(confirmacion.getByText(totalEsperado)).toBeVisible()
  })
})
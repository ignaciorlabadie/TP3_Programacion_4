import { expect, test } from '@playwright/test'

test.describe('Menú de productos', () => {
  test('muestra el menú desde la API real y permite elegir un café', async ({
    page,
  }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Café' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pastelería' })).toBeVisible()
    await expect(page.getByText('Muffin de chocolate')).toBeVisible()
    await expect(page.getByText('$2.500')).toBeVisible()

    await page.getByRole('radio', { name: 'Expreso' }).check()
    await page.getByRole('radio', { name: 'Mediano' }).check()
    await page.getByRole('radio', { name: 'Colombia' }).check()

    await expect(page.getByText('$7.360')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Agregar', exact: true }),
    ).toBeEnabled()
  })
})

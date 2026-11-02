import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 375, height: 812 } })

test.describe('Menú en celular', () => {
  test('no genera scroll horizontal y permite elegir un café', async ({
    page,
  }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Café' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pastelería' })).toBeVisible()

    const desborda = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    )
    expect(desborda).toBe(false)

    await expect(page.getByText('Muffin de chocolate')).toBeVisible()

    await page.getByRole('radio', { name: 'Expreso' }).check()
    await page.getByRole('radio', { name: 'Mediano' }).check()
    await page.getByRole('radio', { name: 'Colombia' }).check()

    await expect(page.getByText('$7.360')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Agregar', exact: true }),
    ).toBeEnabled()
  })
})

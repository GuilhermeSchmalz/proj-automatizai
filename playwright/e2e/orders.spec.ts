import { test, expect } from '@playwright/test'; 

test('Assert order request search', async ({ page }) => {

    const testData = {
        baseURL: "http://localhost:5173/",
        orderCode: "VLO-MOVUFJ"
    };
    
    await page.goto(testData.baseURL);
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(testData.orderCode);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(testData.orderCode)).toBeVisible({ timeout: 10000 });
    
});
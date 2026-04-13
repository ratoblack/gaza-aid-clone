

## Stripe Embedded Checkout

Sim, da pra embedar! O Stripe oferece o modo **Embedded Checkout** que renderiza o formulário de pagamento diretamente no seu site, sem redirecionar pro domínio da Stripe.

Atualmente o código usa `mode: "payment"` que retorna uma URL e tenta abrir num iframe — mas o Stripe bloqueia isso. A solução correta é usar `ui_mode: "embedded"`, que retorna um `client_secret` e usa o SDK do Stripe pra renderizar o checkout inline.

### Mudanças necessárias

**1. Instalar dependências**
- `@stripe/stripe-js` e `@stripe/react-stripe-js`

**2. Atualizar a Edge Function `create-donation-checkout`**
- Adicionar `ui_mode: "embedded"` na criação da session
- Trocar `success_url` por `return_url`
- Retornar `clientSecret` em vez de `url`

**3. Atualizar o `DonationModal.tsx`**
- Após clicar "Donate", receber o `clientSecret` do backend
- Usar `<EmbeddedCheckoutProvider>` + `<EmbeddedCheckout>` do Stripe pra renderizar o formulário dentro do modal
- Manter o header com botão "Back" e "Close"

### Resultado
O formulário de pagamento da Stripe (cartão, Apple Pay, etc.) aparece direto dentro do modal, sem sair do site. O visual é controlado pelo Stripe mas fica integrado na sua página.


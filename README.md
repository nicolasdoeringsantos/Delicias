# Delícias da Nossa Casa

Site institucional (uma página só, com navegação por JS entre "abas": Home, Menu, Sobre Nós, Contato) para vendas via WhatsApp, sem carrinho/checkout.

## Como abrir

Basta abrir `index.html` no navegador (ou usar a extensão **Live Server** do VS Code para recarregar automaticamente enquanto edita).

## Estrutura de pastas

```
delicias-da-nossa-casa/
├── index.html              → todo o HTML, CSS e JS do site
├── README.md                → este arquivo
└── images/
    ├── logo.png              → logo (header, footer, seção "Nossa história" e "Sobre Nós")
    ├── hero-familia.jpg      → foto grande da Home (família preparando pão)
    ├── sobre-processo.jpg    → foto da página "Sobre Nós" (processo de produção)
    └── produtos/
        ├── pao-rocambole-beterraba.jpg
        ├── biscoitos-amanteigados.jpg
        ├── pao-caseiro-fermentacao.jpg
        ├── cupcake-recheado.jpg
        ├── torta-doce-fatia.jpg
        ├── rosquinhas-glaceadas.jpg
        ├── geleia-frutas-vermelhas.jpg
        └── pao-de-mel-recheado.jpg
```

**Coloque suas imagens reais com esses nomes exatos** dentro de `images/` (e `images/produtos/`) e elas aparecerão automaticamente no site. Se preferir outros nomes/caminhos, ajuste:
- as tags `<img src="images/...">` no HTML (logo, hero, sobre-processo);
- o array `products` dentro da tag `<script>` no final do `index.html` (campo `image` de cada produto).

## O que editar com mais frequência

| O que | Onde no `index.html` |
|---|---|
| Número de WhatsApp | constante `WHATS_NUMBER` no `<script>` + os textos "(54) 98416-3345" espalhados pelo HTML |
| Lista de produtos (nome, preço, foto) | array `products` no `<script>` |
| Texto da "Nossa História" | seção `<div class="story">` |
| Cores | variáveis no topo do `<style>`, dentro de `:root { ... }` |
| Fontes | `<link>` do Google Fonts no `<head>` + variáveis `font-family` no CSS |

## Observações técnicas

- Não há build step nem dependências — é HTML/CSS/JS puro em um único arquivo.
- Cada botão "Falar no Whats" monta um link `https://wa.me/NUMERO?text=...` com o nome e preço do produto já preenchidos na mensagem.
- O site é mobile-first; o layout se adapta em breakpoints de 700px e 1000px (grid do menu) e 880px (menu principal vira menu hambúrguer).
- Ícone do WhatsApp está embutido como SVG (`<symbol id="ic-whatsapp">`) — não depende de arquivo externo.

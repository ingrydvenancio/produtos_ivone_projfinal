/* ==========================================================================
   PRODUTOS IVONE - LÓGICA DO E-COMMERCE, CARRINHO, CHECKOUT E ACESSIBILIDADE
   ========================================================================== */

const PRODUCTS = [
    {
        id: 1,
        image: "assets/kitprodivone_linha1.jpg",
        name: "Kit creme e bodysplash Ivone Nuit de Bed-Stuy 100ml",
        category: "perfumaria",
        categoryLabel: "Perfumaria Fina",
        oldPrice: 249.90,
        price: 89.90,
        discount: 64,
        blackFriday: true,
        rating: 4.9,
        reviews: 312,
        description: "Notas envolventes de baunilha de Madagascar, amora negra e âmbar dourado. Fixação de 12 horas para você chegar chegando em qualquer festa do Brooklyn."
    },
    {
        id: 2,
        image: "assets/kitfacialprodivone.jpeg",
        name: "Kit facial produtos Ivone",
        category: "maquiagem",
        categoryLabel: "Maquiagem",
        oldPrice: 69.90,
        price: 24.90,
        discount: 64,
        blackFriday: true,
        rating: 4.8,
        reviews: 218,
        description: "Alta cobertura na primeira camada, enriquecido com ácido hialurônico e manteiga de karité. Não transfere nem quando você briga com o Julius por causa de 2 centavos."
    },
    {
        id: 3,
        image: "assets/perfumeprodivone.jpeg",
        name: "Perfume Elegância da Rochelle 60g",
        category: "skincare",
        categoryLabel: "Skincare & Corpo",
        oldPrice: 159.90,
        price: 59.90,
        discount: 63,
        blackFriday: true,
        rating: 5.0,
        reviews: 405,
        description: "Fórmula revitalizante com Niacinamida 10% e Ouro Coloidal. Devolve o viço imediato mesmo depois de cuidar de três filhos e dois empregos."
    },
    {
        id: 4,
        image: "assets/livininprodivone.jpeg",
        name: "Leave-in Capilar Brilho de Salão Ivone Silk",
        category: "cabelos",
        categoryLabel: "Cabelos & Tranças",
        oldPrice: 119.90,
        price: 44.90,
        discount: 62,
        blackFriday: true,
        rating: 4.9,
        reviews: 189,
        description: "Óleo reparador antifrizz com blend de argan, ojon e biotina. Ideal para finalização de tranças, cachos definidos e escova modelada."
    },
    {
        id: 5,
        image: "assets/paletadesombraprodivone.jpeg",
        name: "Paleta de Sombras Diva Dourada 6 Cores",
        category: "maquiagem",
        categoryLabel: "Maquiagem",
        oldPrice: 139.90,
        price: 49.90,
        discount: 64,
        blackFriday: true,
        rating: 4.7,
        reviews: 142,
        description: "Pigmentos ultrafinos acetinados e opacos nos tons clássicos bordô, champanhe e bronze. Esfuma com facilidade profissional."
    },
    {
        id: 6,
        image: "assets/kitprodivonebaunilha.jpeg",
        name: "Kit Body Splash Baunilha 200ml",
        category: "perfumaria",
        categoryLabel: "Perfumaria Fina",
        oldPrice: 89.90,
        price: 39.90,
        discount: 56,
        blackFriday: false,
        rating: 4.8,
        reviews: 97,
        description: "Refrescância sofisticada pós-banho com toque frutado adocicado e fundo amadeirado suave."
    },
    {
        id: 7,
        image: "assets/mascarahidratacaoprodivone.jpeg",
        name: "Máscara Reconstrutora Tranças & Cachos 300g",
        category: "cabelos",
        categoryLabel: "Cabelos & Tranças",
        oldPrice: 99.90,
        price: 37.90,
        discount: 62,
        blackFriday: true,
        rating: 4.9,
        reviews: 264,
        description: "Hidratação profunda em 3 minutos com queratina vegetal e óleo de rícino."
    },
    {
        id: 8,
        image: "assets/kitprodivone3perfumes.jpg",
        name: "Kit Perfumes Produtos Ivone Corpo & Colo Ouro Rosé",
        category: "skincare",
        categoryLabel: "Skincare & Corpo",
        oldPrice: 129.90,
        price: 54.90,
        discount: 58,
        blackFriday: false,
        rating: 4.8,
        reviews: 115,
        description: "Partículas peroladas sutis que hidratam a pele e deixam um glow elegante sem sensação oleosa."
    }
];

const state = {
    category: 'todos',
    searchQuery: '',
    sortBy: 'featured',
    cart: [],
    appliedCoupon: null,
    activeProduct: null,
    shippingCost: 14.90,
    shippingMethodLabel: 'Entrega Econômica',
    paymentMethod: 'pix',
    fontSize: 16
};

const formatBRL = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function showVisualToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'visual-toast';
    toast.textContent = `✦ ${message}`;
    container.appendChild(toast);

    const librasText = document.getElementById('libras-caption-text');
    if (librasText) librasText.textContent = message;

    setTimeout(() => {
        toast.remove();
    }, 3400);
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
        const matchCat =
            state.category === 'todos' ||
            (state.category === 'blackfriday' && p.blackFriday) ||
            p.category === state.category;
        const matchSearch =
            p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (state.sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (state.sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (state.sortBy === 'discount') filtered.sort((a, b) => b.discount - a.discount);

    const countEl = document.getElementById('catalog-count');
    if (countEl) {
        countEl.textContent = `Exibindo ${filtered.length} produto(s) exclusivo(s) com desconto Black Friday`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px;">Nenhum produto encontrado para a busca atual.</p>`;
        return;
    }

    grid.innerHTML = filtered.map(prod => `
        <article class="product-card" data-id="${prod.id}">
            <div class="product-img-wrap" onclick="openProductModal(${prod.id})" role="button" tabindex="0" aria-label="Ver foto em evidência de ${prod.name}">
                <span class="bf-discount-pill">-${prod.discount}% OFF</span>
                <img class="product-photo" src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='assets/logo.jpg'">
                <span class="quick-view-hint">🔍 Clique para foto em evidência</span>
            </div>
            <div class="product-body">
                <span class="product-cat">${prod.categoryLabel}</span>
                <h3 class="product-title" onclick="openProductModal(${prod.id})">${prod.name}</h3>
                <div class="product-pricing">
                    <div class="old-price">De <del>${formatBRL(prod.oldPrice)}</del></div>
                    <div class="new-price">${formatBRL(prod.price)}</div>
                    <div class="installment-text">ou 6x de ${formatBRL(prod.price / 6)} sem juros</div>
                    <div class="card-actions">
                        <button type="button" class="btn-card-buy" onclick="addToCart(${prod.id}, 1)">+ Sacola</button>
                        <button type="button" class="btn-card-detail" onclick="openProductModal(${prod.id})" title="Ampliar Foto">👁️</button>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

window.openProductModal = function(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    state.activeProduct = prod;

    document.getElementById('modal-discount-badge').textContent = `-${prod.discount}% BLACK FRIDAY`;
    document.getElementById('modal-prod-category').textContent = prod.categoryLabel.toUpperCase();
    document.getElementById('modal-prod-title').textContent = prod.name;
    document.getElementById('modal-prod-reviews').textContent = `(${prod.reviews} avaliações verificadas)`;
    document.getElementById('modal-prod-desc').textContent = prod.description;
    document.getElementById('modal-old-price').textContent = formatBRL(prod.oldPrice);
    document.getElementById('modal-new-price').textContent = formatBRL(prod.price);
    document.getElementById('modal-installments').textContent = `ou 6x de ${formatBRL(prod.price / 6)} sem juros no cartão`;
    document.getElementById('modal-qty-input').value = 1;
    document.getElementById('modal-cep-result').textContent = '';

    const stage = document.getElementById('featured-image-stage');
    stage.classList.remove('zoomed');
    document.getElementById('modal-main-image').innerHTML =
        `<img class="modal-product-photo" src="${prod.image}" alt="${prod.name}">`;

    const labels = ['Foto Principal', 'Detalhe', 'Versão'];
    const thumbsEl = document.getElementById('modal-thumbnails');
    thumbsEl.innerHTML = labels.map((lbl, idx) => `
        <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" onclick="switchFeaturedVariant('${prod.image}', this)">
            ${lbl}
        </button>
    `).join('');

    document.getElementById('product-modal').hidden = false;
    showVisualToast(`Exibindo ${prod.name} em evidência`);
};

window.switchFeaturedVariant = function(imgSrc, btnEl) {
    document.getElementById('modal-main-image').innerHTML =
        `<img class="modal-product-photo" src="${imgSrc}" alt="Foto em evidência">`;
    document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
};

window.addToCart = function(productId, qty = 1) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        state.cart.push({ ...prod, qty });
    }

    updateCartUI();
    showVisualToast(`${prod.name} adicionado à sacola!`);
};

window.changeCartQty = function(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        state.cart = state.cart.filter(i => i.id !== productId);
    }
    updateCartUI();
};

function getCartTotals() {
    const originalSubtotal = state.cart.reduce((acc, item) => acc + item.oldPrice * item.qty, 0);
    const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const couponDiscount = state.appliedCoupon ? subtotal * state.appliedCoupon.rate : 0;
    const finalProductsTotal = Math.max(0, subtotal - couponDiscount);
    const totalSavings = (originalSubtotal - subtotal) + couponDiscount;

    return { originalSubtotal, subtotal, couponDiscount, finalProductsTotal, totalSavings };
}

function updateCartUI() {
    const totalItems = state.cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('drawer-item-count').textContent = totalItems;

    const listEl = document.getElementById('cart-items-list');
    const footerEl = document.getElementById('cart-footer');

    if (state.cart.length === 0) {
        listEl.innerHTML = `<div style="text-align:center; padding: 48px 16px;">
            <p style="font-size: 2.2rem;">🛍️</p>
            <strong>Sua sacola está vazia</strong>
            <p style="font-size: 0.88rem; margin-top: 6px;">Aproveite os descontos de até 70% OFF da Black Friday Ivone!</p>
        </div>`;
        footerEl.style.display = 'none';
    } else {
        footerEl.style.display = 'block';
        listEl.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-thumb">
                    <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; object-fit:cover; border-radius:6px;">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${formatBRL(item.price * item.qty)}</div>
                    <div class="cart-item-controls">
                        <button type="button" class="mini-qty-btn" onclick="changeCartQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button type="button" class="mini-qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
                        <button type="button" class="remove-item-btn" onclick="changeCartQty(${item.id}, -999)">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const { originalSubtotal, finalProductsTotal, totalSavings } = getCartTotals();

    const freeThreshold = 99;
    const pct = Math.min(100, (finalProductsTotal / freeThreshold) * 100);
    document.getElementById('free-shipping-progress').style.width = `${pct}%`;
    if (finalProductsTotal >= freeThreshold) {
        document.getElementById('free-shipping-msg').innerHTML = `🎉 Parabéns! Você ganhou <strong>FRETE GRÁTIS</strong> na entrega econômica!`;
    } else {
        const diff = freeThreshold - finalProductsTotal;
        document.getElementById('free-shipping-msg').innerHTML = `Faltam <strong>${formatBRL(diff)}</strong> para ganhar <strong>FRETE GRÁTIS</strong>!`;
    }

    document.getElementById('cart-original-subtotal').textContent = formatBRL(originalSubtotal);
    document.getElementById('cart-total-savings').textContent = `- ${formatBRL(totalSavings)}`;
    document.getElementById('cart-subtotal').textContent = formatBRL(finalProductsTotal);
}

function openCheckoutModal() {
    if (state.cart.length === 0) {
        showVisualToast("Adicione pelo menos 1 produto à sacola primeiro.");
        return;
    }
    document.getElementById('cart-drawer').hidden = true;
    document.getElementById('cart-drawer-backdrop').hidden = true;
    document.getElementById('checkout-modal').hidden = false;
    setCheckoutStep(1);
    updateCheckoutSummary();
}

function setCheckoutStep(stepNum) {
    [1, 2, 3, 4].forEach(n => {
        document.getElementById(`checkout-step-${n}`).hidden = (n !== stepNum);
        const ind = document.getElementById(`step-indicator-${n}`);
        if (n <= stepNum) ind.classList.add('active');
        else ind.classList.remove('active');
    });
}

function updateCheckoutSummary() {
    const { finalProductsTotal } = getCartTotals();

    const ecoPrice = finalProductsTotal >= 99 ? 0 : 14.90;
    const ecoRadio = document.querySelector('input[name="shippingMethod"][value="economico"]');
    if (ecoRadio) {
        ecoRadio.dataset.price = ecoPrice;
        document.getElementById('price-ship-economico').textContent = ecoPrice === 0 ? 'GRÁTIS' : formatBRL(ecoPrice);
    }

    const selectedShip = document.querySelector('input[name="shippingMethod"]:checked');
    state.shippingCost = selectedShip ? parseFloat(selectedShip.dataset.price) : ecoPrice;

    const pixDiscount = state.paymentMethod === 'pix' ? finalProductsTotal * 0.10 : 0;
    const grandTotal = finalProductsTotal + state.shippingCost - pixDiscount;

    document.getElementById('checkout-items-mini').innerHTML = state.cart.map(i => `
        <div class="mini-chk-row">
            <span>${i.qty}x ${i.name}</span>
            <strong>${formatBRL(i.price * i.qty)}</strong>
        </div>
    `).join('');

    document.getElementById('chk-subtotal').textContent = formatBRL(finalProductsTotal);
    document.getElementById('chk-shipping').textContent = state.shippingCost === 0 ? 'GRÁTIS' : formatBRL(state.shippingCost);
    document.getElementById('chk-pix-discount-row').style.display = pixDiscount > 0 ? 'flex' : 'none';
    document.getElementById('chk-pix-discount').textContent = `- ${formatBRL(pixDiscount)}`;
    document.getElementById('chk-grand-total').textContent = formatBRL(grandTotal);

    const instSelect = document.getElementById('cc-installments');
    if (instSelect) {
        const totalNoPix = finalProductsTotal + state.shippingCost;
        instSelect.innerHTML = [1, 2, 3, 4, 6, 10].map(p =>
            `<option value="${p}">${p}x de ${formatBRL(totalNoPix / p)} sem juros</option>`
        ).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();

    let secondsLeft = 4 * 3600 + 32 * 60 + 19;
    setInterval(() => {
        if (secondsLeft > 0) secondsLeft--;
        const h = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
        const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
        const s = String(secondsLeft % 60).padStart(2, '0');
        const countdownEl = document.getElementById('bf-countdown');
        if (countdownEl) countdownEl.textContent = `${h}h : ${m}m : ${s}s`;
    }, 1000);

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.category = btn.dataset.category;
            renderProducts();
        });
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderProducts();
        });
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderProducts();
        });
    }

    const copyCouponBtn = document.getElementById('copy-partner-coupon');
    if (copyCouponBtn) {
        copyCouponBtn.addEventListener('click', (e) => {
            const code = e.target.dataset.coupon;
            navigator.clipboard?.writeText(code);
            const feedbackEl = document.getElementById('coupon-feedback');
            if (feedbackEl) feedbackEl.textContent = `✓ Cupom ${code} copiado!`;
            showVisualToast(`Cupom ${code} copiado!`);
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') === 'dark';
            html.setAttribute('data-theme', isDark ? 'light' : 'dark');
            const themeLabel = document.getElementById('theme-label');
            if (themeLabel) themeLabel.textContent = isDark ? 'Escuro' : 'Claro';
            showVisualToast(`Modo ${isDark ? 'Claro' : 'Escuro'} ativado`);
        });
    }

    const a11yPanel = document.getElementById('a11y-panel');
    const a11yToggle = document.getElementById('a11y-toggle');
    if (a11yToggle && a11yPanel) {
        a11yToggle.addEventListener('click', () => {
            a11yPanel.hidden = !a11yPanel.hidden;
        });
        const closeA11y = document.getElementById('close-a11y-panel');
        if (closeA11y) {
            closeA11y.addEventListener('click', () => {
                a11yPanel.hidden = true;
            });
        }
    }

    document.querySelectorAll('.cb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.documentElement.setAttribute('data-colorblind', btn.dataset.cb);
            showVisualToast(`Filtro visual: ${btn.textContent}`);
        });
    });

    const librasToggle = document.getElementById('libras-widget-toggle');
    const librasBox = document.getElementById('libras-floating-box');
    if (librasToggle && librasBox) {
        librasToggle.addEventListener('change', (e) => {
            librasBox.hidden = !e.target.checked;
        });
        const closeLibras = document.getElementById('close-libras-box');
        if (closeLibras) {
            closeLibras.addEventListener('click', () => {
                librasBox.hidden = true;
                librasToggle.checked = false;
            });
        }
    }

    const chatBox = document.getElementById('silent-chat-box');
    const openChatBtn = document.getElementById('open-silent-chat-btn');
    const openVirtual = document.getElementById('open-virtual-consultant');
    const closeChat = document.getElementById('close-silent-chat');

    if (openChatBtn && chatBox) {
        openChatBtn.addEventListener('click', () => {
            chatBox.hidden = false;
            if (a11yPanel) a11yPanel.hidden = true;
        });
    }
    if (openVirtual && chatBox) {
        openVirtual.addEventListener('click', () => {
            chatBox.hidden = false;
        });
    }
    if (closeChat && chatBox) {
        closeChat.addEventListener('click', () => {
            chatBox.hidden = true;
        });
    }

    function sendSilentMessage(text) {
        const msgs = document.getElementById('chat-messages');
        if (!msgs) return;
        msgs.innerHTML += `<div class="msg user">${text}</div>`;
        let reply = "Nossa equipe recebeu sua mensagem escrita! Você pode acompanhar todo o pedido visualmente pelo código enviado no e-mail.";
        if (text.toLowerCase().includes('prazo')) reply = "Entrega Expressa em 1 a 2 dias úteis ou Econômica em até 5 dias úteis (Grátis acima de R$ 99!).";
        if (text.toLowerCase().includes('black friday')) reply = "Todos os produtos já estão com até 70% OFF + 10% extra no PIX!";
        setTimeout(() => {
            msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
            msgs.scrollTop = msgs.scrollHeight;
        }, 400);
    }

    const chatForm = document.getElementById('silent-chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inp = document.getElementById('silent-chat-input');
            if (!inp || !inp.value.trim()) return;
            sendSilentMessage(inp.value.trim());
            inp.value = '';
        });
    }

    document.querySelectorAll('.quick-q').forEach(btn => {
        btn.addEventListener('click', () => sendSilentMessage(btn.dataset.q));
    });

    const fontInc = document.getElementById('font-increase');
    const fontDec = document.getElementById('font-decrease');
    const fontRes = document.getElementById('font-reset');

    if (fontInc) {
        fontInc.addEventListener('click', () => {
            state.fontSize = Math.min(20, state.fontSize + 1);
            document.documentElement.style.setProperty('--base-font-size', `${state.fontSize}px`);
        });
    }
    if (fontDec) {
        fontDec.addEventListener('click', () => {
            state.fontSize = Math.max(13, state.fontSize - 1);
            document.documentElement.style.setProperty('--base-font-size', `${state.fontSize}px`);
        });
    }
    if (fontRes) {
        fontRes.addEventListener('click', () => {
            state.fontSize = 16;
            document.documentElement.style.setProperty('--base-font-size', '16px');
        });
    }

    const closeProdModal = document.getElementById('close-product-modal');
    const prodModal = document.getElementById('product-modal');
    if (closeProdModal && prodModal) {
        closeProdModal.addEventListener('click', () => {
            prodModal.hidden = true;
        });
    }

    const toggleZoom = document.getElementById('toggle-zoom-btn');
    const featuredStage = document.getElementById('featured-image-stage');
    if (toggleZoom && featuredStage) {
        toggleZoom.addEventListener('click', () => {
            featuredStage.classList.toggle('zoomed');
        });
        featuredStage.addEventListener('click', (e) => {
            if (e.target.id !== 'toggle-zoom-btn') {
                featuredStage.classList.toggle('zoomed');
            }
        });
    }

    const qtyMinus = document.getElementById('modal-qty-minus');
    const qtyPlus = document.getElementById('modal-qty-plus');
    const qtyInput = document.getElementById('modal-qty-input');

    if (qtyMinus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
        });
    }
    if (qtyPlus && qtyInput) {
        qtyPlus.addEventListener('click', () => {
            qtyInput.value = Math.min(20, parseInt(qtyInput.value) + 1);
        });
    }

    const addCartBtn = document.getElementById('modal-add-cart-btn');
    if (addCartBtn && prodModal) {
        addCartBtn.addEventListener('click', () => {
            if (!state.activeProduct) return;
            const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
            addToCart(state.activeProduct.id, qty);
            prodModal.hidden = true;
        });
    }

    const buyNowBtn = document.getElementById('modal-buy-now-btn');
    if (buyNowBtn && prodModal) {
        buyNowBtn.addEventListener('click', () => {
            if (!state.activeProduct) return;
            const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
            addToCart(state.activeProduct.id, qty);
            prodModal.hidden = true;
            openCheckoutModal();
        });
    }

    const calcCepBtn = document.getElementById('modal-calc-cep-btn');
    if (calcCepBtn) {
        calcCepBtn.addEventListener('click', () => {
            const cepInput = document.getElementById('modal-cep-input');
            const cepResult = document.getElementById('modal-cep-result');
            if (!cepInput || !cepResult) return;
            const cep = cepInput.value.trim();
            if (cep.length < 8) {
                cepResult.textContent = "Digite um CEP válido com 8 dígitos.";
                return;
            }
            cepResult.innerHTML = `🚚 Entrega Econômica: <strong>R$ 14,90</strong> (até 5 dias úteis) | Expressa: <strong>R$ 26,50</strong> (2 dias úteis)`;
        });
    }

    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-drawer-backdrop');
    const closeCartBtn = document.getElementById('close-cart-drawer');

    if (cartToggle && cartDrawer && cartBackdrop) {
        cartToggle.addEventListener('click', () => {
            cartDrawer.hidden = false;
            cartBackdrop.hidden = false;
        });
    }
    const closeCartDrawer = () => {
        if (cartDrawer) cartDrawer.hidden = true;
        if (cartBackdrop) cartBackdrop.hidden = true;
    };
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const couponInput = document.getElementById('cart-coupon-input');
            const statusEl = document.getElementById('cart-coupon-status');
            if (!couponInput || !statusEl) return;
            const code = couponInput.value.trim().toUpperCase();
            if (code === 'IVONE10') {
                state.appliedCoupon = { code, rate: 0.10 };
                statusEl.textContent = "✓ Cupom IVONE10 aplicado (10% OFF extra)!";
                updateCartUI();
            } else if (code === 'LUMINA10') {
                state.appliedCoupon = { code, rate: 0.10 };
                statusEl.textContent = "✓ Cupom parceiro LUMINA10 aplicado (10% OFF extra)!";
                updateCartUI();
            } else {
                statusEl.textContent = "Cupom inválido. Tente IVONE10 ou LUMINA10.";
            }
        });
    }

    const proceedCheckout = document.getElementById('proceed-to-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout-modal');

    if (proceedCheckout) {
        proceedCheckout.addEventListener('click', openCheckoutModal);
    }
    if (closeCheckout && checkoutModal) {
        closeCheckout.addEventListener('click', () => {
            checkoutModal.hidden = true;
        });
    }

    const step1Form = document.getElementById('checkout-step-1');
    if (step1Form) {
        step1Form.addEventListener('submit', (e) => {
            e.preventDefault();
            const street = document.getElementById('addr-street')?.value || '';
            const num = document.getElementById('addr-number')?.value || '';
            const city = document.getElementById('addr-city')?.value || '';
            const destPreview = document.getElementById('shipping-dest-preview');
            if (destPreview) destPreview.textContent = `${street}, ${num} - ${city}`;
            updateCheckoutSummary();
            setCheckoutStep(2);
        });
    }

    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', updateCheckoutSummary);
    });

    const backStep1 = document.getElementById('back-to-step-1');
    const goToStep3 = document.getElementById('go-to-step-3');
    const backStep2 = document.getElementById('back-to-step-2');

    if (backStep1) backStep1.addEventListener('click', () => setCheckoutStep(1));
    if (goToStep3) goToStep3.addEventListener('click', () => setCheckoutStep(3));
    if (backStep2) backStep2.addEventListener('click', () => setCheckoutStep(2));

    document.querySelectorAll('.pay-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.paymentMethod = tab.dataset.pay;
            document.querySelectorAll('.pay-content').forEach(p => p.hidden = true);
            const panel = document.getElementById(`pay-panel-${state.paymentMethod}`);
            if (panel) panel.hidden = false;
            updateCheckoutSummary();
        });
    });

    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', () => {
            const orderCode = `#IVN-${Math.floor(100000 + Math.random() * 900000)}`;
            const finalIdEl = document.getElementById('final-order-id');
            if (finalIdEl) finalIdEl.textContent = orderCode;
            setCheckoutStep(4);
            showVisualToast(`Pedido ${orderCode} confirmado com sucesso!`);
        });
    }

    const resetBtn = document.getElementById('finish-and-reset-btn');
    if (resetBtn && checkoutModal) {
        resetBtn.addEventListener('click', () => {
            state.cart = [];
            state.appliedCoupon = null;
            updateCartUI();
            checkoutModal.hidden = true;
        });
    }
});
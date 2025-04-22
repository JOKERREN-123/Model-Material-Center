document.addEventListener('DOMContentLoaded', () => {
    // 图片预览功能
    const mainPreview = document.getElementById('mainPreview');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const zoomBtn = document.querySelector('.zoom-btn');
    const rotateBtn = document.querySelector('.rotate-btn');
    let rotation = 0;

    // 缩略图切换
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainPreview.src = thumb.querySelector('img').src;
            rotation = 0;
            mainPreview.style.transform = `rotate(${rotation}deg)`;
        });
    });

    // 旋转功能
    rotateBtn.addEventListener('click', () => {
        rotation = (rotation + 90) % 360;
        mainPreview.style.transform = `rotate(${rotation}deg)`;
    });

    // 放大预览
    zoomBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${mainPreview.src}" alt="大图预览">
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });

    // 下载选项切换
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            optionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            updatePrice();
        });
    });

    // 购物车功能
    const cartSidebar = document.getElementById('cartSidebar');
    const addToCartBtn = document.querySelector('.add-cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // 打开购物车
    addToCartBtn.addEventListener('click', () => {
        const activeOption = document.querySelector('.option-card.active');
        const modelId = document.querySelector('.model-details h1').textContent.split('：')[1];
        const price = activeOption.querySelector('.original-price').textContent;
        const downloadType = activeOption.querySelector('h4').textContent;

        // 添加到购物车
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${mainPreview.src}" alt="购物车缩略图">
            <div class="item-info">
                <h4>${modelId}</h4>
                <p>${downloadType}</p>
            </div>
            <div class="item-price">${price}</div>
            <button class="remove-item"><i class="ri-delete-bin-line"></i></button>
        `;

        cartItems.appendChild(cartItem);
        updateCartTotal();
        cartSidebar.classList.add('active');

        // 添加删除功能
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            cartItem.remove();
            updateCartTotal();
        });
    });

    // 关闭购物车
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    continueShoppingBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // 更新购物车总价
    function updateCartTotal() {
        const items = document.querySelectorAll('.cart-item');
        let total = 0;
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.item-price').textContent.replace('￥', ''));
            total += price;
        });

        const summaryRows = document.querySelectorAll('.summary-row');
        summaryRows[0].querySelector('span:last-child').textContent = `￥${total}`;
        const discount = total * 0.5; // 会员5折
        summaryRows[1].querySelector('span:last-child').textContent = `-￥${discount}`;
        summaryRows[2].querySelector('span:last-child').textContent = `￥${total - discount}`;
    }

    // 立即下载按钮
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const membershipModal = document.getElementById('membershipModal');

    buyNowBtn.addEventListener('click', () => {
        // 检查是否是会员，这里模拟非会员
        const isVIP = false;
        if (!isVIP) {
            membershipModal.classList.add('active');
        } else {
            handleDownload();
        }
    });

    // 会员模态框按钮
    const upgradeBtn = membershipModal.querySelector('.upgrade-btn');
    const cancelBtn = membershipModal.querySelector('.cancel-btn');

    upgradeBtn.addEventListener('click', () => {
        // 处理会员升级逻辑
        membershipModal.classList.remove('active');
        // 跳转到会员充值页面
        window.location.href = '#pricing';
    });

    cancelBtn.addEventListener('click', () => {
        membershipModal.classList.remove('active');
        handleDownload();
    });

    // 处理下载
    function handleDownload() {
        const modelId = document.querySelector('.model-details h1').textContent.split('：')[1];
        const downloadType = document.querySelector('.option-card.active h4').textContent;
        alert(`开始下载${modelId} - ${downloadType}`);
        // 这里添加实际的下载逻辑
    }

    // 更新价格显示
    function updatePrice() {
        const activeOption = document.querySelector('.option-card.active');
        const originalPrice = activeOption.querySelector('.original-price').textContent;
        const vipPrice = activeOption.querySelector('.vip-price').textContent;
        // 更新价格显示逻辑
    }
}); 
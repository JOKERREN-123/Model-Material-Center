document.addEventListener('DOMContentLoaded', () => {
    // 筛选功能
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    // 排序功能
    const sortSelect = document.querySelector('.sort-options select');
    sortSelect.addEventListener('change', (e) => {
        const sortValue = e.target.value;
        // 这里添加排序逻辑
        console.log('Sorting by:', sortValue);
    });

    // 图片预览功能
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.model-card');
            const img = card.querySelector('.model-image img');
            openPreviewModal(img.src);
        });
    });

    // 下载功能
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.model-card');
            const modelId = card.querySelector('h4').textContent.split('：')[1];
            handleDownload(modelId);
        });
    });

    // 分页功能
    const pageNumbers = document.querySelectorAll('.page-numbers span');
    pageNumbers.forEach(page => {
        page.addEventListener('click', (e) => {
            if (e.target.textContent !== '...') {
                pageNumbers.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                // 这里添加页面切换逻辑
                console.log('Switching to page:', e.target.textContent);
            }
        });
    });
});

// 更新筛选结果
function updateFilters() {
    const activeFilters = {
        race: [],
        body: [],
        style: [],
        season: [],
        scene: []
    };

    // 收集所有选中的筛选条件
    document.querySelectorAll('.filter-options input:checked').forEach(checkbox => {
        const filterType = checkbox.name;
        const filterValue = checkbox.value;
        activeFilters[filterType].push(filterValue);
    });

    // 这里添加筛选逻辑
    console.log('Active filters:', activeFilters);
}

// 打开预览模态框
function openPreviewModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="模特预览">
        </div>
    `;

    document.body.appendChild(modal);

    // 添加关闭功能
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // 添加预览模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        }

        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }

        .close-modal {
            position: absolute;
            top: -30px;
            right: 0;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

// 处理下载功能
function handleDownload(modelId) {
    // 跳转到下载页面
    window.location.href = `download.html?id=${modelId}`;
} 
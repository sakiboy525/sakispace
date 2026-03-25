// 拼豆图纸生成器
class BeadPatternGenerator {
    constructor() {
        this.canvas = document.getElementById('patternCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.imageData = null;
        this.pattern = null;
        this.colorMap = new Map();
        this.uploadedImage = null;
        
        // 默认配置
        this.config = {
            pixN: 50,        // 画布尺寸
            maxC: 60,        // 最大颜色数量
            showCName: true, // 显示色号
            fontSZ: 7,       // 字体大小
            palettePos: 'bottom', // 色号位置 - 移动端默认底部
            palette: 'mard188' // 色卡选择
        };
        
        // Mard色卡
        this.colorPalettes = this.loadColorPalettes();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadConfig();
        this.updateUI();
    }
    
    bindEvents() {
        // 文件上传
        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
        
        // 生成按钮
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generatePattern();
        });
        
        // 下载按钮
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadPattern();
        });
        
        // 导出统计
        document.getElementById('exportStats').addEventListener('click', () => {
            this.exportColorStats();
        });
        
        // 配置参数变化
        document.getElementById('pixelSize').addEventListener('change', (e) => {
            this.config.pixN = parseInt(e.target.value);
        });
        
        document.getElementById('maxColors').addEventListener('change', (e) => {
            this.config.maxC = parseInt(e.target.value);
        });
        
        document.getElementById('showColorName').addEventListener('change', (e) => {
            this.config.showCName = e.target.checked;
        });
        
        document.getElementById('fontSize').addEventListener('change', (e) => {
            this.config.fontSZ = parseInt(e.target.value);
        });
        
        document.getElementById('palettePosition').addEventListener('change', (e) => {
            this.config.palettePos = e.target.value;
        });
        
        document.getElementById('colorPalette').addEventListener('change', (e) => {
            this.config.palette = e.target.value;
        });
    }
    
    loadConfig() {
        const saved = localStorage.getItem('beadPatternConfig');
        if (saved) {
            this.config = { ...this.config, ...JSON.parse(saved) };
        }
    }
    
    saveConfig() {
        localStorage.setItem('beadPatternConfig', JSON.stringify(this.config));
    }
    
    updateUI() {
        document.getElementById('pixelSize').value = this.config.pixN;
        document.getElementById('maxColors').value = this.config.maxC;
        document.getElementById('showColorName').checked = this.config.showCName;
        document.getElementById('fontSize').value = this.config.fontSZ;
        document.getElementById('palettePosition').value = this.config.palettePos;
        document.getElementById('colorPalette').value = this.config.palette;
    }
    
    loadColorPalettes() {
        return {
            mard188: [
                { name: 'H1', rgb: [255, 255, 255] },
                { name: 'H2', rgb: [255, 255, 204] },
                { name: 'H3', rgb: [255, 255, 153] },
                { name: 'H4', rgb: [255, 255, 102] },
                { name: 'H5', rgb: [255, 255, 51] },
                { name: 'H6', rgb: [255, 255, 0] },
                { name: 'H7', rgb: [255, 230, 0] },
                { name: 'H8', rgb: [255, 204, 0] },
                { name: 'H9', rgb: [255, 179, 0] },
                { name: 'H10', rgb: [255, 153, 0] },
                { name: 'H11', rgb: [255, 128, 0] },
                { name: 'H12', rgb: [255, 102, 0] },
                { name: 'H13', rgb: [255, 77, 0] },
                { name: 'H14', rgb: [255, 51, 0] },
                { name: 'H15', rgb: [255, 26, 0] },
                { name: 'H16', rgb: [255, 0, 0] },
                { name: 'H17', rgb: [230, 0, 0] },
                { name: 'H18', rgb: [204, 0, 0] },
                { name: 'H19', rgb: [179, 0, 0] },
                { name: 'H20', rgb: [153, 0, 0] },
                { name: 'H21', rgb: [128, 0, 0] },
                { name: 'H22', rgb: [102, 0, 0] },
                { name: 'H23', rgb: [77, 0, 0] },
                { name: 'H24', rgb: [51, 0, 0] },
                { name: 'H25', rgb: [26, 0, 0] },
                { name: 'H26', rgb: [0, 0, 0] },
                { name: 'H27', rgb: [51, 51, 51] },
                { name: 'H28', rgb: [102, 102, 102] },
                { name: 'H29', rgb: [153, 153, 153] },
                { name: 'H30', rgb: [204, 204, 204] },
                { name: 'H31', rgb: [230, 230, 230] },
                { name: 'H32', rgb: [242, 242, 242] },
                { name: 'H33', rgb: [255, 242, 242] },
                { name: 'H34', rgb: [255, 229, 229] },
                { name: 'H35', rgb: [255, 217, 217] },
                { name: 'H36', rgb: [255, 204, 204] },
                { name: 'H37', rgb: [255, 191, 191] },
                { name: 'H38', rgb: [255, 179, 179] },
                { name: 'H39', rgb: [255, 166, 166] },
                { name: 'H40', rgb: [255, 153, 153] },
                { name: 'H41', rgb: [255, 140, 140] },
                { name: 'H42', rgb: [255, 128, 128] },
                { name: 'H43', rgb: [255, 115, 115] },
                { name: 'H44', rgb: [255, 102, 102] },
                { name: 'H45', rgb: [255, 89, 89] },
                { name: 'H46', rgb: [255, 77, 77] },
                { name: 'H47', rgb: [255, 64, 64] },
                { name: 'H48', rgb: [255, 51, 51] },
                { name: 'H49', rgb: [255, 38, 38] },
                { name: 'H50', rgb: [255, 26, 26] },
                { name: 'H51', rgb: [255, 13, 13] },
                { name: 'H52', rgb: [255, 0, 0] },
                { name: 'H53', rgb: [230, 0, 0] },
                { name: 'H54', rgb: [204, 0, 0] },
                { name: 'H55', rgb: [179, 0, 0] },
                { name: 'H56', rgb: [153, 0, 0] },
                { name: 'H57', rgb: [128, 0, 0] },
                { name: 'H58', rgb: [102, 0, 0] },
                { name: 'H59', rgb: [77, 0, 0] },
                { name: 'H60', rgb: [51, 0, 0] },
                { name: 'H61', rgb: [255, 242, 229] },
                { name: 'H62', rgb: [255, 229, 204] },
                { name: 'H63', rgb: [255, 217, 179] },
                { name: 'H64', rgb: [255, 204, 153] },
                { name: 'H65', rgb: [255, 191, 128] },
                { name: 'H66', rgb: [255, 179, 102] },
                { name: 'H67', rgb: [255, 166, 77] },
                { name: 'H68', rgb: [255, 153, 51] },
                { name: 'H69', rgb: [255, 140, 26] },
                { name: 'H70', rgb: [255, 128, 0] },
                { name: 'H71', rgb: [230, 115, 0] },
                { name: 'H72', rgb: [204, 102, 0] },
                { name: 'H73', rgb: [179, 89, 0] },
                { name: 'H74', rgb: [153, 77, 0] },
                { name: 'H75', rgb: [128, 64, 0] },
                { name: 'H76', rgb: [102, 51, 0] },
                { name: 'H77', rgb: [77, 38, 0] },
                { name: 'H78', rgb: [51, 26, 0] },
                { name: 'H79', rgb: [255, 255, 242] },
                { name: 'H80', rgb: [255, 255, 229] },
                { name: 'H81', rgb: [255, 255, 217] },
                { name: 'H82', rgb: [255, 255, 204] },
                { name: 'H83', rgb: [255, 255, 191] },
                { name: 'H84', rgb: [255, 255, 179] },
                { name: 'H85', rgb: [255, 255, 166] },
                { name: 'H86', rgb: [255, 255, 153] },
                { name: 'H87', rgb: [255, 255, 140] },
                { name: 'H88', rgb: [255, 255, 128] },
                { name: 'H89', rgb: [255, 255, 115] },
                { name: 'H90', rgb: [255, 255, 102] },
                { name: 'H91', rgb: [255, 255, 89] },
                { name: 'H92', rgb: [255, 255, 77] },
                { name: 'H93', rgb: [255, 255, 64] },
                { name: 'H94', rgb: [255, 255, 51] },
                { name: 'H95', rgb: [255, 255, 38] },
                { name: 'H96', rgb: [255, 255, 26] },
                { name: 'H97', rgb: [255, 255, 13] },
                { name: 'H98', rgb: [255, 255, 0] },
                { name: 'H99', rgb: [230, 230, 0] },
                { name: 'H100', rgb: [204, 204, 0] },
                { name: 'H101', rgb: [179, 179, 0] },
                { name: 'H102', rgb: [153, 153, 0] },
                { name: 'H103', rgb: [128, 128, 0] },
                { name: 'H104', rgb: [102, 102, 0] },
                { name: 'H105', rgb: [77, 77, 0] },
                { name: 'H106', rgb: [51, 51, 0] },
                { name: 'H107', rgb: [242, 255, 242] },
                { name: 'H108', rgb: [229, 255, 229] },
                { name: 'H109', rgb: [217, 255, 217] },
                { name: 'H110', rgb: [204, 255, 204] },
                { name: 'H111', rgb: [191, 255, 191] },
                { name: 'H112', rgb: [179, 255, 179] },
                { name: 'H113', rgb: [166, 255, 166] },
                { name: 'H114', rgb: [153, 255, 153] },
                { name: 'H115', rgb: [140, 255, 140] },
                { name: 'H116', rgb: [128, 255, 128] },
                { name: 'H117', rgb: [115, 255, 115] },
                { name: 'H118', rgb: [102, 255, 102] },
                { name: 'H119', rgb: [89, 255, 89] },
                { name: 'H120', rgb: [77, 255, 77] },
                { name: 'H121', rgb: [64, 255, 64] },
                { name: 'H122', rgb: [51, 255, 51] },
                { name: 'H123', rgb: [38, 255, 38] },
                { name: 'H124', rgb: [26, 255, 26] },
                { name: 'H125', rgb: [13, 255, 13] },
                { name: 'H126', rgb: [0, 255, 0] },
                { name: 'H127', rgb: [0, 230, 0] },
                { name: 'H128', rgb: [0, 204, 0] },
                { name: 'H129', rgb: [0, 179, 0] },
                { name: 'H130', rgb: [0, 153, 0] },
                { name: 'H131', rgb: [0, 128, 0] },
                { name: 'H132', rgb: [0, 102, 0] },
                { name: 'H133', rgb: [0, 77, 0] },
                { name: 'H134', rgb: [0, 51, 0] },
                { name: 'H135', rgb: [242, 242, 255] },
                { name: 'H136', rgb: [229, 229, 255] },
                { name: 'H137', rgb: [217, 217, 255] },
                { name: 'H138', rgb: [204, 204, 255] },
                { name: 'H139', rgb: [191, 191, 255] },
                { name: 'H140', rgb: [179, 179, 255] },
                { name: 'H141', rgb: [166, 166, 255] },
                { name: 'H142', rgb: [153, 153, 255] },
                { name: 'H143', rgb: [140, 140, 255] },
                { name: 'H144', rgb: [128, 128, 255] },
                { name: 'H145', rgb: [115, 115, 255] },
                { name: 'H146', rgb: [102, 102, 255] },
                { name: 'H147', rgb: [89, 89, 255] },
                { name: 'H148', rgb: [77, 77, 255] },
                { name: 'H149', rgb: [64, 64, 255] },
                { name: 'H150', rgb: [51, 51, 255] },
                { name: 'H151', rgb: [38, 38, 255] },
                { name: 'H152', rgb: [26, 26, 255] },
                { name: 'H153', rgb: [13, 13, 255] },
                { name: 'H154', rgb: [0, 0, 255] },
                { name: 'H155', rgb: [0, 0, 230] },
                { name: 'H156', rgb: [0, 0, 204] },
                { name: 'H157', rgb: [0, 0, 179] },
                { name: 'H158', rgb: [0, 0, 153] },
                { name: 'H159', rgb: [0, 0, 128] },
                { name: 'H160', rgb: [0, 0, 102] },
                { name: 'H161', rgb: [0, 0, 77] },
                { name: 'H162', rgb: [0, 0, 51] },
                { name: 'H163', rgb: [255, 242, 255] },
                { name: 'H164', rgb: [255, 229, 255] },
                { name: 'H165', rgb: [255, 217, 255] },
                { name: 'H166', rgb: [255, 204, 255] },
                { name: 'H167', rgb: [255, 191, 255] },
                { name: 'H168', rgb: [255, 179, 255] },
                { name: 'H169', rgb: [255, 166, 255] },
                { name: 'H170', rgb: [255, 153, 255] },
                { name: 'H171', rgb: [255, 140, 255] },
                { name: 'H172', rgb: [255, 128, 255] },
                { name: 'H173', rgb: [255, 115, 255] },
                { name: 'H174', rgb: [255, 102, 255] },
                { name: 'H175', rgb: [255, 89, 255] },
                { name: 'H176', rgb: [255, 77, 255] },
                { name: 'H177', rgb: [255, 64, 255] },
                { name: 'H178', rgb: [255, 51, 255] },
                { name: 'H179', rgb: [255, 38, 255] },
                { name: 'H180', rgb: [255, 26, 255] },
                { name: 'H181', rgb: [255, 13, 255] },
                { name: 'H182', rgb: [255, 0, 255] },
                { name: 'H183', rgb: [230, 0, 230] },
                { name: 'H184', rgb: [204, 0, 204] },
                { name: 'H185', rgb: [179, 0, 179] },
                { name: 'H186', rgb: [153, 0, 153] },
                { name: 'H187', rgb: [128, 0, 128] },
                { name: 'H188', rgb: [102, 0, 102] }
            ],
            mard221: []
        };
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.uploadedImage = img;
                document.getElementById('generateBtn').disabled = false;
                
                // 显示图片预览
                const previewContainer = document.getElementById('imagePreview');
                if (previewContainer) {
                    previewContainer.innerHTML = `
                        <div class="preview-wrapper">
                            <img src="${e.target.result}" alt="预览图片" class="preview-image">
                            <div class="preview-info">
                                <span class="preview-size">${img.width} × ${img.height}</span>
                                <button class="btn-remove" onclick="document.getElementById('imageInput').value=''; document.getElementById('imagePreview').innerHTML='';">移除</button>
                            </div>
                        </div>
                    `;
                    previewContainer.style.display = 'block';
                }
                
                // 更新上传区域状态
                const uploadArea = document.querySelector('.upload-area');
                if (uploadArea) {
                    uploadArea.classList.add('has-image');
                }
            };
            img.onerror = () => {
                alert('图片加载失败，请重试');
            };
            img.src = e.target.result;
        };
        reader.onerror = () => {
            alert('文件读取失败，请重试');
        };
        reader.readAsDataURL(file);
    }
    
    generatePattern() {
        if (!this.uploadedImage) {
            alert('请先上传图片！');
            return;
        }
        
        const { pixN, maxC, showCName, fontSZ, palettePos, palette } = this.config;
        const paletteData = this.colorPalettes[palette];
        
        // 创建临时canvas处理图片
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // 计算正方形裁剪区域
        const size = Math.min(this.uploadedImage.width, this.uploadedImage.height);
        const offsetX = (this.uploadedImage.width - size) / 2;
        const offsetY = (this.uploadedImage.height - size) / 2;
        
        tempCanvas.width = size;
        tempCanvas.height = size;
        tempCtx.drawImage(this.uploadedImage, offsetX, offsetY, size, size, 0, 0, size, size);
        
        // 获取图片数据
        this.imageData = tempCtx.getImageData(0, 0, size, size);
        
        const blockSize = Math.floor(size / pixN);
        
        // 分块处理，计算每个块的平均颜色
        const blocks = [];
        for (let y = 0; y < pixN; y++) {
            blocks[y] = [];
            for (let x = 0; x < pixN; x++) {
                const avgColor = this.getAverageColor(x * blockSize, y * blockSize, blockSize);
                blocks[y][x] = avgColor;
            }
        }
        
        // 匹配色卡颜色
        this.pattern = [];
        this.colorMap.clear();
        const colorCounts = {};
        
        for (let y = 0; y < pixN; y++) {
            this.pattern[y] = [];
            for (let x = 0; x < pixN; x++) {
                const matched = this.matchColor(blocks[y][x], paletteData);
                this.pattern[y][x] = matched;
                
                if (!colorCounts[matched.name]) {
                    colorCounts[matched.name] = 0;
                }
                colorCounts[matched.name]++;
            }
        }
        
        // 限制颜色数量
        const sortedColors = Object.entries(colorCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, maxC);
        
        const usedColorNames = new Set(sortedColors.map(([name]) => name));
        const usedPalette = paletteData.filter(c => usedColorNames.has(c.name));
        
        // 重新匹配受限颜色
        for (let y = 0; y < pixN; y++) {
            for (let x = 0; x < pixN; x++) {
                const current = this.pattern[y][x];
                if (!usedColorNames.has(current.name)) {
                    this.pattern[y][x] = this.matchColor(blocks[y][x], usedPalette);
                }
            }
        }
        
        // 统计最终颜色
        const finalCounts = {};
        for (let y = 0; y < pixN; y++) {
            for (let x = 0; x < pixN; x++) {
                const color = this.pattern[y][x];
                if (!finalCounts[color.name]) {
                    finalCounts[color.name] = 0;
                }
                finalCounts[color.name]++;
            }
        }
        
        // 绘制图纸
        this.drawPattern(pixN, showCName, fontSZ, usedPalette, finalCounts, palettePos);
        
        // 更新统计信息
        document.getElementById('statSize').textContent = `${pixN}×${pixN}`;
        document.getElementById('statColors').textContent = Object.keys(finalCounts).length;
        document.getElementById('statPixels').textContent = pixN * pixN;
        document.getElementById('stats').style.display = 'flex';
        
        // 显示色卡
        this.displayPalette(usedPalette, finalCounts);
        
        // 启用下载按钮
        document.getElementById('downloadBtn').disabled = false;
        
        // 保存配置
        this.saveConfig();
    }
    
    getAverageColor(x, y, size) {
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let dy = 0; dy < size; dy++) {
            for (let dx = 0; dx < size; dx++) {
                const idx = ((y + dy) * this.imageData.width + (x + dx)) * 4;
                r += this.imageData.data[idx];
                g += this.imageData.data[idx + 1];
                b += this.imageData.data[idx + 2];
                count++;
            }
        }
        
        return [
            Math.round(r / count),
            Math.round(g / count),
            Math.round(b / count)
        ];
    }
    
    matchColor(rgb, palette) {
        let minDist = Infinity;
        let matched = palette[0];
        
        for (const color of palette) {
            const dist = this.colorDistance(rgb, color.rgb);
            if (dist < minDist) {
                minDist = dist;
                matched = color;
            }
        }
        
        return matched;
    }
    
    colorDistance(rgb1, rgb2) {
        return Math.sqrt(
            Math.pow(rgb1[0] - rgb2[0], 2) +
            Math.pow(rgb1[1] - rgb2[1], 2) +
            Math.pow(rgb1[2] - rgb2[2], 2)
        );
    }
    
    drawPattern(pixN, showCName, fontSZ, palette, counts, palettePos) {
        const cellSize = window.innerWidth < 768 ? 12 : 15;
        const padding = window.innerWidth < 768 ? 30 : 40;
        
        // 计算画布大小
        let canvasWidth, canvasHeight;
        if (palettePos === 'right') {
            canvasWidth = pixN * cellSize + padding * 2 + 180;
            canvasHeight = pixN * cellSize + padding * 2;
        } else {
            canvasWidth = pixN * cellSize + padding * 2;
            canvasHeight = pixN * cellSize + padding * 2 + 120;
        }
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        const ctx = this.ctx;
        
        // 清空画布
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // 绘制网格和色块
        for (let y = 0; y < pixN; y++) {
            for (let x = 0; x < pixN; x++) {
                const color = this.pattern[y][x];
                const px = padding + x * cellSize;
                const py = padding + y * cellSize;
                
                // 填充色块
                ctx.fillStyle = `rgb(${color.rgb.join(',')})`;
                ctx.fillRect(px, py, cellSize, cellSize);
                
                // 绘制边框
                ctx.strokeStyle = '#cccccc';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(px, py, cellSize, cellSize);
                
                // 显示色号
                if (showCName && cellSize >= 10) {
                    ctx.fillStyle = this.getTextColor(color.rgb);
                    ctx.font = `${Math.min(fontSZ, 8)}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(color.name, px + cellSize / 2, py + cellSize / 2);
                }
            }
        }
        
        // 绘制粗网格线（每5格）
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        for (let i = 0; i <= pixN; i += 5) {
            ctx.beginPath();
            ctx.moveTo(padding + i * cellSize, padding);
            ctx.lineTo(padding + i * cellSize, padding + pixN * cellSize);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(padding, padding + i * cellSize);
            ctx.lineTo(padding + pixN * cellSize, padding + i * cellSize);
            ctx.stroke();
        }
        
        // 绘制坐标数字
        ctx.fillStyle = '#667eea';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 1; i <= pixN; i++) {
            ctx.fillText(i, padding + (i - 0.5) * cellSize, padding - 15);
            ctx.fillText(i, padding - 15, padding + (i - 0.5) * cellSize);
        }
        
        // 绘制色板
        if (palettePos === 'bottom') {
            this.drawPaletteBottom(ctx, padding, pixN, cellSize, palette, counts, fontSZ);
        } else {
            this.drawPaletteRight(ctx, padding, pixN, cellSize, palette, counts, fontSZ);
        }
        
        document.getElementById('canvasContainer').style.display = 'block';
    }
    
    drawPaletteBottom(ctx, padding, pixN, cellSize, palette, counts, fontSZ) {
        const startY = padding + pixN * cellSize + 15;
        const cols = Math.floor((this.canvas.width - padding * 2) / 90);
        
        ctx.fillStyle = '#667eea';
        ctx.fillRect(padding - 5, startY - 5, this.canvas.width - padding * 2 + 10, 100);
        
        palette.forEach((color, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = padding + col * 90;
            const y = startY + row * 30;
            
            ctx.fillStyle = `rgb(${color.rgb.join(',')})`;
            ctx.fillRect(x, y, 20, 20);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, 20, 20);
            
            const textColor = this.getTextColor(color.rgb);
            ctx.fillStyle = textColor;
            ctx.font = `${fontSZ + 1}px Arial`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${color.name} (${counts[color.name]})`, x + 25, y + 10);
        });
    }
    
    drawPaletteRight(ctx, padding, pixN, cellSize, palette, counts, fontSZ) {
        const startX = padding + pixN * cellSize + 15;
        const rows = Math.floor((this.canvas.height - padding * 2) / 30);
        
        ctx.fillStyle = '#667eea';
        ctx.fillRect(startX - 5, padding - 5, 160, this.canvas.height - padding * 2 + 10);
        
        palette.forEach((color, i) => {
            const row = i % rows;
            const col = Math.floor(i / rows);
            const x = startX + col * 150;
            const y = padding + row * 30;
            
            ctx.fillStyle = `rgb(${color.rgb.join(',')})`;
            ctx.fillRect(x, y, 20, 20);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, 20, 20);
            
            const textColor = this.getTextColor(color.rgb);
            ctx.fillStyle = textColor;
            ctx.font = `${fontSZ + 1}px Arial`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${color.name} (${counts[color.name]})`, x + 25, y + 10);
        });
    }
    
    getTextColor(rgb) {
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
    
    displayPalette(palette, counts) {
        const colorList = document.getElementById('colorList');
        colorList.innerHTML = '';
        
        const sortedPalette = palette.sort((a, b) => counts[b.name] - counts[a.name]);
        
        sortedPalette.forEach(color => {
            const item = document.createElement('div');
            item.className = 'color-item';
            item.innerHTML = `
                <div class="color-box" style="background: rgb(${color.rgb.join(',')})"></div>
                <div class="color-info">
                    <div class="color-name">${color.name}</div>
                    <div class="color-count">${counts[color.name]} 颗</div>
                </div>
            `;
            colorList.appendChild(item);
        });
        
        document.getElementById('paletteSection').style.display = 'block';
    }
    
    downloadPattern() {
        if (!this.pattern) {
            alert('请先生成拼豆图纸！');
            return;
        }
        
        const link = document.createElement('a');
        link.download = `拼豆图纸_${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    exportColorStats() {
        if (!this.pattern) {
            alert('请先生成拼豆图纸！');
            return;
        }
        
        const colors = Array.from(this.colorMap.values())
            .sort((a, b) => b.count - a.count);
        
        let csv = '色号,颜色名称,RGB,数量\n';
        colors.forEach(color => {
            csv += `${color.name},${color.name},"${color.rgb.join(',')}",${color.count}\n`;
        });
        
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.download = `颜色统计_${Date.now()}.csv`;
        link.href = URL.createObjectURL(blob);
        link.click();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new BeadPatternGenerator();
});

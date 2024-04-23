document.addEventListener("DOMContentLoaded", function() {
    const textColorInput = document.getElementById("textColor");
    const bgColorInput = document.getElementById("bgColor");
    const contrastResult = document.getElementById("contrastResult");
    const textColorPreview = document.getElementById("textColorPreview");
    const bgColorPreview = document.getElementById("bgColorPreview");

    // Function to calculate contrast ratio
    function calculateContrastRatio(textColor, bgColor) {
        const lum1 = calculateRelativeLuminance(textColor);
        const lum2 = calculateRelativeLuminance(bgColor);
        const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
        return contrastRatio.toFixed(2);
    }

    // Function to calculate relative luminance
    function calculateRelativeLuminance(color) {
        const rgb = hexToRgb(color);
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        const gammaCorrect = (c) => {
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * gammaCorrect(r) + 0.7152 * gammaCorrect(g) + 0.0722 * gammaCorrect(b);
    }

    // Function to convert hex color to RGB
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Function to update contrast result
    function updateContrastResult() {
        const textColor = textColorInput.value;
        const bgColor = bgColorInput.value;
        const contrastRatio = calculateContrastRatio(textColor, bgColor);
        contrastResult.textContent = `Contrast Ratio: ${contrastRatio}`;
        if (contrastRatio >= 4.5) {
            contrastResult.style.color = "green";
        } else {
            contrastResult.style.color = "red";
        }
        // Update color preview
        textColorPreview.style.backgroundColor = textColor;
        bgColorPreview.style.backgroundColor = bgColor;
    }

    // Event listeners for color inputs
    textColorInput.addEventListener("input", updateContrastResult);
    bgColorInput.addEventListener("input", updateContrastResult);
});

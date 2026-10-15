/**
 * The Club Classic — Main JavaScript
 * Handles Tailwind CSS theme extensions, product media interactions,
 * and dynamic commission calculations.
 */

// ==========================================================================
// 1. Tailwind CSS Configuration
// ==========================================================================
window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed-dim": "#eabda3",
        "primary-fixed-dim": "#a4d1b8",
        "on-primary": "#0b3726",
        "on-surface": "#e2e2e2",
        "background": "#131313",
        "tertiary": "#c6c6c7",
        "surface-container-low": "#1b1b1b",
        "on-background": "#e2e2e2",
        "surface-container-highest": "#353535",
        "surface-tint": "#a4d1b8",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-primary-container": "#86b29b",
        "primary-container": "#1b4533",
        "on-tertiary": "#2f3131",
        "on-error-container": "#ffdad6",
        "tertiary-fixed-dim": "#c6c6c7",
        "on-secondary-fixed-variant": "#5f402c",
        "primary": "#a4d1b8",
        "error": "#ffb4ab",
        "outline": "#8b938d",
        "tertiary-container": "#3c3e3e",
        "on-tertiary-fixed-variant": "#454747",
        "tertiary-fixed": "#e2e2e2",
        "secondary": "#eabda3",
        "inverse-on-surface": "#303030",
        "on-primary-fixed-variant": "#254e3c",
        "on-primary-fixed": "#002114",
        "primary-fixed": "#bfedd3",
        "on-secondary-container": "#d7ac92",
        "surface-dim": "#131313",
        "on-tertiary-container": "#a8a9a9",
        "surface-container": "#1f1f1f",
        "inverse-primary": "#3d6753",
        "surface-bright": "#393939",
        "surface-container-lowest": "#0e0e0e",
        "surface": "#131313",
        "secondary-fixed": "#ffdbc7",
        "on-tertiary-fixed": "#1a1c1c",
        "surface-variant": "#353535",
        "on-surface-variant": "#c1c8c2",
        "outline-variant": "#414944",
        "on-secondary": "#452a17",
        "inverse-surface": "#e2e2e2",
        "on-secondary-fixed": "#2d1605",
        "secondary-container": "#5f402c",
        "surface-container-high": "#2a2a2a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-mobile": "1.5rem",
        "space-xl": "6rem",
        gutter: "2rem",
        "space-xs": "0.5rem",
        "space-lg": "3rem",
        margin: "4rem",
        "gutter-mobile": "1rem",
        "space-sm": "1rem",
        "space-md": "1.5rem"
      },
      fontFamily: {
        "display-xl-mobile": ["Playfair Display"],
        "headline-lg": ["Playfair Display"],
        "body-sm": ["Inter"],
        "label-sm": ["Inter"],
        "headline-md": ["Playfair Display"],
        "label-lg": ["Inter"],
        "label-md": ["Inter"],
        "headline-sm": ["Playfair Display"],
        "body-lg": ["Inter"],
        "display-lg": ["Playfair Display"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Playfair Display"],
        "display-lg-mobile": ["Playfair Display"],
        "display-xl": ["Playfair Display"]
      },
      fontSize: {
        "display-xl-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "400" }],
        "label-sm": ["9px", { lineHeight: "12px", letterSpacing: "0.25em", fontWeight: "600" }],
        "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "400" }],
        "label-lg": ["12px", { lineHeight: "16px", letterSpacing: "0.15em", fontWeight: "500" }],
        "label-md": ["11px", { lineHeight: "14px", letterSpacing: "0.2em", fontWeight: "500" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "30px", letterSpacing: "0.01em", fontWeight: "300" }],
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "26px", letterSpacing: "0.01em", fontWeight: "300" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "400" }],
        "display-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "0em", fontWeight: "400" }],
        "display-xl": ["72px", { lineHeight: "80px", letterSpacing: "-0.02em", fontWeight: "400" }]
      }
    }
  }
};

// ==========================================================================
// 2. Product Gallery Interactions (product.html)
// ==========================================================================
function changeImage(button, imageSrc) {
  const mainImg = document.getElementById("main-product-image");
  if (mainImg) {
    mainImg.style.opacity = "0.5";
    setTimeout(() => {
      mainImg.src = imageSrc;
      mainImg.style.opacity = "1";
    }, 150);
  }

  document.querySelectorAll(".thumbnail-btn").forEach((btn) => {
    btn.classList.remove("border-primary-fixed");
    btn.classList.add("border-white/20", "opacity-70");
  });

  if (button) {
    button.classList.remove("border-white/20", "opacity-70");
    button.classList.add("border-primary-fixed");
  }
}

// ==========================================================================
// 3. Dynamic Order Calculation & State Management (order.html)
// ==========================================================================
function updateSummary() {
  const selectedSizeEl = document.querySelector('input[name="table_size"]:checked');
  if (!selectedSizeEl) return;

  const sizePrice = parseInt(selectedSizeEl.getAttribute("data-price") || "3499", 10);
  const sizeName = selectedSizeEl.getAttribute("data-name") || "12 × 6 ft Championship Standard";

  const summarySizeName = document.getElementById("summary-size-name");
  const summaryBasePrice = document.getElementById("summary-base-price");
  const summaryTotalPrice = document.getElementById("summary-total-price");

  if (summarySizeName) summarySizeName.textContent = sizeName;
  if (summaryBasePrice) summaryBasePrice.textContent = `$${sizePrice.toLocaleString()}.00`;
  if (summaryTotalPrice) summaryTotalPrice.textContent = `$${sizePrice.toLocaleString()}.00`;

  // Highlight selected Size Card
  document.querySelectorAll(".size-card").forEach((card) => {
    const input = card.querySelector("input");
    if (input && input.checked) {
      card.classList.remove("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.add("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    } else if (input) {
      card.classList.add("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.remove("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    }
  });

  // Highlight selected Timber Finish
  const selectedWoodEl = document.querySelector('input[name="wood_finish"]:checked');
  if (selectedWoodEl) {
    const labelWood = document.getElementById("label-wood-finish");
    const summaryWood = document.getElementById("summary-wood");
    if (labelWood) labelWood.textContent = selectedWoodEl.value;
    if (summaryWood) summaryWood.textContent = selectedWoodEl.value;
  }
  document.querySelectorAll(".wood-card").forEach((card) => {
    const input = card.querySelector("input");
    if (input && input.checked) {
      card.classList.remove("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.add("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    } else if (input) {
      card.classList.add("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.remove("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    }
  });

  // Highlight selected Cloth Color
  const selectedClothEl = document.querySelector('input[name="cloth_color"]:checked');
  if (selectedClothEl) {
    const labelCloth = document.getElementById("label-cloth-color");
    const summaryCloth = document.getElementById("summary-cloth");
    if (labelCloth) labelCloth.textContent = selectedClothEl.value;
    if (summaryCloth) summaryCloth.textContent = `Strachan 6811 (${selectedClothEl.value})`;
  }
  document.querySelectorAll(".cloth-card").forEach((card) => {
    const input = card.querySelector("input");
    if (input && input.checked) {
      card.classList.remove("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.add("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    } else if (input) {
      card.classList.add("border-white/20", "bg-secondary-container/40", "opacity-80");
      card.classList.remove("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
    }
  });

  // Payment Calculation
  const selectedPayEl = document.querySelector('input[name="payment_option"]:checked');
  if (selectedPayEl) {
    const depositVal = (sizePrice * 0.2).toFixed(2);
    const depBadge = document.getElementById("deposit-amount-badge");
    const fullBadge = document.getElementById("full-amount-badge");
    if (depBadge) depBadge.textContent = `$${depositVal} Due`;
    if (fullBadge) fullBadge.textContent = `$${sizePrice.toLocaleString()}.00`;

    const cardFields = document.getElementById("card-fields");
    const dueTodayEl = document.getElementById("summary-due-today");
    const submitBtnText = document.getElementById("btn-submit-text");

    if (selectedPayEl.value === "deposit") {
      if (dueTodayEl) dueTodayEl.textContent = `$${depositVal}`;
      if (submitBtnText) submitBtnText.textContent = `Reserve with 20% Deposit ($${depositVal})`;
      if (cardFields) cardFields.style.display = "block";
    } else if (selectedPayEl.value === "full") {
      if (dueTodayEl) dueTodayEl.textContent = `$${sizePrice.toLocaleString()}.00`;
      if (submitBtnText) submitBtnText.textContent = `Pay in Full ($${sizePrice.toLocaleString()}.00)`;
      if (cardFields) cardFields.style.display = "block";
    } else {
      if (dueTodayEl) dueTodayEl.textContent = "$0.00 (Consultation)";
      if (submitBtnText) submitBtnText.textContent = "Submit Formal Inquiry ($0 Today)";
      if (cardFields) cardFields.style.display = "none";
    }

    document.querySelectorAll(".payment-card").forEach((card) => {
      const input = card.querySelector("input");
      if (input && input.checked) {
        card.classList.remove("border-white/20", "bg-secondary-container/40", "opacity-80");
        card.classList.add("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
      } else if (input) {
        card.classList.add("border-white/20", "bg-secondary-container/40", "opacity-80");
        card.classList.remove("border-2", "border-primary-fixed", "bg-primary-container", "opacity-100");
      }
    });
  }
}

function handleOrderSubmit(e) {
  if (e) e.preventDefault();
  const selectedSizeInput = document.querySelector('input[name="table_size"]:checked');
  const selectedWoodInput = document.querySelector('input[name="wood_finish"]:checked');
  const selectedClothInput = document.querySelector('input[name="cloth_color"]:checked');

  const selectedSize = selectedSizeInput ? selectedSizeInput.getAttribute("data-name") : "12 × 6 ft Championship";
  const selectedWood = selectedWoodInput ? selectedWoodInput.value : "Rich Mahogany";
  const selectedCloth = selectedClothInput ? selectedClothInput.value : "Tournament Green";

  const modalSpecText = document.getElementById("modal-spec-text");
  if (modalSpecText) {
    modalSpecText.innerHTML = `<strong>Specification:</strong> ${selectedSize} • ${selectedWood} • ${selectedCloth}`;
  }
  const modal = document.getElementById("confirmation-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeModal() {
  const modal = document.getElementById("confirmation-modal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
  window.location.href = "index.html";
}

// Auto-initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("order-form")) {
    updateSummary();
  }
});


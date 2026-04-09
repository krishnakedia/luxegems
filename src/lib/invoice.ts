import { jsPDF } from "jspdf";
import type { CartItem, ShippingDetails } from "@/types";
import { formatPrice } from "./utils";

interface InvoiceData {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
  shipping: number;
  total: number;
}

export function generateInvoicePDF(data: InvoiceData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFillColor(45, 45, 45);
  doc.rect(0, 0, pageWidth, 45, "F");
  
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(28);
  doc.setFont("helvetica", "normal");
  doc.text("LUXE", 20, 25);
  doc.setTextColor(255, 255, 255);
  doc.text("GEMS", 55, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Premium Jewelry", 20, 35);
  
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text("INVOICE", pageWidth - 20, 25, { align: "right" });
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Order ID: ${data.orderId}`, pageWidth - 20, 35, { align: "right" });
  doc.text(`Date: ${data.date}`, pageWidth - 20, 42, { align: "right" });
  
  doc.setDrawColor(45, 45, 45);
  doc.line(20, 55, pageWidth - 20, 55);
  
  doc.setFontSize(11);
  doc.setTextColor(45, 45, 45);
  doc.setFont("helvetica", "bold");
  doc.text("Billing Details", 20, 68);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(data.shippingDetails.spp_name || "Customer", 20, 78);
  doc.text(data.shippingDetails.spp_address || "", 20, 84);
  doc.text(`${data.shippingDetails.spp_city || ""}, ${data.shippingDetails.spp_state || ""} - ${data.shippingDetails.spp_pin || ""}`, 20, 90);
  doc.text(`Phone: ${data.shippingDetails.spp_number || ""}`, 20, 96);
  doc.text(`Email: ${data.shippingDetails.spp_email || ""}`, 20, 102);
  
  doc.setFontSize(11);
  doc.setTextColor(45, 45, 45);
  doc.setFont("helvetica", "bold");
  doc.text("Order Details", pageWidth / 2 + 10, 68);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  let yPos = 78;
  
  doc.setFont("helvetica", "bold");
  doc.text("Item", 20, yPos);
  doc.text("Qty", 110, yPos);
  doc.text("Price", 135, yPos);
  doc.text("Total", 165, yPos);
  yPos += 6;
  
  doc.setFont("helvetica", "normal");
  data.items.forEach((item) => {
    const itemName = item.product?.p_name || "Product";
    const itemQty = item.cp_quantity.toString();
    const itemPrice = formatPrice(parseFloat(item.cp_poprice));
    const itemTotal = formatPrice(parseFloat(item.cp_total));
    
    doc.text(itemName.length > 35 ? itemName.substring(0, 35) + "..." : itemName, 20, yPos);
    doc.text(itemQty, 110, yPos);
    doc.text(itemPrice, 135, yPos);
    doc.text(itemTotal, 165, yPos);
    yPos += 7;
  });
  
  doc.line(20, yPos + 5, pageWidth - 20, yPos + 5);
  
  yPos += 15;
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", 130, yPos);
  doc.text(formatPrice(data.subtotal), 165, yPos);
  
  yPos += 7;
  doc.text("Shipping:", 130, yPos);
  doc.text(data.shipping === 0 ? "FREE" : formatPrice(data.shipping), 165, yPos);
  
  yPos += 10;
  doc.setDrawColor(45, 45, 45);
  doc.line(130, yPos, pageWidth - 20, yPos);
  
  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total:", 130, yPos);
  doc.text(formatPrice(data.total), 165, yPos);
  
  doc.setFillColor(45, 45, 45);
  doc.rect(0, 270, pageWidth, 27, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for shopping with LUXEGEMS!", pageWidth / 2, 280, { align: "center" });
  doc.setFontSize(8);
  doc.text("147, A/14, Girish Ghosh Road Belur Howrah-711202 | kediakrishna65@gmail.com | +91 8961941902", pageWidth / 2, 286, { align: "center" });
  
  return doc;
}

export function generateWhatsAppMessage(data: InvoiceData, pdfBase64: string, orderLink?: string): string {
  const phoneNumber = "918961941902";
  
  let message = `*New Order - LUXEGEMS*%0A%0A` +
    `Order ID: ${data.orderId}%0A` +
    `Date: ${data.date}%0A%0A` +
    `*Customer Details:*%0A` +
    `Name: ${data.shippingDetails.spp_name || "N/A"}%0A` +
    `Phone: ${data.shippingDetails.spp_number || "N/A"}%0A` +
    `Address: ${data.shippingDetails.spp_address || "N/A"}%0A` +
    `${data.shippingDetails.spp_city || ""}, ${data.shippingDetails.spp_state || ""} - ${data.shippingDetails.spp_pin || ""}%0A%0A` +
    `*Order Details:*%0A` +
    data.items.map((item, index) => 
      `${index + 1}. ${item.product?.p_name || "Product"} x${item.cp_quantity} = ${formatPrice(parseFloat(item.cp_total))}`
    ).join("%0A") + `%0A%0A` +
    `*Subtotal:* ${formatPrice(data.subtotal)}%0A` +
    `*Shipping:* ${data.shipping === 0 ? "FREE" : formatPrice(data.shipping)}%0A` +
    `*Total:* ${formatPrice(data.total)}%0A%0A`;
  
  if (orderLink) {
    message += `🔗 Track your order: ${orderLink}%0A%0A`;
  }
  
  message += `Please find the invoice attached.`;
  
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

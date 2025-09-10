// Contact Form API functions

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  visaCountry: string;
  visaType: string;
  departureDate: string;
  message: string;
  source: string; // Nguồn đến (website, facebook, etc.)
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    submittedAt: string;
    estimatedResponseTime: string;
  };
  error?: string;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fake API to submit contact form
 */
export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  await delay(2000); // Simulate API call delay

  // Simulate random success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    return {
      success: false,
      message: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.",
      error: "SERVER_ERROR"
    };
  }

  // Generate fake response data
  const submissionId = `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const submittedAt = new Date().toISOString();
  const estimatedResponseTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString('vi-VN'); // 2 hours from now

  console.log('📝 Contact form submitted:', {
    id: submissionId,
    customerInfo: {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email
    },
    visaRequest: {
      country: formData.visaCountry,
      type: formData.visaType,
      departureDate: formData.departureDate
    },
    message: formData.message,
    source: formData.source,
    submittedAt
  });

  return {
    success: true,
    message: `Cảm ơn ${formData.fullName}! Chúng tôi đã nhận được thông tin của bạn. Chuyên viên tư vấn sẽ liên hệ trong vòng 2 giờ.`,
    data: {
      id: submissionId,
      submittedAt,
      estimatedResponseTime
    }
  };
}

/**
 * Validate form data before submission
 */
export function validateContactForm(formData: Partial<ContactFormData>): string[] {
  const errors: string[] = [];

  if (!formData.fullName?.trim()) {
    errors.push("Vui lòng nhập họ và tên");
  }

  if (!formData.phone?.trim()) {
    errors.push("Vui lòng nhập số điện thoại");
  } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone.trim())) {
    errors.push("Số điện thoại không hợp lệ");
  }

  if (!formData.email?.trim()) {
    errors.push("Vui lòng nhập email");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.push("Email không hợp lệ");
  }

  if (!formData.visaCountry?.trim()) {
    errors.push("Vui lòng chọn quốc gia visa");
  }

  if (!formData.visaType?.trim()) {
    errors.push("Vui lòng chọn loại visa");
  }

  return errors;
}

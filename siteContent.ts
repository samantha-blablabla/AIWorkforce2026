import { SiteData } from './types';

export const siteData: SiteData = {
  intro: {
    titleLine1: "AI Workforce 2026",
    titleLine2: "Rước Bot Về Nhà",
    titleLine3: "Chăm Lo Việc Nhà",
    subtitle: "Giải pháp nhân sự AI toàn diện cho doanh nghiệp hiện đại.",
    bgImage: "BG.png", // Updated to local asset
  },
  overview: [
    {
      id: "01",
      title: "Tối ưu hóa quy trình",
      desc: "Tự động hóa các tác vụ lặp lại, giải phóng nhân sự cho công việc sáng tạo.",
    },
    {
      id: "02",
      title: "Chi phí vận hành",
      desc: "Giảm thiểu chi phí nhân sự cố định, tăng biên lợi nhuận ròng lên đến 30%.",
    },
    {
      id: "03",
      title: "Hoạt động 24/7",
      desc: "Không nghỉ phép, không mệt mỏi, đảm bảo hệ thống vận hành liên tục.",
    },
    {
      id: "04",
      title: "Quyết định chuẩn xác",
      desc: "Phân tích dữ liệu thời gian thực để đưa ra các quyết định kinh doanh tối ưu.",
    },
  ],
  roadmap: [
    {
      quarter: "Q1 2026",
      title: "Khởi tạo & Tích hợp",
      details: "Đánh giá hạ tầng, tích hợp core AI vào hệ thống CRM/ERP hiện có.",
    },
    {
      quarter: "Q2 2026",
      title: "Đào tạo Model",
      details: "Fine-tuning mô hình AI dựa trên dữ liệu doanh nghiệp cụ thể.",
    },
    {
      quarter: "Q3 2026",
      title: "Mở rộng quy mô",
      details: "Triển khai đại trà cho các phòng ban Marketing, Sales và CS.",
    },
    {
      quarter: "Q4 2026",
      title: "Hệ sinh thái tự chủ",
      details: "AI Workforce hoàn toàn tự chủ trong vận hành và báo cáo.",
    },
  ],
  registration: {
    title: "Đăng ký tham gia",
    subtitle: "*Thông tin cần điền",
    successTitle: "Bạn đã đăng ký thành công",
    successMessage: "Kiểm tra E-mail để nhận mã tham dự bạn nhé. Hẹn gặp bạn tại Workshop!",
    ctaButton: "Gửi Thông Tin",
    ctaProcessing: "Đang xử lý...",
    sloganSmall: "AI Workforce 2026",
    sloganLine1: "Rước Bot Về Nhà",
    sloganLine2: "Chăm Lo Việc Nhà",
    visualImage: "https://picsum.photos/800/800?grayscale", // Kept for type safety but not used in UI
  },
  footer: {
    brandName: "GEARVN",
    brandSub: "GEARVN.COM",
  },
};

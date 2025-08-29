import { ShieldCheck, Rocket, Users, DollarSign } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Tỷ Lệ Đậu Cao",
    description: "Với kinh nghiệm và sự am hiểu sâu sắc quy trình, chúng tôi tự hào mang đến tỷ lệ đậu visa thành công vượt trội.",
  },
  {
    icon: Rocket,
    title: "Thủ Tục Nhanh Gọn",
    description: "Chúng tôi tối ưu hóa mọi quy trình, giúp bạn tiết kiệm thời gian và công sức chuẩn bị hồ sơ.",
  },
  {
    icon: Users,
    title: "Tư Vấn Chuyên Nghiệp",
    description: "Đội ngũ chuyên viên giàu kinh nghiệm luôn sẵn sàng tư vấn 1-1, giải đáp mọi thắc mắc của bạn.",
  },
  {
    icon: DollarSign,
    title: "Chi Phí Hợp Lý",
    description: "Chúng tôi cam kết cung cấp dịch vụ chất lượng với mức phí cạnh tranh và minh bạch nhất.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-display font-bold \
                     bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Tại Sao Chọn VisaHub?
          </h2>
          <p className="text-lg mt-4 text-muted-foreground max-w-2xl mx-auto">
              Đối tác đáng tin cậy trên hành trình chinh phục thế giới của bạn.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="border border-gray-200/70 rounded-xl p-8 text-center transition-all duration-300 \
                         hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 bg-background/50"
            >
              <div className="flex justify-center items-center mb-5">
                  <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <feature.icon size={32} strokeWidth={2}/>
                  </div>
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

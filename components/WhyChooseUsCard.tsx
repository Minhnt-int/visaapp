
/**
 * Component hiển thị lý do chọn tour
 */
export function WhyChooseUsCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-500 rounded-lg text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}

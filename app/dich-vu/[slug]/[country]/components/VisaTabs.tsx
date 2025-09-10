'use client';

import { useState } from "react";
import { CheckCircle, FileText, Users, TrendingUp, MapPin } from "lucide-react";

interface VisaType {
  id: string;
  name: string;
  requirements: {
    personal: string[];
    work: Array<{
      type: string;
      docs: string[];
    }>;
    financial: string[];
    travel: string[];
  };
}

interface PricingType {
  type: string;
  name: string;
  description?: string;
  validity?: string;
  stayDuration?: string;
  processingTime?: string;
  prices: Array<{
    group?: string;
    adult: string;
    child_6_12: string;
    child_under_6: string;
    consularFee?: string;
    serviceFee?: string;
  }>;
}

interface VisaTabsProps {
  visaTypes: VisaType[];
  pricing: PricingType[];
  countryName: string;
}

export function VisaTabs({ visaTypes, pricing, countryName }: VisaTabsProps) {
  const [activeTab, setActiveTab] = useState('requirements');
  const [activeVisaType, setActiveVisaType] = useState(visaTypes[0]?.id || 'du-lich');
  const [activePriceType, setActivePriceType] = useState(pricing[0]?.type || 'du-lich');

  return (
    <div className="mb-16">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'requirements'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Hồ sơ xin visa {countryName}
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'pricing'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Bảng giá visa {countryName}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'requirements' && (
        <RequirementsTab 
          visaTypes={visaTypes}
          activeVisaType={activeVisaType}
          setActiveVisaType={setActiveVisaType}
        />
      )}
      
      {activeTab === 'pricing' && (
        <PricingTab 
          pricing={pricing}
          activePriceType={activePriceType}
          setActivePriceType={setActivePriceType}
        />
      )}
    </div>
  );
}

// Requirements Tab
function RequirementsTab({ visaTypes, activeVisaType, setActiveVisaType }: {
  visaTypes: VisaType[];
  activeVisaType: string;
  setActiveVisaType: (type: string) => void;
}) {
  const currentType = visaTypes.find((type) => type.id === activeVisaType);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Visa Type Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {visaTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveVisaType(type.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeVisaType === type.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {currentType && (
        <div className="space-y-8">
          {/* Personal Documents */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Hồ sơ nhân thân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentType.requirements.personal.map((doc: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Documents */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Hồ sơ công việc
            </h3>
            <div className="space-y-6">
              {currentType.requirements.work.map((workType, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Nếu là {workType.type.toLowerCase()}:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                    {workType.docs.map((doc: string, docIndex: number) => (
                      <div key={docIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Documents */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              Hồ sơ chứng minh thu nhập
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentType.requirements.financial.map((doc: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Documents */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Giấy tờ chuyến đi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentType.requirements.travel.map((doc: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Pricing Tab
function PricingTab({ pricing, activePriceType, setActivePriceType }: {
  pricing: PricingType[];
  activePriceType: string;
  setActivePriceType: (type: string) => void;
}) {
  const currentPricing = pricing.find((price) => price.type === activePriceType);

  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString('vi-VN');
  };

  if (!currentPricing) {
    return <div>Không tìm thấy thông tin giá</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Price Type Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {pricing.map((priceType) => (
          <button
            key={priceType.type}
            onClick={() => setActivePriceType(priceType.type)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activePriceType === priceType.type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {priceType.name}
          </button>
        ))}
      </div>

      {/* Visa Info */}
      {(currentPricing.description || currentPricing.validity || currentPricing.processingTime) && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-4">Thông tin visa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPricing.validity && (
              <div>
                <div className="text-sm font-medium text-blue-700">Thời hạn visa</div>
                <div className="text-blue-900">{currentPricing.validity}</div>
              </div>
            )}
            {currentPricing.stayDuration && (
              <div>
                <div className="text-sm font-medium text-blue-700">Thời gian lưu trú</div>
                <div className="text-blue-900">{currentPricing.stayDuration}</div>
              </div>
            )}
            {currentPricing.processingTime && (
              <div>
                <div className="text-sm font-medium text-blue-700">Thời gian xử lý</div>
                <div className="text-blue-900">{currentPricing.processingTime}</div>
              </div>
            )}
          </div>
          {currentPricing.description && (
            <div className="mt-4 text-sm text-blue-800">{currentPricing.description}</div>
          )}
        </div>
      )}

      {/* Pricing Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Đối tượng</th>
              {currentPricing.prices.map((priceGroup, index) => (
                <th key={index} className="border border-gray-300 px-6 py-4 text-center font-semibold">
                  {priceGroup.group || `Gói ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-6 py-4 font-medium">Người lớn và trẻ em từ 12 tuổi</td>
              {currentPricing.prices.map((priceGroup, index) => (
                <td key={index} className="border border-gray-300 px-6 py-4 text-center text-red-600 font-bold">
                  {formatPrice(priceGroup.adult)} VNĐ
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-6 py-4 font-medium">Trẻ em từ 6 đến 11 tuổi</td>
              {currentPricing.prices.map((priceGroup, index) => (
                <td key={index} className="border border-gray-300 px-6 py-4 text-center text-red-600 font-bold">
                  {formatPrice(priceGroup.child_6_12)} VNĐ
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 px-6 py-4 font-medium">Trẻ em dưới 6 tuổi</td>
              {currentPricing.prices.map((priceGroup, index) => (
                <td key={index} className="border border-gray-300 px-6 py-4 text-center text-red-600 font-bold">
                  {formatPrice(priceGroup.child_under_6)} VNĐ
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fee Breakdown */}
      {currentPricing.prices[0].consularFee && currentPricing.prices[0].serviceFee && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Chi tiết phí (Gói 1-2 khách)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Phí lãnh sự</div>
              <div className="text-lg font-bold text-blue-600">
                {formatPrice(currentPricing.prices[0].consularFee)} VNĐ
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-500 mb-1">Phí dịch vụ</div>
              <div className="text-lg font-bold text-green-600">
                {formatPrice(currentPricing.prices[0].serviceFee)} VNĐ
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-red-200">
              <div className="text-sm text-gray-500 mb-1">Tổng cộng</div>
              <div className="text-lg font-bold text-red-600">
                {formatPrice(currentPricing.prices[0].adult)} VNĐ
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-green-600 mb-4">Phí dịch vụ bao gồm:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Phí lãnh sự xin visa</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Phí dịch thuật giấy tờ chuyên nghiệp</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Phí dịch vụ tư vấn và hỗ trợ 24/7</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Kiểm tra và hoàn thiện hồ sơ</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">Hỗ trợ đặt lịch hẹn nộp hồ sơ</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-600 mb-4">Không bao gồm:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Phí xử lý hồ sơ khẩn cấp</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Chi phí di chuyển cá nhân</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Phí chụp ảnh và photo tài liệu</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Bảo hiểm du lịch (nếu chưa có)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

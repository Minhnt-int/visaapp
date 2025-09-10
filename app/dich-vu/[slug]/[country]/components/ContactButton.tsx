'use client';

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import SuccessNotification from "@/components/SuccessNotification";

interface ContactButtonProps {
  countryName: string;
  visaTypes: Array<{ id: string; name: string; }>;
}

export function ContactButton({ countryName, visaTypes }: ContactButtonProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [submittedCustomerName, setSubmittedCustomerName] = useState('');
  const [estimatedResponseTime, setEstimatedResponseTime] = useState('');

  const handleContactSuccess = (customerName: string, responseTime: string) => {
    setSubmittedCustomerName(customerName);
    setEstimatedResponseTime(responseTime);
    setShowSuccessNotification(true);
    setIsContactModalOpen(false);
  };

  return (
    <>
      <button 
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors"
        onClick={() => setIsContactModalOpen(true)}
      >
        YÊU CẦU TƯ VẤN VISA {countryName.toUpperCase()}
      </button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        countryName={countryName}
        visaTypes={visaTypes}
        onSuccess={handleContactSuccess}
      />

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        customerName={submittedCustomerName}
        estimatedTime={estimatedResponseTime}
        onClose={() => setShowSuccessNotification(false)}
      />
    </>
  );
}

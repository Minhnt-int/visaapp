
import { getMetaJson } from "@/lib/api";
import { Building, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, MessageCircle, Share2 } from 'lucide-react';
import ContactForm from "@/components/ContactForm"; // CORRECT: Import the new client component
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';

interface ContactInfoData {
    _type: "info";
    phone: string;
    email: string;
    address: string;
    mapIframeSrc?: string;
    openTime?: {
        weekdays?: {
            days?: string;
            hours?: string;
        };
        weekend?: {
            days?: string;
            hours?: string;
        };
    };
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        zalo?: string;
    };
}

export async function generateMetadata(): Promise<Metadata> {
    return await generatePageMetadata({ pageKey: 'lien-he', pageUrl: '/lien-he', fallbackUrl: '/lien-he' });
}

// CORRECT: Converted to an async Server Component
export default async function ContactPage() {
    // CORRECT: Fetch data on the server from metaJson
    // getMetaJson returns: { id, pageKey, metaData } where metaData is ContactInfoData
    const contactMeta = await getMetaJson<{ id?: number; pageKey?: string; metaData?: ContactInfoData }>('contactInfo');
    
    if (!contactMeta?.metaData) {
        console.warn('Contact info not found in metaJson, returning null');
        return null;
    }
    
    const contactInfo: ContactInfoData = contactMeta.metaData;

    // Debug log (remove in production)
    if (process.env.NODE_ENV === 'development') {
        console.log('Contact Info Data:', JSON.stringify(contactInfo, null, 2));
    }

    return (
        <main>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
                    <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl">Liên Hệ Với Chúng Tôi</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Có câu hỏi hoặc cần tư vấn? Đừng ngần ngại liên hệ. Đội ngũ Kim Quy Travel luôn sẵn sàng hỗ trợ bạn.
                    </p>
                </div>
            </div>

            {/* Contact Form and Info Section */}
            <div className="isolate bg-base-100">
                <div className="container mx-auto px-4 py-24 sm:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
                        {/* Contact Info */}
                        <div className="lg:max-w-lg">
                            <h2 className="text-3xl font-bold font-display tracking-tight text-stone-600">Thông Tin Liên Hệ</h2>
                            <p className="mt-4 text-lg leading-8 text-base-content">
                                Bạn có thể liên hệ trực tiếp với chúng tôi qua các thông tin dưới đây hoặc sử dụng biểu mẫu bên cạnh.
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-base-content">
                                {contactInfo.address && (
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Address</span>
                                            <Building className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>{contactInfo.address}</dd>
                                    </div>
                                )}
                                {contactInfo.phone && (
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Telephone</span>
                                            <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd><a className="hover:text-primary" href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></dd>
                                    </div>
                                )}
                                {contactInfo.email && (
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Email</span>
                                            <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd><a className="hover:text-primary" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></dd>
                                    </div>
                                )}
                                {contactInfo.openTime && (
                                    <>
                                        {contactInfo.openTime.weekdays && (
                                            <div className="flex gap-x-4">
                                                <dt className="flex-none">
                                                    <span className="sr-only">Weekdays Hours</span>
                                                    <Clock className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                                </dt>
                                                <dd>
                                                    <span className="font-semibold">{contactInfo.openTime.weekdays.days || 'Thứ 2 - Thứ 6'}:</span> {contactInfo.openTime.weekdays.hours || '08:00 - 17:00'}
                                                </dd>
                                            </div>
                                        )}
                                        {contactInfo.openTime.weekend && (
                                            <div className="flex gap-x-4">
                                                <dt className="flex-none">
                                                    <span className="sr-only">Weekend Hours</span>
                                                    <Clock className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                                </dt>
                                                <dd>
                                                    <span className="font-semibold">{contactInfo.openTime.weekend.days || 'Thứ 7 - Chủ nhật'}:</span> {contactInfo.openTime.weekend.hours || '08:00 - 12:00'}
                                                </dd>
                                            </div>
                                        )}
                                    </>
                                )}
                                {contactInfo.socialMedia && (
                                    <div className="flex gap-x-4">
                                        <dt className="flex-none">
                                            <span className="sr-only">Social Media</span>
                                            <Share2 className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="flex flex-wrap gap-3 sm:gap-4">
                                            {contactInfo.socialMedia.facebook && (
                                                <a
                                                    href={contactInfo.socialMedia.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors"
                                                    aria-label="Facebook"
                                                >
                                                    <Facebook className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Facebook</span>
                                                </a>
                                            )}
                                            {contactInfo.socialMedia.zalo && (
                                                <a
                                                    href={contactInfo.socialMedia.zalo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors"
                                                    aria-label="Zalo"
                                                >
                                                    <MessageCircle className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Zalo</span>
                                                </a>
                                            )}
                                            {contactInfo.socialMedia.youtube && (
                                                <a
                                                    href={contactInfo.socialMedia.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors"
                                                    aria-label="YouTube"
                                                >
                                                    <Youtube className="h-5 w-5" />
                                                    <span className="text-sm font-medium">YouTube</span>
                                                </a>
                                            )}
                                            {contactInfo.socialMedia.instagram && (
                                                <a
                                                    href={contactInfo.socialMedia.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 hover:text-pink-700 transition-colors"
                                                    aria-label="Instagram"
                                                >
                                                    <Instagram className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Instagram</span>
                                                </a>
                                            )}
                                        </dd>
                                    </div>
                                )}

                            </dl>
                        </div>

                        {/* Contact Form - Now a Client Component */}
                        <ContactForm />
                    </div>

                    {contactInfo.mapIframeSrc && contactInfo.mapIframeSrc.trim() && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-stone-600 mb-3">Vị trí trên bản đồ</h3>
                            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                <iframe
                                    src={contactInfo.mapIframeSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Bản đồ vị trí"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mb-16 bg-background rounded-3xl p-8 md:p-12 shadow-lg border border-neutral-100">
      <h2 className="text-3xl font-bold text-foreground mb-10 text-center">
        Khách hàng nói gì về Kim Quy Travel?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-primary-lightest p-6 rounded-xl flex flex-col items-center text-center shadow-sm border border-primary-lighter">
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-neutral-700 italic mb-4 leading-relaxed">{testimonial.quote}</p>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent-orange-light' : 'text-neutral-300'}`}
                  fill={i < testimonial.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Test file để kiểm tra imports
const Header = require('./components/Header.tsx');
const Hero = require('./components/Hero.tsx');
const Footer = require('./components/Footer.tsx');
const ServiceSection = require('./components/ServiceSection.tsx');
const WhyChooseUs = require('./components/WhyChooseUs.tsx');
const NewsSection = require('./components/NewsSection.tsx');

console.log('Header:', typeof Header, Header?.default ? 'OK' : 'MISSING');
console.log('Hero:', typeof Hero, Hero?.default ? 'OK' : 'MISSING');
console.log('Footer:', typeof Footer, Footer?.default ? 'OK' : 'MISSING');
console.log('ServiceSection:', typeof ServiceSection, ServiceSection?.default ? 'OK' : 'MISSING');
console.log('WhyChooseUs:', typeof WhyChooseUs, WhyChooseUs?.default ? 'OK' : 'MISSING');
console.log('NewsSection:', typeof NewsSection, NewsSection?.default ? 'OK' : 'MISSING');

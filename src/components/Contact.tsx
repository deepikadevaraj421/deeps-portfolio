import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, FileText, Send, CheckCircle2, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ show: false, isError: false, title: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    let valid = true;
    const tempErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address.';
      valid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: 'Deepika D',
          to_email: 'deepikadevaraj413@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setToastConfig({
        show: true,
        isError: false,
        title: 'Message sent successfully.',
        message: 'I will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setToastConfig({
        show: true,
        isError: true,
        title: 'Failed to send message.',
        message: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToastConfig(prev => ({ ...prev, show: false })), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 w-full bg-white overflow-hidden relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4 font-heading animate-pulse-subtle">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-sm sm:text-base text-warmgray">
            Have a project in mind, an internship opportunity, or just want to say hi? Feel free to drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Side: Contact Information & Cards */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-6">
              Contact Information
            </h3>
            
            {/* Cards */}
            <div className="space-y-4">
              <a 
                href="mailto:deepikadevaraj413@gmail.com"
                className="flex items-center space-x-4 p-5 rounded-2xl bg-ivory/40 border border-bordercolor hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-bordercolor flex items-center justify-center text-gold">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-warmgray uppercase tracking-wider">Email Me</p>
                  <p className="text-xs sm:text-sm font-bold text-charcoal break-all">deepikadevaraj413@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:+919360306340"
                className="flex items-center space-x-4 p-5 rounded-2xl bg-ivory/40 border border-bordercolor hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-bordercolor flex items-center justify-center text-gold">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-warmgray uppercase tracking-wider">Call Me</p>
                  <p className="text-xs sm:text-sm font-bold text-charcoal">+91 9360306340</p>
                </div>
              </a>
            </div>

            {/* Social Buttons */}
            <div>
              <p className="text-xs font-bold text-warmgray uppercase tracking-wider mb-4">Connect Online</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/deepika-devaraj-2172a831a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl border border-bordercolor text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-300 bg-white"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/deepikadevaraj421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl border border-bordercolor text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-300 bg-white"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="/Deepika_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl border border-bordercolor text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-300 bg-white"
                >
                  <FileText size={14} />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 sm:p-10 rounded-3xl border border-bordercolor shadow-xl bg-white/70 relative overflow-hidden"
            >
              <h3 className="font-heading text-xl font-bold text-charcoal mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-charcoal/80 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-500 bg-red-50/10' : 'border-bordercolor bg-white'
                    } text-sm focus:outline-none focus:border-gold transition-colors duration-200 text-charcoal`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-charcoal/80 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-500 bg-red-50/10' : 'border-bordercolor bg-white'
                    } text-sm focus:outline-none focus:border-gold transition-colors duration-200 text-charcoal`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-charcoal/80 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? 'border-red-500 bg-red-50/10' : 'border-bordercolor bg-white'
                    } text-sm focus:outline-none focus:border-gold transition-colors duration-200 text-charcoal resize-none`}
                    placeholder="Write your message here..."
                  />
                  {errors.message && <span className="text-[10px] text-red-500 font-medium">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center space-x-2 py-4 px-6 rounded-xl bg-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-gold transition-all duration-300 disabled:bg-charcoal/50 shadow-md shadow-charcoal/5"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Floating Success Toast Alert */}
      <AnimatePresence>
        {toastConfig.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-50 glass py-4 px-6 rounded-2xl border ${toastConfig.isError ? 'border-red-500/30' : 'border-gold/30'} shadow-2xl flex items-center space-x-3 bg-white/95 max-w-sm w-full mx-4`}
          >
            <div className={`w-8 h-8 rounded-full ${toastConfig.isError ? 'bg-red-500/10 text-red-500' : 'bg-gold/10 text-gold'} flex items-center justify-center flex-shrink-0`}>
              {toastConfig.isError ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
            </div>
            <div>
              <p className="text-xs font-bold text-charcoal font-heading">{toastConfig.title}</p>
              <p className="text-[10px] text-warmgray mt-0.5 font-sans">{toastConfig.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

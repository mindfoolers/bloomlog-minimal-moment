import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Moon, Sun, Check } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { FeatureCard } from '@/components/FeatureCard';

const Index = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const { data, error } = await supabase
          .from('wishlist')
          .insert([{ email, name: name || null }])
          .select();

        if (error) {
          console.error('Error inserting into Supabase:', error);
          // Check for unique constraint violation (PostgreSQL error code 23505)
          if (error.code === '23505' || (error.message && error.message.includes('violates unique constraint'))) {
            toast({
              title: "Already on the list!",
              description: "This email address has already been registered. We'll keep you updated!",
              variant: "default", // Or another appropriate variant
            });
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem saving your details. Please try again. Details: " + error.message,
              variant: "destructive",
            });
          }
          return;
        }

        console.log('Successfully inserted:', data);
        setIsSubmitted(true);
        toast({
          title: "Welcome to Bloomlog! 🌱",
          description: "You're on the waitlist. We'll be in touch soon!",
        });

      } catch (err) {
        console.error('Unexpected error:', err);
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        toast({
          title: "Oops! Unexpected Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-bloom-navy/80 backdrop-blur-sm border border-bloom-green/20 hover:scale-110 transition-transform duration-200"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-bloom-coral" /> : <Moon className="w-5 h-5 text-bloom-navy" />}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-bloom-green-light">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-bloom-coral/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-bloom-teal/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-bloom-lavender/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            {/* Logo/Icon */}
            <div className="mb-2 flex justify-center">
              <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm animate-bloom">
                <img src="/logo.png" alt="Bloomlog" className="w-24 h-24" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-bloom-navy dark:text-bloom-cream mb-6 text-balance">
              Bloomlog
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-bloom-navy/80 dark:text-bloom-cream/80 mb-12 font-light max-w-2xl mx-auto text-balance">
              Grow through reflection. Just one minute a day.
            </p>

            {/* CTA Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 text-lg bg-white/90 dark:bg-bloom-navy/90 border-bloom-green/30 focus:border-bloom-teal rounded-full"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 text-lg bg-white/90 dark:bg-bloom-navy/90 border-bloom-green/30 focus:border-bloom-teal rounded-full"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full py-4 text-lg font-medium bg-bloom-teal hover:bg-bloom-teal/90 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Join the waitlist
                </Button>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-8 bg-white/90 dark:bg-bloom-navy/90 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-bloom-green/20 rounded-full">
                    <Check className="w-8 h-8 text-bloom-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-bloom-navy dark:text-bloom-cream mb-2">You're in! 🎉</h3>
                <p className="text-bloom-navy/70 dark:text-bloom-cream/70">
                  Welcome to the Bloomlog family. We'll let you know when we're ready to help you grow.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-bloom-beige dark:bg-bloom-navy border-b border-bloom-green-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-bloom-navy dark:text-bloom-cream mb-8">
              Journaling is hard to stick with.
            </h2>
            <p className="text-xl md:text-2xl text-bloom-navy/70 dark:text-bloom-cream/70 mb-12 leading-relaxed">
              We get it. Life is busy, and finding time for deep reflection feels impossible. 
              That's why Bloomlog calls you to journal, makes it easy, quick, and personal.
            </p>
            <div className="bg-white/60 dark:bg-bloom-navy/60 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <p className="text-lg text-bloom-navy dark:text-bloom-cream font-normal italic">
                " Just one minute a day can transform how you understand yourself and navigate your emotions. "
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 border-t border-bloom-green-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-bloom-navy dark:text-bloom-cream mb-6">
              Designed for your busy life
            </h2>
            <p className="text-xl text-bloom-navy/70 dark:text-bloom-cream/70 max-w-2xl mx-auto">
              Simple features that make mindful reflection a natural part of your day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <FeatureCard
              icon={<span className="text-2xl">💚</span>}
              title="1-Minute Reflections"
              subtitle="Pause. Breathe. Express."
              description="Effortless prompts designed to fit into even your busiest moments. Reflect daily in just 60 seconds."
              bgColor="bg-bloom-green/20"
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={<span className="text-2xl">😊</span>}
              title="Mood Check-ins"
              subtitle="Feel it. Name it. Track it."
              description="Capture your emotional state with a tap—simple emojis that map your inner world over time."
              bgColor="bg-bloom-lavender/20"
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={<span className="text-2xl">📈</span>}
              title="AI Insights"
              subtitle="See your growth unfold."
              description="Your private reflections, gently decoded. Discover patterns, trends, and guidance tailored to your emotional journey."
              bgColor="bg-bloom-teal/20"
            />

            {/* Feature 4 */}
            <FeatureCard
              icon={<span className="text-2xl">🎙️</span>}
              title="Voice Journaling"
              subtitle="Speak your mind, hands-free."
              description="Too tired to type? Bloomlog will call you—just talk, and your feelings are saved."
              bgColor="bg-bloom-coral/20"
            />

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-bloom-navy/80 dark:bg-bloom-navy/90 text-bloom-cream border-t border-bloom-green-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-1">
              <img src="/logo.png" alt="Bloomlog" className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Bloomlog</h3>
            
            {/* Privacy Note */}
            <div className="bg-bloom-teal/10 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-bloom-cream/90 font-medium">
                🔒 Your thoughts are your own. We'll never sell your data.
              </p>
              <p className="text-bloom-cream/70 text-sm mt-2">
                Privacy-first journaling, always.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8 text-bloom-cream/70">
              <a href="https://x.com/bloomlog62203" className="hover:text-bloom-green transition-colors">Twitter</a>
              {/* <a href="https://www.instagram.com/bloomlog" className="hover:text-bloom-green transition-colors">Instagram</a> */}
              <a href="mailto:reach.bloomlog@gmail.com" className="hover:text-bloom-green transition-colors">Contact</a>
            </div>
            
            <p className="text-bloom-cream/60 text-sm">
              © 2025 Bloomlog. Made with 💚 for mindful growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

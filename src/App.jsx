import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Shield,
  Clock,
  Brain,
  Heart,
  Users,
  ChevronRight,
  Menu,
  X,
  Check,
  Bot,
  User,
  Stethoscope,
  Activity,
  Search,
  Send,
  Plus,
  Mic,
} from "lucide-react";

const AIHealthLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your AI Health Assistant. How can I help you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChatSubmit = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { type: "user", text: userInput };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsTyping(true);

    // Simulate AI response with health-focused answers
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I'd recommend staying hydrated and monitoring your temperature. If symptoms persist for more than 48 hours, consider consulting a healthcare professional.",
        "I've analyzed your symptoms. Here are some gentle exercises that might help with your back pain: 1) Cat-Cow stretches, 2) Child's pose, 3) Pelvic tilts. Would you like detailed instructions for any of these?",
        "Your described sleep pattern suggests potential sleep hygiene issues. I suggest establishing a consistent bedtime routine: 1) No screens 1 hour before bed, 2) Keep room temperature around 65°F, 3) Try relaxation techniques like deep breathing.",
        "The symptoms you mentioned could indicate stress or anxiety. Try the 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times. Would you like me to guide you through this now?",
        "For headaches, I recommend: 1) Hydrating with water, 2) Applying a cool compress to your forehead, 3) Resting in a quiet, dark room. Avoid caffeine until the headache subsides.",
        "Based on your food log, I notice you might benefit from more leafy greens. Would you like some easy recipe ideas to incorporate more nutrient-dense foods?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: randomResponse },
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s for more natural feel
  };

  const handleQuickQuestion = (question) => {
    setUserInput(question);
    setIsChatOpen(true);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Health Q&A",
      description:
        "Ask any health question and get intelligent, evidence-based answers instantly.",
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Symptom Logging",
      description:
        "Track your symptoms over time with our intuitive logging system.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Personalized Recommendations",
      description:
        "Receive tailored health suggestions based on your unique profile.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description:
        "Your health data is encrypted and completely secure with Supabase.",
    },
  ];

  const steps = [
    {
      title: "Sign up securely",
      description: "Create your account with bank-level encryption",
      icon: <Shield className="w-12 h-12" />,
    },
    {
      title: "Chat with your assistant",
      description: "Ask questions naturally, just like texting a friend",
      icon: <MessageCircle className="w-12 h-12" />,
    },
    {
      title: "Get intelligent recommendations",
      description: "Receive personalized health insights and suggestions",
      icon: <Brain className="w-12 h-12" />,
    },
    {
      title: "Monitor your wellness",
      description: "Track progress and maintain your health journey",
      icon: <Heart className="w-12 h-12" />,
    },
  ];

  const quickQuestions = [
    "What are COVID-19 symptoms?",
    "How to relieve back pain?",
    "Best foods for immunity?",
    "Signs of dehydration?",
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        {isChatOpen ? (
          <div className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 transform transition-all duration-300">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Health Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl ${
                      message.type === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-4 py-3 rounded-xl rounded-bl-none shadow-sm border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2 bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-white text-blue-600 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  placeholder="Type your health question..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleChatSubmit}
                  disabled={!userInput.trim()}
                  className={`p-2 rounded-full ${
                    userInput.trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500"
                  } transition-colors`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">Open chat</span>
          </button>
        )}
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <img src="./logo.svg" alt="HealthAI Logo" className="w-50 h-50" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="https://carebridge-app.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="flex flex-col items-center py-8 space-y-6">
            <a
              href="#features"
              className="text-xl text-gray-600 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-xl text-gray-600 hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-xl text-gray-600 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="https://carebridge-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl"
            >
              Sign In
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="pt-20 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/futuristic-robotic-doctor-doctor-s-coat-with-stethoscope-blue-background_656098-1521.jpg?semt=ais_hybrid&w=740')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white opacity-80"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Smart AI Health Companion —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Available 24/7
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Ask questions, track symptoms, and receive instant, intelligent
                health support from your personal AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://carebridge-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Get Started Free
                  <ChevronRight className="w-5 h-5 ml-2 inline" />
                </a>
                <button className="border-2 border-white-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Interactive Chat Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto border border-gray-100">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      AI Health Assistant
                    </h3>
                    <p className="text-sm text-green-500 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Online
                    </p>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto mb-4 space-y-3">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                    placeholder="Ask about your health..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleChatSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your AI Health Assistant Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our intelligent AI
              companion designed to support your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                24/7 Symptom Checking
              </h3>
              <p className="text-gray-600">
                Get immediate responses to health concerns any time of day. Our
                AI is always available when you need support.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600">
                Receive tailored health advice based on your unique profile,
                symptoms, and health history.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your health data is encrypted and protected with
                enterprise-grade security. Continuously improving with the
                latest AI advancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with your AI health companion in just a few simple
              steps
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-xl transition-all duration-500 ${
                    currentStep === index
                      ? "bg-blue-50 border-2 border-blue-200 transform scale-105"
                      : "bg-white border-2 border-gray-100 hover:border-blue-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                      currentStep === index
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium text-blue-600 mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make our AI Health Assistant
              your perfect wellness companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Voice & Text Support
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Health Logger
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-600" />
                  Markdown Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from real users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Oladele Favour",
                role: "Working Mom",
                quote:
                  "Having a health assistant available 24/7 has been a game-changer for my family's wellness.",
                rating: 5,
              },
              {
                name: "Dr. Michael Chen",
                role: "Primary Care Physician",
                quote:
                  "The AI provides accurate, helpful guidance that complements professional medical care perfectly.",
                rating: 5,
              },
              {
                name: "David Pelumi",
                role: "Student",
                quote:
                  "Simple, secure, and incredibly helpful. It's like having a health expert in my pocket.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">
                      ★
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-30 bg-gradient-to-r from-blue-600 to-cyan-500 relative"
        style={{
          backgroundImage:
            "url('https://dailygalaxy.com/wp-content/uploads/2025/05/China-Stuns-the-World-with-First-Hospital-Run-Entirely-by-42-AI-Doctors.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-80"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our AI Health Assistant for their
            wellness needs.
          </p>
          <a
            href="https://carebridge-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 ml-2 inline" />
          </a>
          <p className="text-blue-100 text-sm mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="./logo.svg"
                  alt="HealthAI Logo"
                  className="w-50 h-20"
                />
              </div>
              <p className="text-gray-400 max-w-md">
                Your intelligent health companion, providing 24/7 support for
                all your wellness needs with privacy and security at the
                forefront.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIHealthLandingPage;

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Users, Sparkles, MessageSquare, Camera, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">AURA</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/assistant"
                className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                AI Assistant
              </Link>
              <Link
                href="/try-on"
                className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Virtual Try-On
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Products
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">AURA</h1>
              <p className="text-primary-foreground/80">AI-Powered Personal Stylist & Virtual Try-On Platform</p>
            </div>
          </div>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Revolutionizing online fashion retail through conversational AI and photorealistic virtual try-on technology
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Experience AURA Now</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Try our AI-powered personal stylist and virtual try-on technology. See how AURA transforms the online
                shopping experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assistant">
                  <Button size="lg" className="px-8">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Try AI Assistant
                  </Button>
                </Link>
                <Link href="/try-on">
                  <Button variant="outline" size="lg" className="px-8 bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Try-On
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg" className="px-8 bg-transparent">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Fashion Assistant
            </Badge>
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-foreground"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your Personal Stylist,
              <span className="text-primary"> Powered by AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect style with our AI assistant and see how clothes look on you before you buy. No more
              guessing, no more returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/try-on">
                  <Camera className="w-5 h-5 mr-2" />
                  Try Virtual Fitting
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/assistant">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get Style Advice
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                Revolutionary Fashion Technology
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of online shopping with our cutting-edge AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>AI Style Assistant</CardTitle>
                  <CardDescription>
                    Chat with our AI to discover outfits that match your style, occasion, and preferences
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Virtual Try-On</CardTitle>
                  <CardDescription>
                    Upload your photo and see photorealistic images of how clothes will look on you
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Smart Recommendations</CardTitle>
                  <CardDescription>
                    Get personalized product suggestions based on your style profile and shopping history
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                How AURA Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your shopping experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Upload Your Photo</h3>
                <p className="text-muted-foreground">
                  Take a simple photo or upload an existing one. Our AI will analyze your body type and preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary-foreground">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Get AI Recommendations</h3>
                <p className="text-muted-foreground">
                  Chat with our AI stylist to discover outfits that match your style, occasion, and budget.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-accent-foreground">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Try Before You Buy</h3>
                <p className="text-muted-foreground">
                  See photorealistic images of how clothes will look on you before making a purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                Loved by Fashion Enthusiasts
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See what our users are saying about their AURA experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "AURA completely changed how I shop online. The virtual try-on is incredibly accurate!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Fashion Blogger</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The AI stylist understands my taste better than I do. My return rate dropped to zero!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Marcus Johnson</p>
                      <p className="text-sm text-muted-foreground">Marketing Executive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Finally, a platform that gets my style! The recommendations are spot-on every time."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Emma Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Creative Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                AURA is a next-generation e-commerce solution designed to solve the most significant challenges in
                online fashion retail:
                <span className="font-semibold text-primary"> fit uncertainty and choice paralysis</span>. By
                integrating a conversational AI shopping assistant with state-of-the-art virtual try-on technology, AURA
                provides users with a deeply personalized and confident shopping experience.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">15%</div>
                  <div className="text-sm text-muted-foreground">Reduction in Returns</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">5%</div>
                  <div className="text-sm text-muted-foreground">Increase in Conversion</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">12M</div>
                  <div className="text-sm text-muted-foreground">Development Timeline</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Fashion Retail?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Project AURA represents a significant leap forward in the online shopping experience. By tackling the
                core issues of fit and choice, we can create immense value for both consumers and retailers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule a Demo
                </Button>
                <Button variant="outline" size="lg" className="px-8 bg-transparent">
                  Download Full Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                AURA
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 AURA. All rights reserved. Your AI-powered personal stylist.
          </div>
        </div>
      </footer>
    </div>
  )
}

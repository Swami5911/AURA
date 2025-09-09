"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Send, User, Wand2, ArrowLeft, ShoppingBag, Camera, Eye, Heart } from 'lucide-react'
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  products?: Array<{
    id: string
    name: string
    price: string
    image: string
    brand: string
  }>
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI personal stylist. I'm here to help you discover amazing outfits that match your style. What are you looking for today?",
      timestamp: new Date(),
      suggestions: [
        "I need a dress for a summer wedding",
        "Show me casual weekend outfits", 
        "Help me find professional work attire",
        "I want to update my wardrobe"
      ]
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with mock data
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(message),
        timestamp: new Date(),
        products: getMockProducts(message),
        suggestions: getFollowUpSuggestions(message)
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("wedding") || lowerMessage.includes("formal")) {
      return "Perfect! For a summer wedding, I'd recommend elegant midi or maxi dresses in breathable fabrics. Here are some beautiful options that would be perfect for the occasion:"
    } else if (lowerMessage.includes("casual") || lowerMessage.includes("weekend")) {
      return "Great choice! For casual weekend looks, comfort meets style. I've found some versatile pieces that you can mix and match:"
    } else if (lowerMessage.includes("work") || lowerMessage.includes("professional")) {
      return "Excellent! Professional attire that makes you feel confident is key. Here are some sophisticated options that are perfect for the workplace:"
    } else if (lowerMessage.includes("wardrobe") || lowerMessage.includes("update")) {
      return "How exciting! A wardrobe refresh can be transformative. Let me show you some versatile staples that will elevate your entire closet:"
    } else {
      return "I'd love to help you find the perfect pieces! Based on what you're looking for, here are some recommendations that I think you'll love:"
    }
  }

  const getMockProducts = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("wedding") || lowerMessage.includes("formal")) {
      return [
        { id: "1", name: "Floral Midi Dress", price: "$89", image: "/elegant-floral-midi-dress.png", brand: "Reformation" },
        { id: "2", name: "Silk Wrap Dress", price: "$124", image: "/silk-wrap-dress.png", brand: "Everlane" },
        { id: "3", name: "Linen Maxi Dress", price: "$95", image: "/linen-maxi-dress.png", brand: "Madewell" }
      ]
    } else if (lowerMessage.includes("casual") || lowerMessage.includes("weekend")) {
      return [
        { id: "4", name: "Oversized Denim Jacket", price: "$68", image: "/oversized-denim-jacket.png", brand: "Levi's" },
        { id: "5", name: "Cotton T-Shirt", price: "$24", image: "/cotton-t-shirt.png", brand: "Uniqlo" },
        { id: "6", name: "High-Waist Jeans", price: "$79", image: "/high-waist-jeans.png", brand: "Madewell" }
      ]
    } else {
      return [
        { id: "7", name: "Blazer", price: "$98", image: "/professional-blazer.png", brand: "Banana Republic" },
        { id: "8", name: "Blouse", price: "$54", image: "/elegant-silk-blouse.png", brand: "J.Crew" },
        { id: "9", name: "Trousers", price: "$72", image: "/tailored-trousers.png", brand: "Everlane" }
      ]
    }
  }

  const getFollowUpSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("wedding")) {
      return ["What accessories would go with these?", "Show me shoes for this outfit", "Any color recommendations?"]
    } else if (lowerMessage.includes("casual")) {
      return ["What about shoes for these looks?", "Show me accessories", "Any seasonal variations?"]
    } else {
      return ["Tell me more about sizing", "What's trending right now?", "Show me similar styles"]
    }
  }

  // <CHANGE> Added function to toggle favorites
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                AURA
              </span>
              <Badge variant="secondary" className="ml-2">
                AI Stylist
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/products">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Catalog
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Favorites ({favorites.length})
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Chat Messages */}
        <div className="space-y-6 mb-8">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <Avatar className="w-10 h-10 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Wand2 className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-2xl ${message.role === "user" ? "order-first" : ""}`}>
                <Card className={`${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                  <CardContent className="p-4">
                    <p className="leading-relaxed">{message.content}</p>
                  </CardContent>
                </Card>

                {/* Product Recommendations */}
                {message.products && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {message.products.map((product) => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="relative">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-md mb-3"
                            />
                            {/* <CHANGE> Added favorite button overlay */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Heart 
                                className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                              />
                            </Button>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                          <p className="font-bold text-primary mb-3">{product.price}</p>
                          {/* <CHANGE> Added integrated action buttons */}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
                              <Link href={`/products/${product.id}`}>
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
                              <Link href={`/try-on?product=${product.id}`}>
                                <Camera className="w-3 h-3 mr-1" />
                                Try On
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {message.role === "user" && (
                <Avatar className="w-10 h-10 bg-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <Avatar className="w-10 h-10 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Wand2 className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <Card className="sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about styles, occasions, or specific items..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(input)}
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

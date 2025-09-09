"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sparkles,
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Camera,
  Wand2,
  Share,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock product data (in a real app, this would come from an API)
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Floral Midi Dress",
      brand: "Reformation",
      price: 89,
      originalPrice: 120,
      images: ["/elegant-floral-midi-dress.png", "/elegant-floral-midi-dress.png", "/elegant-floral-midi-dress.png"],
      category: "Dresses",
      subcategory: "Midi Dresses",
      colors: ["Floral Print", "Navy", "Black"],
      sizes: ["XS", "S", "M", "L", "XL"],
      rating: 4.8,
      reviews: 124,
      tags: ["wedding", "formal", "summer", "floral"],
      description:
        "This elegant floral midi dress is perfect for special occasions. Made from sustainable materials with a flattering silhouette that works for various body types.",
      details: ["100% sustainable viscose", "Midi length", "Side zip closure", "Lined bodice", "Machine wash cold"],
      sizeGuide: {
        XS: "32-24-34",
        S: "34-26-36",
        M: "36-28-38",
        L: "38-30-40",
        XL: "40-32-42",
      },
    },
  ]

  return products.find((p) => p.id === id) || products[0]
}

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                AURA
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <p className="text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge className="bg-secondary text-secondary-foreground">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedColor === color
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size} {product.sizeGuide && `(${product.sizeGuide[size]})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" disabled={!selectedSize}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart - ${product.price * quantity}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/try-on">
                    <Camera className="w-5 h-5 mr-2" />
                    Virtual Try-On
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/assistant">
                    <Wand2 className="w-5 h-5 mr-2" />
                    Style with AI
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $75</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Size Guide</h3>
              <div className="space-y-2">
                {Object.entries(product.sizeGuide || {}).map(([size, measurements]) => (
                  <div key={size} className="flex justify-between">
                    <span className="font-medium">{size}</span>
                    <span className="text-muted-foreground">{measurements}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Search, Filter, Heart, ShoppingBag, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  tags: string[]
  description: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Floral Midi Dress",
    brand: "Reformation",
    price: 89,
    originalPrice: 120,
    image: "/elegant-floral-midi-dress.png",
    category: "Dresses",
    subcategory: "Midi Dresses",
    colors: ["Floral Print", "Navy", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    tags: ["wedding", "formal", "summer", "floral"],
    description: "Elegant floral midi dress perfect for special occasions",
  },
  {
    id: "2",
    name: "Silk Wrap Dress",
    brand: "Everlane",
    price: 124,
    image: "/silk-wrap-dress.png",
    category: "Dresses",
    subcategory: "Wrap Dresses",
    colors: ["Sage", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviews: 89,
    tags: ["elegant", "silk", "versatile", "work"],
    description: "Luxurious silk wrap dress for versatile styling",
  },
  {
    id: "3",
    name: "Linen Maxi Dress",
    brand: "Madewell",
    price: 95,
    image: "/linen-maxi-dress.png",
    category: "Dresses",
    subcategory: "Maxi Dresses",
    colors: ["White", "Beige", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 156,
    tags: ["casual", "summer", "linen", "comfortable"],
    description: "Breathable linen maxi dress for effortless summer style",
  },
  {
    id: "4",
    name: "Oversized Denim Jacket",
    brand: "Levi's",
    price: 68,
    originalPrice: 85,
    image: "/oversized-denim-jacket.png",
    category: "Outerwear",
    subcategory: "Jackets",
    colors: ["Light Wash", "Dark Wash", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 203,
    tags: ["casual", "denim", "layering", "classic"],
    description: "Classic oversized denim jacket for layering",
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    brand: "Uniqlo",
    price: 24,
    image: "/cotton-t-shirt.png",
    category: "Tops",
    subcategory: "T-Shirts",
    colors: ["White", "Black", "Gray", "Navy", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.4,
    reviews: 312,
    tags: ["basic", "cotton", "everyday", "comfortable"],
    description: "Essential cotton t-shirt for everyday wear",
  },
  {
    id: "6",
    name: "High-Waist Jeans",
    brand: "Madewell",
    price: 79,
    image: "/high-waist-jeans.png",
    category: "Bottoms",
    subcategory: "Jeans",
    colors: ["Medium Wash", "Dark Wash", "Light Wash"],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
    rating: 4.6,
    reviews: 187,
    tags: ["high-waist", "denim", "flattering", "versatile"],
    description: "Flattering high-waist jeans with perfect fit",
  },
  {
    id: "7",
    name: "Professional Blazer",
    brand: "Banana Republic",
    price: 98,
    originalPrice: 130,
    image: "/professional-blazer.png",
    category: "Outerwear",
    subcategory: "Blazers",
    colors: ["Black", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 94,
    tags: ["professional", "work", "tailored", "classic"],
    description: "Tailored blazer perfect for professional settings",
  },
  {
    id: "8",
    name: "Silk Blouse",
    brand: "J.Crew",
    price: 54,
    originalPrice: 78,
    image: "/elegant-silk-blouse.png",
    category: "Tops",
    subcategory: "Blouses",
    colors: ["White", "Blush", "Navy"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 76,
    tags: ["silk", "elegant", "work", "versatile"],
    description: "Elegant silk blouse for sophisticated looks",
  },
  {
    id: "9",
    name: "Tailored Trousers",
    brand: "Everlane",
    price: 72,
    image: "/tailored-trousers.png",
    category: "Bottoms",
    subcategory: "Trousers",
    colors: ["Black", "Navy", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 118,
    tags: ["tailored", "work", "professional", "comfortable"],
    description: "Perfectly tailored trousers for work and beyond",
  },
]

const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep original order for "featured" and "newest"
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
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
                Catalog
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Favorites ({favorites.length})
            </Button>
            <Button variant="outline" size="sm">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
            Discover Your Style
          </h1>
          <p className="text-xl text-muted-foreground">
            Curated fashion pieces selected by our AI for your perfect wardrobe
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products, brands, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} products
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </Button>
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">Sale</Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                    {product.colors.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.colors.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${product.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSortBy("featured")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

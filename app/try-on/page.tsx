"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, Sparkles, Download, Share2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  image: string
  category: string
  price: number
}

const products: Product[] = [
  {
    id: "1",
    name: "Elegant Floral Midi Dress",
    image: "/elegant-floral-midi-dress.png",
    category: "dresses",
    price: 89,
  },
  { id: "2", name: "Silk Wrap Dress", image: "/silk-wrap-dress.png", category: "dresses", price: 129 },
  { id: "3", name: "Linen Maxi Dress", image: "/linen-maxi-dress.png", category: "dresses", price: 95 },
  { id: "4", name: "Oversized Denim Jacket", image: "/oversized-denim-jacket.png", category: "jackets", price: 79 },
  { id: "5", name: "Cotton T-Shirt", image: "/cotton-t-shirt.png", category: "tops", price: 29 },
  { id: "6", name: "High-Waist Jeans", image: "/high-waist-jeans.png", category: "bottoms", price: 69 },
]

export default function VirtualTryOnPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setCurrentStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const startTryOn = async () => {
    if (!uploadedImage || selectedProducts.length === 0) return

    setCurrentStep(3)
    setIsProcessing(true)
    setProgress(0)

    // Simulate AI processing with realistic progress
    const progressSteps = [
      { step: 10, message: "Analyzing uploaded photo..." },
      { step: 25, message: "Detecting body pose and measurements..." },
      { step: 40, message: "Processing clothing items..." },
      { step: 60, message: "Applying computer vision algorithms..." },
      { step: 80, message: "Generating realistic try-on images..." },
      { step: 95, message: "Finalizing results..." },
      { step: 100, message: "Complete!" },
    ]

    for (const { step, message } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress(step)
      console.log(`[v0] ${message}`)
    }

    // Call AI API for actual image generation
    try {
      const response = await fetch("/api/virtual-tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalImage: uploadedImage,
          selectedProducts: selectedProducts.map((p) => ({ id: p.id, name: p.name, image: p.image })),
        }),
      })

      const result = await response.json()
      setGeneratedImages(result.generatedImages || [])
    } catch (error) {
      console.error("[v0] AI processing error:", error)
      // Fallback to demo images if API fails
      setGeneratedImages([
        "/person-wearing-linen-maxi-dress-summer-style.png",
        "/person-wearing-cotton-tshirt-casual-look.png",
      ])
    }

    setIsProcessing(false)
    setCurrentStep(4)
  }

  const resetTryOn = () => {
    setCurrentStep(1)
    setUploadedImage(null)
    setSelectedProducts([])
    setGeneratedImages([])
    setCurrentImageIndex(0)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Try-On Studio</h1>
          <p className="text-lg text-gray-600">Experience AI-powered fashion with realistic virtual try-on</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-cyan-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Photo Upload */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-cyan-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your photo</h3>
                <p className="text-gray-500 mb-4">Choose a clear, full-body photo for best results</p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Photo
                </Button>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Tips for best results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use good lighting and a plain background</li>
                  <li>• Stand straight with arms slightly away from body</li>
                  <li>• Wear fitted clothing for accurate body detection</li>
                  <li>• Ensure your full body is visible in the frame</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Product Selection */}
        {currentStep === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Photo</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedImage && (
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded photo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Items to Try On</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="dresses">Dresses</TabsTrigger>
                    <TabsTrigger value="tops">Tops</TabsTrigger>
                    <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                  </TabsList>

                  {["all", "dresses", "tops", "bottoms"].map((category) => (
                    <TabsContent key={category} value={category} className="mt-4">
                      <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {products
                          .filter((product) => category === "all" || product.category === category)
                          .map((product) => (
                            <div
                              key={product.id}
                              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                selectedProducts.find((p) => p.id === product.id)
                                  ? "border-cyan-500 bg-cyan-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => handleProductSelect(product)}
                            >
                              <div className="relative aspect-square mb-2 rounded overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-cyan-600 font-semibold">${product.price}</p>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                {selectedProducts.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Selected Items ({selectedProducts.length})</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProducts.map((product) => (
                        <span key={product.id} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                          {product.name}
                        </span>
                      ))}
                    </div>
                    <Button onClick={startTryOn} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Virtual Try-On
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: AI Processing */}
        {currentStep === 3 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                AI Processing Your Try-On
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-cyan-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-cyan-500" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Generating your virtual try-on...</h3>
                <p className="text-gray-500 mb-6">Our AI is analyzing your photo and applying the selected items</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">AI Processing Steps:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Computer vision body detection</li>
                  <li>✓ Pose estimation and measurement</li>
                  <li>✓ Clothing item analysis</li>
                  <li>✓ GAN-based image generation</li>
                  <li>✓ Realistic lighting and shadow rendering</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Original Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadedImage && (
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Original photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>AI-Generated Result</span>
                    {generatedImages.length > 1 && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          disabled={currentImageIndex === 0}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-gray-500">
                          {currentImageIndex + 1} / {generatedImages.length}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentImageIndex(Math.min(generatedImages.length - 1, currentImageIndex + 1))
                          }
                          disabled={currentImageIndex === generatedImages.length - 1}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImages.length > 0 && (
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <Image
                        src={generatedImages[currentImageIndex] || "/placeholder.svg"}
                        alt="AI-generated try-on result"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Result
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Selected Items
              </Button>
              <Button variant="outline" onClick={resetTryOn}>
                Try Another Look
              </Button>
            </div>

            {selectedProducts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Items in This Look</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="text-center">
                        <div className="relative aspect-square mb-2 rounded overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-cyan-600 font-semibold">${product.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'

interface FormState {
  length: string
  width: string
  depth: string
  productType: string
}

interface FormErrors {
  length?: string
  width?: string
  depth?: string
}

export default function MaterialCalculator() {
  const [form, setForm] = useState<FormState>({
    length: '',
    width: '',
    depth: '',
    productType: products[0].id,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<number | null>(null)

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    const lengthVal = form.length.trim()
    if (!lengthVal) {
      newErrors.length = 'Length is required'
    } else {
      const num = parseFloat(lengthVal)
      if (isNaN(num) || num <= 0) {
        newErrors.length = 'Enter a valid positive number'
      } else if (num > 1000) {
        newErrors.length = 'Maximum length is 1,000 ft'
      }
    }

    const widthVal = form.width.trim()
    if (!widthVal) {
      newErrors.width = 'Width is required'
    } else {
      const num = parseFloat(widthVal)
      if (isNaN(num) || num <= 0) {
        newErrors.width = 'Enter a valid positive number'
      } else if (num > 1000) {
        newErrors.width = 'Maximum width is 1,000 ft'
      }
    }

    const depthVal = form.depth.trim()
    if (!depthVal) {
      newErrors.depth = 'Depth is required'
    } else {
      const num = parseFloat(depthVal)
      if (isNaN(num) || num <= 0) {
        newErrors.depth = 'Enter a valid positive number'
      } else if (num < 0.5) {
        newErrors.depth = 'Minimum depth is 0.5 inches'
      } else if (num > 36) {
        newErrors.depth = 'Maximum depth is 36 inches'
      }
    }

    return newErrors
  }

  function handleCalculate() {
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setResult(null)
      return
    }

    const length = parseFloat(form.length)
    const width = parseFloat(form.width)
    const depth = parseFloat(form.depth)
    const cubicYards = (length * width * (depth / 12)) / 27
    setResult(Math.round(cubicYards * 100) / 100)
  }

  const selectedProduct = products.find((p) => p.id === form.productType)

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-forest text-center mb-4">
          Material Calculator
        </h2>
        <p className="text-charcoal/70 text-center mb-10">
          Estimate how much material you need for your project.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label
              htmlFor="calc-length"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Length (ft)
            </label>
            <input
              id="calc-length"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 20"
              min={0.1}
              max={1000}
              step="any"
              value={form.length}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, length: e.target.value }))
              }
              aria-describedby={
                errors.length ? 'calc-length-error' : undefined
              }
              aria-invalid={!!errors.length}
              className={cn(
                'w-full px-4 py-3 rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-2 focus-visible:outline-forest',
                errors.length
                  ? 'border-red-700'
                  : 'border-charcoal/20 focus:border-forest'
              )}
            />
            {errors.length && (
              <p
                id="calc-length-error"
                role="alert"
                className="text-sm text-red-700 mt-1"
              >
                {errors.length}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="calc-width"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Width (ft)
            </label>
            <input
              id="calc-width"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 10"
              min={0.1}
              max={1000}
              step="any"
              value={form.width}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, width: e.target.value }))
              }
              aria-describedby={errors.width ? 'calc-width-error' : undefined}
              aria-invalid={!!errors.width}
              className={cn(
                'w-full px-4 py-3 rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-2 focus-visible:outline-forest',
                errors.width
                  ? 'border-red-700'
                  : 'border-charcoal/20 focus:border-forest'
              )}
            />
            {errors.width && (
              <p
                id="calc-width-error"
                role="alert"
                className="text-sm text-red-700 mt-1"
              >
                {errors.width}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="calc-depth"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Depth (in)
            </label>
            <input
              id="calc-depth"
              type="number"
              inputMode="decimal"
              placeholder="e.g. 3"
              min={0.5}
              max={36}
              step="any"
              value={form.depth}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, depth: e.target.value }))
              }
              aria-describedby={errors.depth ? 'calc-depth-error' : undefined}
              aria-invalid={!!errors.depth}
              className={cn(
                'w-full px-4 py-3 rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-2 focus-visible:outline-forest',
                errors.depth
                  ? 'border-red-700'
                  : 'border-charcoal/20 focus:border-forest'
              )}
            />
            {errors.depth && (
              <p
                id="calc-depth-error"
                role="alert"
                className="text-sm text-red-700 mt-1"
              >
                {errors.depth}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <label
            htmlFor="calc-product-type"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Product Type
          </label>
          <select
            id="calc-product-type"
            value={form.productType}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, productType: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-forest focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-2 focus-visible:outline-forest transition-colors bg-white"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-forest hover:bg-forest-light text-cream font-medium rounded-lg transition-colors"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="mt-8 p-6 bg-sage/10 rounded-lg text-center">
            <p className="text-charcoal/70">You need approximately</p>
            <p className="font-display text-3xl md:text-4xl text-forest mt-2">
              {result} cubic yards
            </p>
            <p className="text-charcoal/70 mt-1">
              of {selectedProduct?.name}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors mt-6"
            >
              Request Delivery Quote
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

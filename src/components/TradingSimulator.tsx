'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Navigation from './Navigation'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'

interface Position {
    id: string
    symbol: string
    side: 'long' | 'short'
    size: number
    entryPrice: number
    currentPrice: number
    pnl: number
    leverage: number
}

export default function TradingSimulator() {
    const { profile, updateProfile } = useAuth()
    const [positions, setPositions] = useState<Position[]>([])
    const [selectedSymbol, setSelectedSymbol] = useState('BTC-PERP')
    const [orderSize, setOrderSize] = useState('')
    const [leverage, setLeverage] = useState(1)
    const [currentPrices, setCurrentPrices] = useState<{[key: string]: number}>({
        'BTC-PERP': 43250,
        'ETH-PERP': 2580,
        'SOL-PERP': 98.5
    })

    useEffect(() => {
        // Simulate price updates
        const interval = setInterval(() => {
            setCurrentPrices(prev => ({
                'BTC-PERP': prev['BTC-PERP'] * (1 + (Math.random() - 0.5) * 0.001),
                'ETH-PERP': prev['ETH-PERP'] * (1 + (Math.random() - 0.5) * 0.001),
                'SOL-PERP': prev['SOL-PERP'] * (1 + (Math.random() - 0.5) * 0.001),
            }))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const openPosition = (side: 'long' | 'short') => {
        if (!orderSize || !profile) return

        const size = parseFloat(orderSize)
        const entryPrice = currentPrices[selectedSymbol]

        const newPosition: Position = {
            id: Date.now().toString(),
            symbol: selectedSymbol,
            side,
            size,
            entryPrice,
            currentPrice: entryPrice,
            pnl: 0,
            leverage
        }

        setPositions(prev => [...prev, newPosition])
        setOrderSize('')
    }

    const closePosition = (positionId: string) => {
        setPositions(prev => prev.filter(p => p.id !== positionId))
    }

    const symbols = ['BTC-PERP', 'ETH-PERP', 'SOL-PERP']

    if (!profile) return null

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Trading Simulator</h1>
                    <p className="text-gray-600 mt-2">
                        Practice trading with your ${profile.paper_trading_balance.toLocaleString()} virtual portfolio
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Trading Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Market Data */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Market Prices</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                    {symbols.map(symbol => (
                                        <div key={symbol} className="text-center p-4 border rounded-lg">
                                            <p className="font-medium">{symbol}</p>
                                            <p className="text-2xl font-bold">${currentPrices[symbol]?.toFixed(2)}</p>
                                            <p className="text-sm text-green-600">+0.5%</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Place Order</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Symbol</label>
                                        <select
                                            value={selectedSymbol}
                                            onChange={(e) => setSelectedSymbol(e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            {symbols.map(symbol => (
                                                <option key={symbol} value={symbol}>{symbol}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Size (USD)</label>
                                        <Input
                                            type="number"
                                            value={orderSize}
                                            onChange={(e) => setOrderSize(e.target.value)}
                                            placeholder="Enter order size"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Leverage</label>
                                        <select
                                            value={leverage}
                                            onChange={(e) => setLeverage(parseInt(e.target.value))}
                                            className="w-full p-2 border rounded-md"
                                        >
                                            {[1, 2, 5, 10, 20].map(lev => (
                                                <option key={lev} value={lev}>{lev}x</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => openPosition('long')}
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            Long
                                        </Button>
                                        <Button
                                            onClick={() => openPosition('short')}
                                            className="flex-1 bg-red-600 hover:bg-red-700"
                                        >
                                            <TrendingDown className="w-4 h-4 mr-2" />
                                            Short
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Portfolio & Positions */}
                    <div className="space-y-6">
                        {/* Portfolio Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5" />
                                    <span>Portfolio</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Balance</span>
                                        <span className="font-medium">${profile.paper_trading_balance.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total P&L</span>
                                        <span className={`font-medium ${profile.total_pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${profile.total_pnl.toFixed(2)}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Win Rate</span>
                                        <span className="font-medium">
                      {profile.total_trades > 0 ? ((profile.profitable_trades / profile.total_trades) * 100).toFixed(1) : 0}%
                    </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Open Positions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="w-5 h-5" />
                                    <span>Open Positions</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {positions.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">No open positions</p>
                                ) : (
                                    <div className="space-y-3">
                                        {positions.map(position => {
                                            const currentPrice = currentPrices[position.symbol] || position.entryPrice
                                            const pnlPercent = position.side === 'long'
                                                ? ((currentPrice - position.entryPrice) / position.entryPrice) * 100
                                                : ((position.entryPrice - currentPrice) / position.entryPrice) * 100
                                            const pnlValue = (position.size * pnlPercent / 100) * position.leverage

                                            return (
                                                <div key={position.id} className="border rounded-lg p-3">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-medium text-sm">{position.symbol}</span>
                                                            <Badge variant={position.side === 'long' ? 'default' : 'destructive'}>
                                                                {position.side.toUpperCase()}
                                                            </Badge>
                                                            <Badge variant="outline">{position.leverage}x</Badge>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => closePosition(position.id)}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>
                                                    <div className="text-xs space-y-1">
                                                        <div className="flex justify-between">
                                                            <span>Size:</span>
                                                            <span>${position.size}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Entry:</span>
                                                            <span>${position.entryPrice.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Current:</span>
                                                            <span>${currentPrice.toFixed(2)}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>P&L:</span>
                                                            <span className={pnlValue >= 0 ? 'text-green-600' : 'text-red-600'}>
                                ${pnlValue.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
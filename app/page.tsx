"use client";
import { useState } from "react"
import './globals.css'; // 确保导入全局样式

const restaurants = [
  "麦当劳",
  "山上娃",
  "袁记云饺",
  "大米先生",
  "小杨生煎",
  "谷田稻香",
  "朴大叔拌饭",
  "陕九门",
  "成都你六姐",
  "再转一次",
]

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedRestaurant(null)
    setShowConfetti(false)

    // 随机选择一个餐厅
    const randomIndex = Math.floor(Math.random() * restaurants.length)
    const selectedIndex = randomIndex

    // 计算旋转角度 (每个扇形36度，加上多圈旋转)
    const sectorAngle = 360 / restaurants.length
    const targetAngle = 360 * 5 + (360 - (selectedIndex * sectorAngle + sectorAngle / 2))

    setRotation((prev) => prev + targetAngle)

    // 3秒后停止并显示结果
    setTimeout(() => {
      setIsSpinning(false)
      setSelectedRestaurant(restaurants[selectedIndex])
      setShowConfetti(true)

      // 5秒后隐藏撒花效果
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    }, 3000)
  }

  const textColors = [
    "text-slate-600",
    "text-rose-500",
    "text-amber-600",
    "text-emerald-600",
    "text-blue-600",
    "text-purple-600",
    "text-pink-600",
    "text-teal-600",
    "text-indigo-600",
    "text-orange-600",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex flex-col items-center justify-center p-4">
      {/* 撒花动效 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <span className="text-2xl">{["🎉", "🎊", "✨", "🌟", "🎈"][Math.floor(Math.random() * 5)]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">天才鹿粮</h1>
        <p className="text-lg text-gray-600">今天吃什么？让转盘来决定！</p>
      </div>

      <div className="relative mb-8">
        {/* 转盘容器 */}
        <div className="relative w-80 h-80">
          {/* 指针 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
          </div>

          {/* 转盘 */}
          <div
            className="w-80 h-80 rounded-full border-4 border-orange-400 relative overflow-hidden transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {restaurants.map((restaurant, index) => {
              const angle = (360 / restaurants.length) * index
              const nextAngle = (360 / restaurants.length) * (index + 1)
              const textAngle = angle + 18
              const textRadius = 100
              const textX = 50 + (textRadius / 160) * 50 * Math.cos(((textAngle - 90) * Math.PI) / 180)
              const textY = 50 + (textRadius / 160) * 50 * Math.sin(((textAngle - 90) * Math.PI) / 180)

              return (
                <div
                  key={restaurant}
                  className="absolute w-full h-full"
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((angle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((nextAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((nextAngle - 90) * Math.PI) / 180)}%)`,
                  }}
                >
                  <div className={`w-full h-full ${index % 2 === 0 ? "bg-orange-300" : "bg-yellow-300"}`}>
                    <div
                      className="absolute text-center"
                      style={{
                        left: `${textX}%`,
                        top: `${textY}%`,
                        transform: `translate(-50%, -50%) rotate(${textAngle}deg)`,
                        transformOrigin: "center",
                      }}
                    >
                      <span className={`text-sm font-bold ${textColors[index]} whitespace-nowrap`}>{restaurant}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mb-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSpinning ? "转盘旋转中..." : "开始转盘"}
      </button>

      {/* 结果显示 */}
      {selectedRestaurant && (
        <div className="p-6 bg-white shadow-lg border-2 border-orange-300 rounded-lg animate-pulse">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-600 mb-2">🎉 恭喜！</h2>
            <p className="text-xl text-gray-700">今天就去</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{selectedRestaurant}</p>
            <p className="text-lg text-gray-600 mt-2">享受美食吧！</p>
          </div>
        </div>
      )}
    </div>
  )
}
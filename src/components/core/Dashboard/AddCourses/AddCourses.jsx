import RenderStep from "./RenderStep"

export default function AddCourse(){
   return(
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-6 md:p-8">
            {/* Header Section with Enhanced Styling */}
            <div className="mb-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
                        Create New Course
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Share your knowledge and build an amazing learning experience for students worldwide
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <RenderStep />
                </div>
            </div>

            {/* Tips Card with Enhanced Design */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-8 shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-3 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Course Creation Tips</h3>
                            <p className="text-gray-400">Follow these guidelines for the best results</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Set competitive pricing or make it free to attract more students</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Use high-quality thumbnails (1024×567 recommended)</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Create engaging course overview videos</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Use descriptive lecture titles for better discoverability</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Keep lecture files under 500MB for smooth uploads</p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-200">Provide clear learning objectives and outcomes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
   )
}
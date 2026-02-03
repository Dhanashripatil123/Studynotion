const Stats = [
     {count: "5K" , label: "Activete Student"},
     {count: "10+" , label: "Mentors"},
     {count: "200+" , label: "Courses"},
     {count: "50+" , label: "Award"},
     
]

export const StateComponenets =()=>{
    
    return(
        <section>
              <div>
                  <div className="flex flex-row items-center justify-center gap-15  grid-cols-4  bg-[#2f3640] py-12">
                      {
                         Stats.map ((data,index)=>{
                            return(<div key={index}>
                                    <h1 className="text-3xl md:text-4xl font-bold">
                                           {data.count}       
                                    </h1>
                                    <h2 className="mt-2 text-sm text-gray-400">
                                           {data.label}       
                                    </h2>
                            </div>)
                         })                         
                      }                            
                  </div>                                
              </div>                                    
        </section>                                          
    )
}
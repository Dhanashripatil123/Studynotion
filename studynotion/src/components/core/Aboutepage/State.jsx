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
                  <div className="flex flex-row">
                      {
                         Stats.map ((data,index)=>{
                            return(<div key={index}>
                                    <h1>
                                           {data.count}       
                                    </h1>
                                    <h2>
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
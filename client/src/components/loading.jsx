
function Loading() {


    return (
        // <div>
        //             <div style={{ display: "flex", gap: "4%", justifyContent: "center", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>
        //                 <div class="spinner-border text-primary" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>
        //                 <div class="spinner-grow text-primary" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>

        //                 <div class="spinner-border text-secondary" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>
        //                 <div class="spinner-grow text-secondary" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>
        //                 <div class="spinner-border text-success" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>
        //                 <div class="spinner-grow text-success" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>
        //                 <div class="spinner-border text-danger" role="status">
        //                     <span class="visually-hidden">Loading...</span>
        //                 </div>

        //             </div>
        //             <h4 style={{color:"gray",fontFamily:"stylish",textAlign:"center"}}>Loading...</h4>
        //         </div>
        <div id="loaderSvgWrapper">
            <svg svg="www.w3.org/2000/svg" width="200px" height="200px" viewbox="0 0 200 200" id="preloader">
                <circle cx="100" cy="100" r="3" id="red" />
                <circle cx="100" cy="100" r="8" id="orange" />
                <circle cx="100" cy="100" r="13" id="yellow" />
                <circle cx="100" cy="100" r="18" id="green" />
            </svg>
        </div>

    )
}

export default Loading
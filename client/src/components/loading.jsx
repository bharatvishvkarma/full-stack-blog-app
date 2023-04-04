
function Loading(){

    return (
        <div>
                    <div style={{ display: "flex", gap: "4%", justifyContent: "center", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                    </div>
                    <h4 style={{color:"gray",fontFamily:"stylish",textAlign:"center"}}>Loading...</h4>
                </div>
    )
}

export default Loading
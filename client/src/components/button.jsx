import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";


function Change(){
    const location = useLocation();
    
    return (
        <div style={{width:"90%",margin:"auto"}}>
        <p style={{text:"none"}}>{location.pathname ==='/login'?"If you don't have an account..":"Already have an account.."} <Link style={{textDecoration:"none",color:"blue",fontWeight:"500"}} to = {location.pathname === '/login'?"/signup":"/login"} > {location.pathname ==='/login'?"signup":"login"}</Link></p>
        <Button style={{backgroundColor:"black"}} onClick={()=>window.location.href = "https://github.com/login/oauth/authorize?client_id=d7075a7e20cf3b69dfe9"}  variant="contained" color="primary"  >Signup With Github</Button>
        </div>
    )
}
//https://github.com/login/oauth/authorize?client_id=d7075a7e20cf3b69dfe9
export default Change
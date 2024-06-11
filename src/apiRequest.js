const apiRequest=async(url='',objectOption=null,errMsg=null)=>{
    
    try {
        const response=await fetch(url,objectOption)
        if(!response.ok) throw Error("Plese reload the App")
    } catch (error) {
        errMsg=error.message
    }finally{
        return errMsg
    }
}

export default apiRequest
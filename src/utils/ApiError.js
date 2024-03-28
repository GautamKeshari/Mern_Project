class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors=[],
        stack=""
    ){  
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false   //we are not handling api response, but handling api result
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
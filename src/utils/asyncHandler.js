// how the exact wrapup code written below in the form of promises 

const asyncHandler = (requestHandler)=> {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=> next(err))
    }
}

export {asyncHandler}








// high order javascript
/*
const asyncHandler = (fn) => async(req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message: err.message
        })
    }
}
*/
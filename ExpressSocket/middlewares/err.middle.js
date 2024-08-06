export const errMiddle = async (err, req, res, next) => {
    let msg = err.message || "Something broke!";
    try{
        msg = JSON.parse(msg);

    }catch(e){
        null
    }

    const status = err.status || 500;
    res.status(status).json({
        status: false,
        msg,
    });
    }

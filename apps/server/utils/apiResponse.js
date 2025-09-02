class ApiResponse{
    constructor(
        statusCode,
        message,
        data = null,
        isSuccess = false,
        isError = true,
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.isSuccess = isSuccess;
        this.isError = isError;
    }
}

export default ApiResponse